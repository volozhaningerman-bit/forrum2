'use client';
import { useState } from 'react';

export type PasswordChecks = { longEnough: boolean; hasLetter: boolean; hasNumber: boolean };

export function passwordChecks(value: string): PasswordChecks {
  return {
    longEnough: value.length >= 10,
    hasLetter: /[A-Za-zА-Яа-яЁё]/u.test(value),
    hasNumber: /\d/.test(value),
  };
}

export function PasswordField({
  label,
  name,
  value,
  onChange,
  autoComplete,
  showRules = false,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: 'current-password' | 'new-password';
  showRules?: boolean;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);
  const checks = passwordChecks(value);
  return <label>{label}
    <div className="password-input-wrap">
      <input
        name={name}
        type={visible ? 'text' : 'password'}
        minLength={10}
        maxLength={128}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required
      />
      <button type="button" aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'} onClick={() => setVisible((current) => !current)}>
        {visible ? 'Скрыть' : 'Показать'}
      </button>
    </div>
    {showRules && <div className="password-rules" aria-live="polite">
      <span className={checks.longEnough ? 'done' : ''}>Не менее 10 символов</span>
      <span className={checks.hasLetter ? 'done' : ''}>Есть буква</span>
      <span className={checks.hasNumber ? 'done' : ''}>Есть цифра</span>
    </div>}
  </label>;
}
