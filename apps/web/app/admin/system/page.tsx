import LegacyPanel from '@/components/admin/legacy-panel';
import { Heading, Help } from '@/components/admin/ui';
export default function Page() { return <><Heading title="Резервные копии и обслуживание" description="Проверьте сохранность данных и состояние резервирования."><Help label="Резервные копии и обслуживание">Статус показывает последнее сообщение службы резервирования. Пустое значение не подтверждает наличие резервной копии.</Help></Heading><LegacyPanel section="system"/></>; }
