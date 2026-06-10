const tg = window.Telegram?.WebApp;

export const isTelegram = !!tg;
export const tgPlatform = tg?.platform ?? "unknown";
export const isMobile = tgPlatform === "ios" || tgPlatform === "android";

// --- Тема ---

const THEME_VARS_LIGHT: Record<string, string> = {
  "--theme-bg-color": "#efeff4",
  "--theme-bg-modals-color": "rgba(0, 0, 0, 0.4)",
  "--theme-bg-hint-color": "rgba(20, 104, 177, 0.15)",
  "--theme-header-tab-color": "#1468b1",
  "--theme-header-text-color": "#ffffff",
  "--theme-tab-icon-text-color": "#9bb1c5",
  "--theme-block-color": "#ffffff",
  "--theme-block-border-color": "rgba(0, 0, 0, 0.1)",
  "--theme-text-color": "#000000",
  "--theme-text-hint-color": "#a6a6a6",
  "--theme-icon-color": "#ffffff",
  "--theme-button-color": "#1468b1",
  "--theme-button-icon-text-color": "#ffffff",
  "--theme-button-hint-color": "rgba(20, 104, 177, 0.15)",
  "--theme-button-hint-icon-text-color": "#1468b1",
  "--theme-progress-bg-color": "#efeff4",
  "--theme-progress-color": "#1468b1",
  "--theme-bg-notification-color": "#dce8f3",
  "--theme-bg-step-color": "rgba(211, 211, 211, 0.7)",
  "--theme-step-text-color": "#4f4e4e",
  "--theme-loader-wallet-color":
    "rgba(205, 205, 205) 25%, rgba(225, 225, 225) 50%, rgba(205, 205, 205) 75%",
};

const THEME_VARS_DARK: Record<string, string> = {
  "--theme-bg-color": "#131313",
  "--theme-bg-modals-color": "rgba(255, 255, 255, 0.4)",
  "--theme-bg-hint-color": "rgba(203, 202, 198, 0.1)",
  "--theme-header-tab-color": "#191919",
  "--theme-header-text-color": "#CBCAC6",
  "--theme-tab-icon-text-color": "#707070",
  "--theme-block-color": "#1A1A1A",
  "--theme-block-border-color": "rgba(255, 255, 255, 0.1)",
  "--theme-text-color": "#CBCAC6",
  "--theme-text-hint-color": "#9E9E9E",
  "--theme-icon-color": "#CBCAC6",
  "--theme-button-color": "#CBCAC6",
  "--theme-button-icon-text-color": "#000000",
  "--theme-button-hint-color": "rgba(203, 202, 198, 0.1)",
  "--theme-button-hint-icon-text-color": "#CBCAC6",
  "--theme-progress-bg-color": "rgba(255, 255, 255, 0.15)",
  "--theme-progress-color": "#CBCAC6",
  "--theme-bg-notification-color": "#2C2C2B",
  "--theme-bg-step-color": "rgba(114, 114, 114, 0.7)",
  "--theme-step-text-color": "#b0b0b0",
  "--theme-loader-wallet-color":
    "rgba(100, 100, 100, 1) 25%, rgba(125, 125, 125, 1) 50%, rgba(100, 100, 100, 1) 75%",
};

export function applyTheme(theme: "light" | "dark") {
  if (!tg) return;
  const vars = theme === "light" ? THEME_VARS_LIGHT : THEME_VARS_DARK;
  const headerColor = theme === "light" ? "#1468B1" : "#191919";

  tg.setHeaderColor(headerColor);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

// --- Инициализация ---

export function initTelegram() {
  if (!tg) return;

  // Применить тему
  const initialTheme = tg.colorScheme;
  applyTheme(initialTheme);

  // Слушать смену темы
  tg.onEvent("themeChanged", () => {
    applyTheme(tg.colorScheme);
  });

  // Платформо-зависимые CSS-переменные
  const root = document.documentElement;
  if (isMobile) {
    if (tgPlatform === "ios" && tg.requestFullscreen) {
      tg.requestFullscreen();
    }
    root.style.setProperty("--tab-bar-height", "70px");
    // root.style.setProperty("--tab-bar-padding", "12px");
    root.style.setProperty("--inset-top-navigation", "90px");
  } else {
    root.style.setProperty("--tab-bar-height", "55px");
    // root.style.setProperty("--tab-bar-padding", "9px");
  }

  tg.lockOrientation?.();
  tg.expand();
  tg.disableVerticalSwipes?.();

  tg.ready();
}

// --- Haptic ---

export function hapticMedium() {
  tg?.HapticFeedback.impactOccurred("medium");
}
