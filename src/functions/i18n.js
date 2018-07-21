import I18n from 'react-native-i18n';

// Import all locales
import en from '../../locales/en.json';
import uk from '../../locales/uk.json';
import ru from '../../locales/ru.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  uk,
  ru,
};

export function strings(name, params = {}) {
  return I18n.t(name, params);
};
