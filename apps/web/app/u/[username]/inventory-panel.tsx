'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

export type InventoryDefinition = {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  previewKey: string | null;
  style: Record<string, string>;
  transferable: boolean;
  deletable: boolean;
  equipable: boolean;
};

export type InventoryItem = {
  id: string;
  serialNumber: number | null;
  equipped: boolean;
  acquiredAt: string;
  equippedAt: string | null;
  definition: InventoryDefinition;
};

export type PublicInventory = {
  owner: {
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  items: InventoryItem[];
};

const typeNames: Record<string, string> = {
  NICK_COLOR: 'Цвет ника',
  HASHTAG_COLOR: 'Цвет хэштега',
  PROFILE_BACKGROUND: 'Фон профиля',
  AVATAR_FRAME: 'Рамка аватара',
  PROFILE_BADGE: 'Знак профиля',
  REACTION_PACK: 'Набор реакций',
};

const rarityNames: Record<string, string> = {
  COMMON: 'Обычный',
  UNCOMMON: 'Необычный',
  RARE: 'Редкий',
  EPIC: 'Исключительный',
  LEGENDARY: 'Легендарный',
  UNIQUE: 'Уникальный',
};

function previewStyle(definition: InventoryDefinition): CSSProperties {
  const style = definition.style ?? {};
  return {
    color: style.color,
    background: style.background,
    borderColor: style.border,
    boxShadow: style.boxShadow,
  };
}

function ItemPreview({ definition }: { definition: InventoryDefinition }) {
  const label = typeNames[definition.type] ?? definition.type;
  const symbol = definition.style?.symbol ?? definition.previewKey ?? '•';

  return (
    <span
      className={`inventory-preview inventory-preview-${definition.type.toLowerCase()}`}
      style={previewStyle(definition)}
      aria-label={label}
    >
      {definition.type === 'NICK_COLOR' && <strong>FORRUM</strong>}
      {definition.type === 'HASHTAG_COLOR' && <strong>#проект</strong>}
      {definition.type === 'PROFILE_BACKGROUND' && (
        <span className="inventory-profile-miniature">
          <i />
          <b />
          <em />
        </span>
      )}
      {definition.type === 'AVATAR_FRAME' && (
        <span className="inventory-avatar-miniature">F</span>
      )}
      {definition.type === 'PROFILE_BADGE' && (
        <span className="inventory-badge-miniature">{symbol}</span>
      )}
      {definition.type === 'REACTION_PACK' && (
        <span className="inventory-reaction-miniature">{symbol} +1</span>
      )}
      {![
        'NICK_COLOR',
        'HASHTAG_COLOR',
        'PROFILE_BACKGROUND',
        'AVATAR_FRAME',
        'PROFILE_BADGE',
        'REACTION_PACK',
      ].includes(definition.type) && <strong>{symbol}</strong>}
    </span>
  );
}

export function InventoryPanel({
  username,
  initialData,
  canManage,
}: {
  username: string;
  initialData: PublicInventory;
  canManage: boolean;
}) {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTransfer, setShowTransfer] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedId]);

  const selected = useMemo(
    () => data.items.find((item) => item.id === selectedId) ?? null,
    [data.items, selectedId],
  );

  async function reload() {
    const next = await api<PublicInventory>(
      `/inventory/users/${encodeURIComponent(username)}`,
    );
    setData(next);
  }

  async function action(path: string, options: RequestInit = {}) {
    try {
      setBusy(true);
      setError('');
      setMessage('');
      await api(path, options);
      await reload();
      setSelectedId(null);
      setShowTransfer(false);
      setConfirmDelete(false);
      setMessage('Инвентарь обновлён');
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось изменить предмет',
      );
    } finally {
      setBusy(false);
    }
  }

  async function transfer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const recipient = String(form.get('username') ?? '').trim();
    if (!recipient) {
      setError('Укажите ник получателя');
      return;
    }
    await action(`/inventory/items/${selected.id}/transfer`, {
      method: 'POST',
      body: JSON.stringify({ username: recipient }),
    });
  }

  return (
    <section className="profile-inventory-section" aria-labelledby="inventory-title">
      <header className="profile-inventory-heading">
        <div>
          <h2 id="inventory-title">Инвентарь</h2>
          <p>
            Предметы оформления и коллекции пользователя. Нажмите на предмет,
            чтобы открыть его карточку.
          </p>
        </div>
        <span className="profile-inventory-count">
          {data.items.length} {data.items.length === 1 ? 'предмет' : 'предметов'}
        </span>
      </header>

      {message && <div className="success-box inventory-message">{message}</div>}
      {error && (
        <div className="error-box inventory-message" role="alert">
          {error}
        </div>
      )}

      {data.items.length ? (
        <div className="inventory-grid">
          {data.items.map((item) => (
            <button
              type="button"
              className={`inventory-item-card rarity-${item.definition.rarity.toLowerCase()} ${
                item.equipped ? 'is-equipped' : ''
              }`}
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                setShowTransfer(false);
                setConfirmDelete(false);
                setError('');
              }}
            >
              <ItemPreview definition={item.definition} />
              <span className="inventory-item-copy">
                <strong>{item.definition.name}</strong>
                <small>{typeNames[item.definition.type] ?? item.definition.type}</small>
              </span>
              {item.equipped && <b className="inventory-equipped-mark">Надето</b>}
            </button>
          ))}
        </div>
      ) : (
        <div className="compact-empty-state inventory-empty">
          <strong>Инвентарь пока пуст</strong>
          <span>Полученные предметы появятся здесь и будут видны в профиле.</span>
        </div>
      )}

      {selected && (
        <div
          className="inventory-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedId(null);
          }}
        >
          <section
            className="inventory-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inventory-dialog-title"
          >
            <button
              type="button"
              className="inventory-dialog-close"
              aria-label="Закрыть карточку предмета"
              onClick={() => setSelectedId(null)}
            >
              ×
            </button>

            <div className="inventory-dialog-preview">
              <ItemPreview definition={selected.definition} />
            </div>

            <div className="inventory-dialog-content">
              <div className="inventory-dialog-kicker">
                <span>{typeNames[selected.definition.type] ?? selected.definition.type}</span>
                <b className={`rarity-text-${selected.definition.rarity.toLowerCase()}`}>
                  {rarityNames[selected.definition.rarity] ?? selected.definition.rarity}
                </b>
              </div>
              <h3 id="inventory-dialog-title">{selected.definition.name}</h3>
              <p>{selected.definition.description}</p>
              <dl className="inventory-item-meta">
                {selected.serialNumber && (
                  <>
                    <dt>Экземпляр</dt>
                    <dd>№ {selected.serialNumber}</dd>
                  </>
                )}
                <dt>Получен</dt>
                <dd>{new Date(selected.acquiredAt).toLocaleDateString('ru-RU')}</dd>
                <dt>Состояние</dt>
                <dd>{selected.equipped ? 'Надето' : 'В инвентаре'}</dd>
              </dl>
            </div>

            {canManage && (
              <div className="inventory-dialog-actions">
                {selected.definition.equipable && (
                  <button
                    type="button"
                    className="button"
                    disabled={busy}
                    onClick={() =>
                      void action(
                        `/inventory/items/${selected.id}/${
                          selected.equipped ? 'unequip' : 'equip'
                        }`,
                        { method: 'POST' },
                      )
                    }
                  >
                    {selected.equipped ? 'Снять' : 'Надеть'}
                  </button>
                )}

                {selected.definition.transferable && (
                  <button
                    type="button"
                    className="button ghost"
                    disabled={busy}
                    onClick={() => {
                      setShowTransfer((value) => !value);
                      setConfirmDelete(false);
                    }}
                  >
                    Передать
                  </button>
                )}

                {selected.definition.deletable && (
                  <button
                    type="button"
                    className={`button ghost inventory-delete-button ${
                      confirmDelete ? 'confirming' : ''
                    }`}
                    disabled={busy}
                    onClick={() => {
                      if (!confirmDelete) {
                        setConfirmDelete(true);
                        setShowTransfer(false);
                        return;
                      }
                      void action(`/inventory/items/${selected.id}`, {
                        method: 'DELETE',
                      });
                    }}
                  >
                    {confirmDelete ? 'Подтвердить удаление' : 'Удалить'}
                  </button>
                )}
              </div>
            )}

            {canManage && showTransfer && selected.definition.transferable && (
              <form className="inventory-transfer-form" onSubmit={transfer}>
                <label htmlFor="inventory-recipient">Ник получателя</label>
                <div>
                  <input
                    id="inventory-recipient"
                    name="username"
                    autoComplete="off"
                    placeholder="username"
                    minLength={2}
                    maxLength={32}
                    required
                  />
                  <button type="submit" className="button" disabled={busy}>
                    Передать предмет
                  </button>
                </div>
                <small>После передачи предмет исчезнет из вашего инвентаря.</small>
              </form>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
