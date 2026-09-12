import LegacyPanel from '@/components/admin/legacy-panel';
import { Heading, Help } from '@/components/admin/ui';
export default function Page() { return <><Heading title="Жалобы на материалы" description="Проверьте контекст и примите решение по каждой жалобе."><Help label="Жалобы на материалы">Решить жалобу и скрыть материал — разные действия. При скрытии нужно объяснить причину.</Help></Heading><LegacyPanel section="moderation"/></>; }
