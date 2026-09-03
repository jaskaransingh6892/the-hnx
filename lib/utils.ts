export type ClassValue = string | false | null | undefined;

/** Tiny classname joiner — keeps the bundle free of an extra dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
