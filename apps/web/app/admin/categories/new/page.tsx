import LegacyPanel from '@/components/admin/legacy-panel';
import { Heading, Help } from '@/components/admin/ui';
export default function Page() { return <><Heading title="Новая категория" description="Создайте раздел, в котором участники смогут публиковать темы."><Help label="Новая категория">Название видно в навигации. Адрес раздела задаётся латиницей; выбрать родителя можно в форме.</Help></Heading><LegacyPanel section="communities"/></>; }
