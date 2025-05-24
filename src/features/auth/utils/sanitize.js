// utils/sanitize.js

/**
 * Sanitiza y valida un email (previene XSS y formato incorrecto)
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  // Elimina espacios y caracteres peligrosos
  const clean = email.trim().replace(/[<>'"/\\]/g, '');
  // Validación básica de email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(clean) ? clean : '';
}

/**
 * Sanitiza y valida un password (solo elimina espacios iniciales/finales)
 */
export function sanitizePassword(password) {
  if (typeof password !== 'string') return '';
  // No permitimos espacios al inicio/fin
  return password.trim();
}
