// Типы для window.Telegram.WebApp
export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  platform: string;
  version: string;
  colorScheme: "light" | "dark";
  BackButton: {
    show(): void;
    hide(): void;
    onClick(fn: () => void): void;
    offClick(fn: () => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
    selectionChanged(): void;
  };
  expand(): void;
  lockOrientation?(): void;
  disableVerticalSwipes?(): void;
  requestFullscreen?(): void;
  setHeaderColor(color: string): void;
  onEvent(event: string, fn: () => void): void;
  offEvent(event: string, fn: () => void): void;
  ready(): void;
}
