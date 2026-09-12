import LegacyPanel from '@/components/admin/legacy-panel';
import { Heading, Help } from '@/components/admin/ui';
export default function Page() { return <><Heading title="Роли в категориях" description="Назначайте помощников для конкретных разделов."><Help label="Роли в категориях">Куратор, помощник и модератор получают полномочия внутри выбранной категории. Глобальная роль владельца здесь не меняется.</Help></Heading><LegacyPanel section="roles"/></>; }
