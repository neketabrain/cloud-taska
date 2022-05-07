import { i18n } from './i18n';

export default i18n;

export function getLocale(): string {
  return i18n.language;
}
