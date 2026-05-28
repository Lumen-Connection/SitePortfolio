import type { Locale } from './translations'

/**
 * Returns the localized variant of a data field if the locale is English and the `_en` field exists.
 * Falls back to the Portuguese field otherwise.
 *
 * Usage: tField(item, 'description', locale)
 */
export function tField<T extends Record<string, unknown>, K extends keyof T & string>(
  item: T,
  field: K,
  locale: Locale,
): string {
  if (locale === 'en') {
    const enKey = `${field}_en` as keyof T
    const enValue = item[enKey]
    if (typeof enValue === 'string' && enValue.length > 0) return enValue
  }
  const baseValue = item[field]
  return typeof baseValue === 'string' ? baseValue : ''
}
