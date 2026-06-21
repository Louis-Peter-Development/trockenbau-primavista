import './ThemeSwitcher.scss';
import { useTheme } from '../../hooks/useTheme';

function ThemeSwitcher() {
  const { resolvedTheme, setThemePreference } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  const label = isDark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln';

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={() => setThemePreference(nextTheme)}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <span className="theme-switcher__track" aria-hidden="true">
        <span className="theme-switcher__sun" />
        <span className="theme-switcher__moon" />
        <span className="theme-switcher__knob" />
      </span>
    </button>
  );
}

export default ThemeSwitcher;
