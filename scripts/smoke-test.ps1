$ErrorActionPreference = 'Stop'
$api = 'http://localhost:4000/v1'
$stamp = Get-Date -Format 'yyyyMMddHHmmss'
$title = "Автопроверка FORRUM $stamp"
$editedTitle = "$title — отредактировано"

function Invoke-Json($method, $uri, $body, $session = $null, [switch]$CreateSession) {
  $params = @{ Uri = $uri; Method = $method; ContentType = 'application/json; charset=utf-8'; Body = ($body | ConvertTo-Json -Depth 10) }
  if ($CreateSession) { $params.SessionVariable = 'createdSession' }
  elseif ($session) { $params.WebSession = $session }
  $result = Invoke-RestMethod @params
  if ($CreateSession) { return @{ Result = $result; Session = $createdSession } }
  return $result
}

Write-Host '1/47 Проверяю сервер...'
$health = Invoke-RestMethod "$api/health"
if (-not $health.ok) { throw 'Сервер вернул ошибку готовности.' }

Write-Host '2/47 Вхожу владельцем и вторым пользователем...'
$owner = (Invoke-Json 'Post' "$api/auth/login" @{ email = 'owner@forrum.local'; password = 'Owner12345!' } -CreateSession).Session
$friend = (Invoke-Json 'Post' "$api/auth/login" @{ email = 'friend@forrum.local'; password = 'Friend12345!' } -CreateSession).Session

$home = Invoke-RestMethod -Uri "$api/home/overview" -WebSession $owner
if ($null -eq $home.stats.publications -or $null -eq $home.stats.communities) { throw 'Главная не получила реальные сводные данные.' }
$communityOverview = Invoke-RestMethod -Uri "$api/communities/gta-rp" -WebSession $owner
if ($null -eq $communityOverview.popularTags -or $null -eq $communityOverview.activePoll) { throw 'Страница сообщества не получила хэштеги или голосование.' }
$communityDirectory = Invoke-RestMethod -Uri "$api/communities" -WebSession $owner
$gtaDirectory = $communityDirectory | Where-Object { $_.slug -eq 'gta-rp' } | Select-Object -First 1
if ($null -eq $gtaDirectory.recentPublicationCount -or $null -eq $gtaDirectory.lastActivityAt) { throw 'Каталог сообществ не получил реальные показатели активности.' }

Write-Host '3/47 Проверяю правила имени пользователя...'
$freeName = "smoke_$($stamp.Substring($stamp.Length - 8))"
$freeAvailability = Invoke-RestMethod -Uri "$api/auth/username-availability?username=$freeName"
$occupiedAvailability = Invoke-RestMethod -Uri "$api/auth/username-availability?username=owner"
$reservedAvailability = Invoke-RestMethod -Uri "$api/auth/username-availability?username=forrum"
if (-not $freeAvailability.available -or $occupiedAvailability.available -or $reservedAvailability.available) { throw 'Проверка доступности имени пользователя работает неверно.' }

Write-Host '4/47 Проверяю сохранение первичной настройки...'
$beforeOnboarding = Invoke-RestMethod -Uri "$api/auth/me" -WebSession $owner
if (-not $beforeOnboarding.user.onboardingCompleted) { throw 'Тестовый владелец не отмечен как прошедший первичную настройку.' }
$onboardingResult = Invoke-Json 'Post' "$api/auth/onboarding/complete" @{} $owner
if (-not $onboardingResult.user.onboardingCompleted) { throw 'Завершение первичной настройки не сохранилось.' }

Write-Host '5/47 Проверяю безопасный запрос восстановления пароля...'
$resetRequest = Invoke-Json 'Post' "$api/auth/password-reset/request" @{ email = 'friend@forrum.local' }
if (-not $resetRequest.ok) { throw 'Запрос восстановления пароля не принят.' }

Write-Host '6/47 Загружаю и оптимизирую изображение...'
$tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
$media = Invoke-Json 'Post' "$api/media" @{ kind = 'POST_IMAGE'; originalName = 'smoke.png'; dataUrl = $tinyPng } $owner
if (-not $media.url -or -not $media.thumbnailUrl -or $media.mimeType -ne 'image/webp') { throw 'Оптимизированное изображение не создано.' }
foreach ($url in @($media.url, $media.thumbnailUrl)) { if ((Invoke-WebRequest -Uri $url -UseBasicParsing).StatusCode -ne 200) { throw "Изображение не открывается: $url" } }

Write-Host '7/47 Создаю постоянную тему с безопасным BBCode...'
$created = Invoke-Json 'Post' "$api/communities/forrum-start/publications" @{
  format = 'TOPIC'; type = 'DISCUSSION'; title = $title;
  body = "[h2]Автопроверка BBCode[/h2][b]Жирный[/b] [color=red]цветной[/color] [size=large]крупный[/size] [img=Тест]$($media.url)[/img]";
  tags = @('avtotest', 'forrum')
} $owner
if (-not $created.slug) { throw 'Тема не создана.' }

Write-Host '8/47 Проверяю хранение, просмотр и редактирование...'
$publication = Invoke-RestMethod -Uri "$api/publications/$($created.slug)" -WebSession $owner
if ($publication.body -notlike '*[b]Жирный[/b]*' -or -not $publication.canEdit) { throw 'BBCode или право редактирования потеряно.' }
$trackedViewCount = $publication.viewCount
$untrackedPublication = Invoke-RestMethod -Uri "$api/publications/$($created.slug)?trackView=0" -WebSession $owner
if ($untrackedPublication.viewCount -ne $trackedViewCount) { throw 'Внутреннее обновление публикации повторно увеличило просмотры.' }
Invoke-Json 'Patch' "$api/publications/$($created.slug)" @{ type='DISCUSSION'; title=$editedTitle; body='[h2]Тема обновлена[/h2][list][*]Первый пункт[*]Второй пункт[/list]'; tags=@('avtotest','bbcode') } $owner | Out-Null

Write-Host '9/47 Создаю основной и вложенный ответы...'
$comment = Invoke-Json 'Post' "$api/publications/$($created.slug)/comments" @{ body='[b]Автоматический ответ[/b] второго пользователя.' } $friend
$reply = Invoke-Json 'Post' "$api/publications/$($created.slug)/comments" @{ body='[quote]Вложенный ответ автора темы.[/quote]'; parentId=$comment.id } $owner
if (-not $comment.id -or -not $reply.id) { throw 'Ветка комментариев не создана.' }

Write-Host '10/47 Проверяю реакции и структуру ветки...'
$reaction = Invoke-Json 'Post' "$api/comments/$($comment.id)/reaction" @{ type='USEFUL' } $owner
if (-not $reaction.active) { throw 'Реакция не включилась.' }
$publication = Invoke-RestMethod -Uri "$api/publications/$($created.slug)?trackView=0" -WebSession $owner
if (-not ($publication.comments | Where-Object { $_.parentId -eq $comment.id })) { throw 'Вложенный ответ потерял родителя.' }

Write-Host '11/47 Проверяю Majestic RP в родительском GTA RP...'
$gta = Invoke-RestMethod -Uri "$api/communities/gta-rp" -WebSession $friend
if (-not ($gta.publications | Where-Object { $_.slug -eq 'majestic-rp-official-topic' -and $_.community.slug -eq 'majestic-rp' -and $_.inheritedFromChild })) { throw 'Дочерняя тема не появилась у родителя.' }
$subscriptions = Invoke-RestMethod -Uri "$api/feed?mode=subscriptions" -WebSession $friend
if (-not ($subscriptions | Where-Object { $_.slug -eq 'majestic-rp-official-topic' })) { throw 'Родительская подписка не включает дочерний контент.' }
$level = Invoke-Json 'Patch' "$api/communities/gta-rp/subscription" @{ notifyLevel='ALL' } $friend
if ($level.notifyLevel -ne 'ALL') { throw 'Уровень уведомлений сообщества не сохранился.' }
if ((Invoke-RestMethod -Uri "$api/communities/gta-rp" -WebSession $friend).notifyLevel -ne 'ALL') { throw 'Уровень уведомлений не возвращается в интерфейс.' }

Write-Host '12/47 Проверяю уведомления, поиск и счётчики...'
if (-not ((Invoke-RestMethod -Uri "$api/notifications" -WebSession $owner) | Where-Object { $_.href -like "*/$($created.slug)*" })) { throw 'Уведомление об ответе не найдено.' }
$encoded = [System.Uri]::EscapeDataString($editedTitle)
if (-not ((Invoke-RestMethod -Uri "$api/search?q=$encoded").publications | Where-Object { $_.slug -eq $created.slug })) { throw 'Тема не найдена поиском.' }
if ($null -eq (Invoke-RestMethod -Uri "$api/notifications/unread-count" -WebSession $owner).count) { throw 'Нет счётчика уведомлений.' }
if ($null -eq (Invoke-RestMethod -Uri "$api/messages/unread-count" -WebSession $owner).count) { throw 'Нет счётчика сообщений.' }

Write-Host '13/47 Проверяю активные сессии...'
if (-not ((Invoke-RestMethod -Uri "$api/auth/sessions" -WebSession $owner) | Where-Object { $_.current })) { throw 'Текущая сессия не отмечена.' }

Write-Host '14/47 Проверяю настройки уведомлений...'
$updatedPreferences = Invoke-Json 'Patch' "$api/notifications/preferences" @{ publicationReplies=$true; commentReplies=$true; reactions=$false; follows=$true; wallPosts=$true; messages=$true; system=$true; emailDigest=$false } $owner
if ($updatedPreferences.reactions -ne $false) { throw 'Настройки уведомлений не сохранились.' }
Invoke-Json 'Patch' "$api/notifications/preferences" @{ reactions=$true } $owner | Out-Null

Write-Host '15/47 Создаю жалобу и скрываю комментарий...'
$commentReport = Invoke-Json 'Post' "$api/comments/$($reply.id)/report" @{ reason='Автоматическая проверка модерации' } $friend
if (-not ((Invoke-RestMethod -Uri "$api/admin/reports" -WebSession $owner) | Where-Object { $_.id -eq $commentReport.id })) { throw 'Жалоба не попала администрации.' }
Invoke-Json 'Post' "$api/admin/comments/$($reply.id)/hide" @{ reason='Автоматическая проверка апелляции' } $owner | Out-Null
Invoke-Json 'Post' "$api/admin/reports/$($commentReport.id)/resolve" @{ status='RESOLVED'; note='Передано в апелляционный тест' } $owner | Out-Null

Write-Host '16/47 Проверяю исчезновение скрытого комментария...'
if ((Invoke-RestMethod -Uri "$api/publications/$($created.slug)?trackView=0" -WebSession $owner).comments | Where-Object { $_.id -eq $reply.id }) { throw 'Скрытый комментарий остался видимым.' }

Write-Host '17/47 Отправляю апелляцию автора комментария...'
$actions = Invoke-RestMethod -Uri "$api/moderation/actions" -WebSession $owner
$action = $actions | Where-Object { $_.commentId -eq $reply.id } | Select-Object -First 1
if (-not $action) { throw 'Решение модерации не записано.' }
$appeal = Invoke-Json 'Post' "$api/moderation/actions/$($action.id)/appeal" @{ body='Комментарий был частью автоматического теста. Прошу восстановить его после проверки контекста.' } $owner
if (-not $appeal.id) { throw 'Апелляция не создана.' }

Write-Host '18/47 Принимаю апелляцию и восстанавливаю комментарий...'
$adminAppeals = Invoke-RestMethod -Uri "$api/admin/moderation/appeals" -WebSession $owner
if (-not ($adminAppeals | Where-Object { $_.id -eq $appeal.id })) { throw 'Апелляция не появилась у администрации.' }
Invoke-Json 'Post' "$api/admin/moderation/appeals/$($appeal.id)/resolve" @{ status='ACCEPTED'; note='Контекст подтверждён автоматическим тестом.' } $owner | Out-Null
if (-not ((Invoke-RestMethod -Uri "$api/publications/$($created.slug)?trackView=0" -WebSession $owner).comments | Where-Object { $_.id -eq $reply.id })) { throw 'Комментарий не восстановлен после принятой апелляции.' }

Write-Host '19/47 Создаю предложение нового сообщества...'
$proposal = Invoke-Json 'Post' "$api/governance/proposals" @{ name="Тестовое сообщество $stamp"; description='Предложение создаётся автоматическим тестом для проверки полного общественного цикла и решений администрации.'; initialTopics='Первая тема; вторая тема; обсуждение правил.' } $owner
if (-not $proposal.id) { throw 'Предложение сообщества не создано.' }

Write-Host '20/47 Поддерживаю и закрываю предложение...'
$support = Invoke-Json 'Post' "$api/governance/proposals/$($proposal.id)/support" @{} $friend
if (-not $support.supported) { throw 'Поддержка предложения не учтена.' }
Invoke-Json 'Post' "$api/admin/governance/proposals/$($proposal.id)/resolve" @{ status='REJECTED'; note='Автоматическое тестовое предложение закрыто без создания раздела.' } $owner | Out-Null

Write-Host '21/47 Создаю голосование, проверяю рассылку и решающий голос...'
$pollCreated = Invoke-Json 'Post' "$api/governance/communities/gta-rp/polls" @{ title="Автоголосование $stamp"; description='Проверяем создание голосования, уведомление подписчика и классификацию решающего голоса.'; options=@('Поддерживаю','Нужно обсудить'); closesAt=(Get-Date).AddHours(2).ToUniversalTime().ToString('o') } $owner
Start-Sleep -Milliseconds 500
if (-not ((Invoke-RestMethod -Uri "$api/notifications" -WebSession $friend) | Where-Object { $_.title -like '*Новое голосование*' })) { throw 'Подписчик не получил важное уведомление о голосовании.' }
$poll = (Invoke-RestMethod -Uri "$api/governance/polls" -WebSession $friend | Where-Object { $_.id -eq $pollCreated.id } | Select-Object -First 1)
if (-not $poll) { throw 'Созданное голосование не найдено.' }
$vote = Invoke-Json 'Post' "$api/governance/polls/$($poll.id)/vote" @{ optionId=$poll.options[0].id } $friend
if ($vote.voteClass -ne 'BINDING') { throw 'Активный подписчик не получил решающий голос.' }

Write-Host '22/47 Отправляю работу в Мастерскую...'
$item = Invoke-Json 'Post' "$api/workshop" @{ type='BADGE'; title="Тестовый значок $stamp"; description='Работа создаётся автоматическим тестом, проходит модерацию, публикацию и получение оценки пользователя.' } $friend
if (-not $item.id) { throw 'Работа Мастерской не создана.' }

Write-Host '23/47 Публикую работу через админ-панель...'
if (-not ((Invoke-RestMethod -Uri "$api/admin/workshop" -WebSession $owner) | Where-Object { $_.id -eq $item.id })) { throw 'Работа не появилась на проверке.' }
Invoke-Json 'Post' "$api/admin/workshop/$($item.id)/review" @{ status='PUBLISHED'; note='Опубликовано автоматическим приёмочным тестом.' } $owner | Out-Null

Write-Host '24/47 Проверяю публичную Мастерскую и лайк...'
if (-not ((Invoke-RestMethod -Uri "$api/workshop" -WebSession $friend) | Where-Object { $_.id -eq $item.id -and $_.status -eq 'PUBLISHED' })) { throw 'Опубликованная работа не видна.' }
$like = Invoke-Json 'Post' "$api/workshop/$($item.id)/like" @{} $owner
if (-not $like.liked) { throw 'Оценка работы не сохранилась.' }

Write-Host '25/47 Публикую новость и проверяю агрегатор с рассылкой...'
$newsCreated = Invoke-Json 'Post' "$api/communities/gta-rp/publications" @{ format='TOPIC'; type='NEWS'; title="Тестовая новость $stamp"; body='Новость создана автоматическим приёмочным тестом и должна попасть в общий агрегатор и уведомления подписчиков.'; tags=@('novosti','avtotest') } $owner
Start-Sleep -Milliseconds 500
$news = Invoke-RestMethod -Uri "$api/news"
if (-not ($news | Where-Object { $_.slug -eq $newsCreated.slug -and $_.type -eq 'NEWS' })) { throw 'Новая публикация не попала в агрегатор новостей.' }
if (-not ((Invoke-RestMethod -Uri "$api/notifications" -WebSession $friend) | Where-Object { $_.href -like "*/$($newsCreated.slug)" })) { throw 'Подписчик с уровнем ALL не получил новость.' }

Write-Host '26/47 Проверяю безопасно отключённый Telegram-контур...'
$telegram = Invoke-RestMethod -Uri "$api/telegram/status" -WebSession $owner
if ($null -eq $telegram.configured -or $null -eq $telegram.linked) { throw 'Telegram-статус не ответил.' }

Write-Host '27/47 Проверяю список предложений, событий и работ...'
if (-not (Invoke-RestMethod -Uri "$api/governance/proposals" -WebSession $owner)) { throw 'Список предложений недоступен.' }
if (-not (Invoke-RestMethod -Uri "$api/governance/polls" -WebSession $owner)) { throw 'Список событий недоступен.' }
if (-not (Invoke-RestMethod -Uri "$api/workshop" -WebSession $owner)) { throw 'Мастерская недоступна.' }

Write-Host '28/47 Проверяю настройки персональной ленты...'
$feedPreferences = Invoke-RestMethod -Uri "$api/feed/preferences" -WebSession $owner
if ($null -eq $feedPreferences.recommendationsEnabled -or $null -eq $feedPreferences.showReasons) { throw 'Настройки персональной ленты не ответили.' }
$changedFeedPreferences = Invoke-Json 'Patch' "$api/feed/preferences" @{ recommendationsEnabled=$false; showReasons=$false } $owner
if ($changedFeedPreferences.recommendationsEnabled -ne $false -or $changedFeedPreferences.showReasons -ne $false) { throw 'Настройки персональной ленты не сохранились.' }

Write-Host '29/47 Проверяю скрытие и возврат публикации...'
Invoke-Json 'Post' "$api/feed/hidden-publications/$($created.id)" @{} $owner | Out-Null
$hiddenState = Invoke-RestMethod -Uri "$api/feed/preferences" -WebSession $owner
if ($hiddenState.hiddenPublicationCount -lt 1) { throw 'Скрытая публикация не записалась в настройки.' }
$clearedHidden = Invoke-Json 'Delete' "$api/feed/hidden-publications" @{} $owner
if ($clearedHidden.restored -lt 1) { throw 'Скрытые публикации не восстановились.' }

Write-Host '30/47 Проверяю уменьшение рекомендаций сообщества...'
Invoke-Json 'Post' "$api/feed/hidden-communities/gta-rp" @{} $owner | Out-Null
$hiddenCommunityState = Invoke-RestMethod -Uri "$api/feed/preferences" -WebSession $owner
if (-not ($hiddenCommunityState.hiddenCommunities | Where-Object { $_.slug -eq 'gta-rp' })) { throw 'Скрытое сообщество не появилось в настройках.' }
Invoke-Json 'Delete' "$api/feed/hidden-communities/gta-rp" @{} $owner | Out-Null

Write-Host '31/47 Возвращаю объяснения и рекомендации...'
$restoredFeedPreferences = Invoke-Json 'Patch' "$api/feed/preferences" @{ recommendationsEnabled=$true; showReasons=$true } $owner
if (-not $restoredFeedPreferences.recommendationsEnabled -or -not $restoredFeedPreferences.showReasons) { throw 'Настройки персональной ленты не восстановились.' }
if ($null -eq (Invoke-RestMethod -Uri "$api/feed?mode=saved" -WebSession $owner)) { throw 'Лента сохранённых материалов не ответила.' }

Write-Host '32/47 Проверяю отдельную библиотеку сохранённых материалов...'
$bookmark = Invoke-Json 'Post' "$api/publications/$($created.slug)/bookmark" @{} $owner
if (-not $bookmark.bookmarked) { throw 'Публикация не добавилась в сохранённое.' }
$savedItems = Invoke-RestMethod -Uri "$api/publications/saved" -WebSession $owner
if (-not ($savedItems | Where-Object { $_.id -eq $created.id -and $_.savedAt })) { throw 'Отдельная библиотека не вернула сохранённую публикацию и дату сохранения.' }

Write-Host '33/47 Проверяю подписку на хэштег и его страницу...'
Invoke-Json 'Delete' "$api/tags/avtotest/subscribe" @{} $owner | Out-Null
Invoke-Json 'Post' "$api/tags/avtotest/subscribe" @{} $owner | Out-Null
$tagSubscriptions = Invoke-RestMethod -Uri "$api/tags/subscriptions" -WebSession $owner
if (-not ($tagSubscriptions | Where-Object { $_.slug -eq 'avtotest' })) { throw 'Подписка на хэштег не появилась в личном разделе.' }
$tagPage = Invoke-RestMethod -Uri "$api/tags/avtotest" -WebSession $owner
if (-not $tagPage.isSubscribed -or -not ($tagPage.publications | Where-Object { $_.id -eq $created.id })) { throw 'Страница хэштега не вернула подписку или публикацию.' }

Write-Host '34/47 Проверяю подписку на автора...'
Invoke-Json 'Delete' "$api/users/friend/follow" @{} $owner | Out-Null
Invoke-Json 'Post' "$api/users/friend/follow" @{} $owner | Out-Null
$following = Invoke-RestMethod -Uri "$api/users/me/following" -WebSession $owner
if (-not ($following | Where-Object { $_.username -eq 'friend' -and $_.followedAt })) { throw 'Автор не появился в личном списке подписок.' }

Write-Host '35/47 Проверяю приватную историю действий...'
$activity = Invoke-RestMethod -Uri "$api/users/me/activity" -WebSession $owner
if (-not ($activity | Where-Object { $_.action -eq 'publication.bookmark' -and $_.href -like "*/$($created.slug)" })) { throw 'Сохранение публикации не попало в историю.' }
if (-not ($activity | Where-Object { $_.action -eq 'tag.subscribe' -and $_.href -eq '/tags/avtotest' })) { throw 'Подписка на хэштег не попала в историю.' }
if (-not ($activity | Where-Object { $_.action -eq 'user.follow' -and $_.href -eq '/u/friend' })) { throw 'Подписка на автора не попала в историю.' }

Write-Host '36/47 Проверяю итоговый профиль и ленту...'
$me = Invoke-RestMethod -Uri "$api/auth/me" -WebSession $owner
if (-not $me.user.forrumId -or $me.user.state -ne 'VERIFIED') { throw 'Профиль владельца повреждён.' }
if (-not (Invoke-RestMethod -Uri "$api/feed?mode=for-you" -WebSession $owner)) { throw 'Персональная лента не ответила.' }

Write-Host '37/47 Проверяю стену профиля и честное удаление записи...'
$wallPost = Invoke-Json 'Post' "$api/users/owner/wall" @{ body='Автоматическая запись для проверки стены профиля.' } $friend
if (-not $wallPost.id) { throw 'Запись на стене не создана.' }
$ownerProfile = Invoke-RestMethod -Uri "$api/users/owner" -WebSession $owner
$wallItem = $ownerProfile.wall | Where-Object { $_.id -eq $wallPost.id } | Select-Object -First 1
if (-not $wallItem -or -not $wallItem.canDelete) { throw 'Владелец профиля не может удалить запись со своей стены.' }
Invoke-Json 'Delete' "$api/users/owner/wall/$($wallPost.id)" @{} $owner | Out-Null
if ((Invoke-RestMethod -Uri "$api/users/owner" -WebSession $owner).wall | Where-Object { $_.id -eq $wallPost.id }) { throw 'Удалённая запись осталась на стене.' }

Write-Host '38/47 Проверяю личный диалог и данные собеседника...'
$conversation = Invoke-Json 'Post' "$api/messages" @{ username='friend'; body='Автоматическая проверка нового интерфейса сообщений.' } $owner
if (-not $conversation.id) { throw 'Диалог не создан.' }
$conversationData = Invoke-RestMethod -Uri "$api/messages/$($conversation.id)" -WebSession $owner
if ($conversationData.other.username -ne 'friend' -or $conversationData.messages.Count -lt 1) { throw 'Диалог не возвращает собеседника или сообщение.' }
if (-not ((Invoke-RestMethod -Uri "$api/messages" -WebSession $friend) | Where-Object { $_.id -eq $conversation.id -and $_.unread })) { throw 'Новое сообщение не отмечено непрочитанным у получателя.' }

Write-Host '39/47 Проверяю достижения, полезные материалы и локальное доверие...'
$ownerProfileEvidence = Invoke-RestMethod -Uri "$api/users/owner" -WebSession $owner
$verifiedAwards = @($ownerProfileEvidence.achievements | Where-Object { $_.code -eq 'VERIFIED_ACCOUNT' })
if ($verifiedAwards.Count -ne 1) { throw 'Автоматическое достижение отсутствует или было выдано повторно.' }
if ($null -eq $ownerProfileEvidence.localTrust -or $null -eq $ownerProfileEvidence.usefulPublications) { throw 'Профиль не вернул локальное доверие или полезные публикации.' }

Write-Host '40/47 Проверяю назначение и завершение роли...'
$existingSmokeRole = (Invoke-RestMethod -Uri "$api/admin/community-roles" -WebSession $owner | Where-Object { $_.user.username -eq 'friend' -and $_.community.slug -eq 'forrum-start' -and $_.role -eq 'MODERATOR' -and -not $_.endedAt } | Select-Object -First 1)
if ($existingSmokeRole) { Invoke-Json 'Post' "$api/admin/community-roles/$($existingSmokeRole.id)/end" @{ note='Подготовка повторного автоматического теста роли' } $owner | Out-Null }
$roleCreated = Invoke-Json 'Post' "$api/admin/community-roles" @{ username='friend'; communitySlug='forrum-start'; role='MODERATOR'; note='Автоматическая проверка жизненного цикла роли' } $owner
if (-not $roleCreated.id) { throw 'Роль не назначена.' }
$roleList = Invoke-RestMethod -Uri "$api/admin/community-roles" -WebSession $owner
if (-not ($roleList | Where-Object { $_.id -eq $roleCreated.id -and -not $_.endedAt })) { throw 'Действующая роль не появилась в Control Center.' }
Invoke-Json 'Post' "$api/admin/community-roles/$($roleCreated.id)/end" @{ note='Автоматическая проверка завершения полномочий' } $owner | Out-Null
$friendProfileRoles = Invoke-RestMethod -Uri "$api/users/friend" -WebSession $owner
if (-not ($friendProfileRoles.roleHistory | Where-Object { $_.role -eq 'MODERATOR' -and $_.type -eq 'ENDED' })) { throw 'Завершение роли не сохранилось в истории профиля.' }

Write-Host '41/47 Проверяю двустороннее подтверждение взаимодействия...'
$interaction = Invoke-Json 'Post' "$api/interactions" @{ targetUsername='friend'; type='HELP'; title="Проверка взаимодействия $stamp"; description='Оба тестовых пользователя подтверждают факт и завершение взаимодействия.'; communitySlug='forrum-start'; publicationSlug=$created.slug } $owner
if (-not $interaction.id) { throw 'Запрос взаимодействия не создан.' }
Invoke-Json 'Post' "$api/interactions/$($interaction.id)/confirm" @{} $friend | Out-Null
Invoke-Json 'Post' "$api/interactions/$($interaction.id)/complete" @{} $owner | Out-Null
$completedInteraction = Invoke-Json 'Post' "$api/interactions/$($interaction.id)/complete" @{} $friend
if ($completedInteraction.status -ne 'COMPLETED') { throw 'Взаимодействие не завершилось после двух подтверждений.' }

Write-Host '42/47 Оставляю отзыв после подтверждённого завершения...'
$review = Invoke-Json 'Post' "$api/interactions/$($interaction.id)/reviews" @{ verdict='POSITIVE'; body='Автоматический подтверждённый отзыв после двустороннего завершения взаимодействия.' } $owner
if (-not $review.id) { throw 'Подтверждённый отзыв не создан.' }
$friendProfileReview = Invoke-RestMethod -Uri "$api/users/friend" -WebSession $owner
if (-not ($friendProfileReview.reviews | Where-Object { $_.id -eq $review.id -and $_.interaction.id -eq $interaction.id })) { throw 'Отзыв не появился в профиле с доказательством взаимодействия.' }

Write-Host '43/47 Проверяю кабинет сообщества и наследуемые права...'
$workspace = Invoke-RestMethod -Uri "$api/community-management/gta-rp" -WebSession $owner
if (-not $workspace.canManage -or $null -eq $workspace.metrics -or $null -eq $workspace.publications) { throw 'Кабинет сообщества не вернул права, показатели или материалы.' }

Write-Host '44/47 Создаю событие и отмечаю участие...'
$eventStart = (Get-Date).ToUniversalTime().AddDays(3).ToString('o')
$eventEnd = (Get-Date).ToUniversalTime().AddDays(3).AddHours(2).ToString('o')
$communityEvent = Invoke-Json 'Post' "$api/events" @{ communitySlug='forrum-start'; title="Автопроверка события $stamp"; description='Событие создаётся командой сообщества и проверяет участие без лишних форм на публичной странице.'; format='ONLINE'; startsAt=$eventStart; endsAt=$eventEnd; location='Онлайн'; capacity=20; publish=$true } $owner
if (-not $communityEvent.id) { throw 'Событие не создано.' }
$attendance = Invoke-Json 'Post' "$api/events/$($communityEvent.id)/attendance" @{ status='GOING' } $friend
if ($attendance.status -ne 'GOING') { throw 'Участие в событии не сохранилось.' }

Write-Host '45/47 Создаю проект и связываю его с профилем...'
$portfolio = Invoke-Json 'Post' "$api/portfolio" @{ kind='PROJECT'; status='ACTIVE'; title="Автопроект $stamp"; summary='Проверка публичной карточки проекта и связи с постоянной темой пользователя.'; description='Автоматический сценарий создаёт проект, связывает его с темой и проверяет, что карточка доступна в публичном каталоге без создания отдельного магазина.'; communitySlug='forrum-start'; publicationSlug=$created.slug; lookingForTeam=$true; contactNote='Связаться через личные сообщения.'; links=@('https://example.com/smoke-project') } $owner
if (-not $portfolio.id) { throw 'Карточка проекта не создана.' }
if (-not ((Invoke-RestMethod -Uri "$api/portfolio?kind=PROJECT" -WebSession $friend) | Where-Object { $_.id -eq $portfolio.id })) { throw 'Активный проект не появился в публичном каталоге.' }

Write-Host '46/47 Проверяю прозрачную цену, покупку и возврат продвижения...'
$quote = Invoke-Json 'Post' "$api/communities/forrum-start/promotions/quote" @{ type='BOOST'; durationDays=1 } $owner
if ($null -eq $quote.basePerDay -or $null -eq $quote.demandSurcharge -or $quote.price -lt $quote.baseDurationPrice) { throw 'Расчёт продвижения не вернул прозрачную разбивку цены.' }
$promotionOrder = Invoke-Json 'Post' "$api/communities/forrum-start/promotions" @{ publicationSlug=$created.slug; type='BOOST'; durationDays=1 } $owner
if (-not $promotionOrder.id) { throw 'Продвижение не приобретено.' }
$cancelledPromotion = Invoke-Json 'Post' "$api/promotions/$($promotionOrder.id)/cancel" @{ reason='Автоматическая проверка короткого окна возврата' } $owner
if ($cancelledPromotion.refunded -ne $promotionOrder.price) { throw 'Возврат в короткое окно не вернул полную стоимость.' }

Write-Host '47/47 Финальная проверка созданной темы...'

$finalPublication = Invoke-RestMethod -Uri "$api/publications/$($created.slug)?trackView=0" -WebSession $owner
if ($finalPublication.title -ne $editedTitle -or $finalPublication.comments.Count -lt 2) { throw 'Итоговое состояние темы некорректно.' }

Write-Host ''
Write-Host 'SMOKE TEST PASSED: full acceptance path completed' -ForegroundColor Green
Write-Host "Тестовая тема: http://localhost:3000/p/$($created.slug)"
