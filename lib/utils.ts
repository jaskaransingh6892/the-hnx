export type ClassValue = string | false | null | undefined;

/** Tiny classname joiner — keeps the bundle free of an extra dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Column classes for a product grid. Below three items a three-column track
 * leaves an empty cell, so the grid narrows and centres instead.
 */
export function productGridColumns(count: number) {
  return count >= 3
    ? "md:grid-cols-2 lg:grid-cols-3"
    : "mx-auto w-full max-w-4xl md:grid-cols-2";
}
