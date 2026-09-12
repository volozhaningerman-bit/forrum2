import LegacyPanel from '@/components/admin/legacy-panel';
import { Heading, Help } from '@/components/admin/ui';
export default function Page() { return <><Heading title="Продвижение и баллы" description="Стоимость и доступность платных мест в ленте."><Help label="Продвижение и баллы">Закрепление держит публикацию наверху, поднятие повышает её видимость. Здесь используются внутренние баллы форума.</Help></Heading><LegacyPanel section="promotion"/></>; }
