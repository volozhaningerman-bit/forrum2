'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { AuthShell } from '@/components/auth-shell';
import {
  PasswordField,
  passwordChecks,
} from '@/components/password-field';

type Availability = {
  available: boolean;
  normalized: string;
  reason?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] =
    useState('');
  const [password, setPassword] = useState('');
  const [availability, setAvailability] =
    useState<Availability | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checks = useMemo(
    () => passwordChecks(password),
    [password],
  );

  const usernameFormatValid =
    /^[a-zA-Z0-9_]{3,24}$/.test(username);

  useEffect(() => {
    const value = username.trim().toLowerCase();

    setAvailability(null);

    if (!/^[a-z0-9_]{3,24}$/.test(value)) {
      return;
    }

    const controller = new AbortController();

    const timer = window.setTimeout(() => {
      setChecking(true);

      api<Availability>(
        `/auth/username-availability?username=${encodeURIComponent(
          value,
        )}`,
        { signal: controller.signal },
      )
        .then(setAvailability)
        .catch((cause) => {
          if (
            (cause as Error).name !== 'AbortError'
          ) {
            setAvailability(null);
          }
        })
        .finally(() => setChecking(false));
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError('');

    if (
      !usernameFormatValid ||
      availability?.available === false
    ) {
      setError(
        'Выберите корректное свободное имя пользователя',
      );
      return;
    }

    if (
      !checks.longEnough ||
      !checks.hasLetter ||
      !checks.hasNumber
    ) {
      setError(
        'Пароль не соответствует требованиям',
      );
      return;
    }

    setLoading(true);

    try {
      const result = await api<{
        message: string;
        email: string;
      }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          username: username.trim().toLowerCase(),
          displayName,
          password,
        }),
      });

      sessionStorage.setItem(
        'forrum_pending_email',
        result.email,
      );

      router.push('/verify-email?sent=1');
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось создать аккаунт',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="FORRUM ID"
      title="Создать аккаунт"
      description="Заполните основные данные. Почту нужно будет подтвердить."
      footer={
        <p>
          Уже зарегистрированы?{' '}
          <Link href="/login">
            <strong>Войти</strong>
          </Link>
        </p>
      }
    >
      {error && (
        <div className="error-box" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <label>
          Почта
          <input
            type="email"
            autoComplete="email"
            value={email}
            placeholder="name@example.com"
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
          <span className="field-help">
            Сюда придёт ссылка подтверждения.
          </span>
        </label>

        <label>
          Имя пользователя
          <div className="username-input-wrap">
            <span>@</span>
            <input
              autoComplete="username"
              value={username}
              minLength={3}
              maxLength={24}
              placeholder="sebastian"
              onChange={(event) =>
                setUsername(
                  event.target.value.replace(/\s/g, ''),
                )
              }
              required
            />
          </div>

          {!username && (
            <span className="field-help">
              3–24 символа: латинские буквы, цифры и
              подчёркивание.
            </span>
          )}

          {username && !usernameFormatValid && (
            <span className="field-status error">
              Используйте 3–24 латинских символа,
              цифры или _
            </span>
          )}

          {usernameFormatValid && checking && (
            <span className="field-status">
              Проверяем доступность…
            </span>
          )}

          {usernameFormatValid &&
            !checking &&
            availability?.available && (
              <span className="field-status success">
                Имя свободно
              </span>
            )}

          {usernameFormatValid &&
            !checking &&
            availability &&
            !availability.available && (
              <span className="field-status error">
                {availability.reason ??
                  'Имя уже занято'}
              </span>
            )}
        </label>

        <label>
          Отображаемое имя
          <input
            value={displayName}
            minLength={2}
            maxLength={60}
            placeholder="Как к вам обращаться"
            onChange={(event) =>
              setDisplayName(event.target.value)
            }
            required
          />
        </label>

        <PasswordField
          label="Пароль"
          name="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          showRules
        />

        <button
          className="button auth-submit"
          disabled={
            loading ||
            checking ||
            !usernameFormatValid ||
            availability?.available === false
          }
        >
          {loading
            ? 'Создаём аккаунт…'
            : 'Создать аккаунт'}
        </button>
      </form>

      <p className="auth-privacy-note">
        Это тестовый аккаунт закрытой версии
        FORRUM.
      </p>
    </AuthShell>
  );
}
