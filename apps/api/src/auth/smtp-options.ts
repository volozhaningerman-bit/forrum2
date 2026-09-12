type ConfigReader = { get<T = string>(key: string): T | undefined };

export function smtpOptions(config: ConfigReader) {
  const production = config.get('NODE_ENV') === 'production';
  const host = config.get('SMTP_HOST')?.trim() || (production ? '' : 'localhost');
  if (!host) throw new Error('SMTP_HOST is required in production');
  const port = Number(config.get('SMTP_PORT') || (production ? 587 : 1025));
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid SMTP_PORT');
  const secureSetting = config.get('SMTP_SECURE');
  if (secureSetting !== undefined && !['true', 'false'].includes(String(secureSetting))) {
    throw new Error('SMTP_SECURE must be true or false');
  }
  const secure = secureSetting === undefined ? port === 465 : String(secureSetting) === 'true';
  const user = config.get('SMTP_USER');
  const pass = config.get('SMTP_PASS');
  if (Boolean(user) !== Boolean(pass)) throw new Error('Set both SMTP_USER and SMTP_PASS');
  return {
    host, port, secure,
    requireTLS: production && !secure,
    ...(user && pass ? { auth: { user, pass } } : {}),
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 5000,
    dnsTimeout: 5000,
  };
}
