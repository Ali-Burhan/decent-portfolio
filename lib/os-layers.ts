/** Z-index scale for the OS desktop — navbar must stay above windows & icons. */
export const OS_Z = {
  desktop: 0,
  icons: 5,
  windowsBase: 50,
  windowsMax: 89,
  navbar: 100,
  startBackdrop: 105,
  startMenu: 110,
  taskbar: 120,
} as const;

const WINDOW_Z_SPAN = OS_Z.windowsMax - OS_Z.windowsBase;

/** Keeps window stacking order while never exceeding the navbar layer. */
export function windowStackZ(zIndex: number): number {
  const clamped = Math.min(Math.max(zIndex, 1), WINDOW_Z_SPAN);
  return OS_Z.windowsBase + clamped;
}

export function nextWindowZIndex(currentHighest: number): number {
  return currentHighest >= WINDOW_Z_SPAN ? 11 : currentHighest + 1;
}
