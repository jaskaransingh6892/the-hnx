export type SplitWord = { outer: HTMLElement; inner: HTMLElement };

/** Original `background-image` of a gradient phrase, before we blank it out. */
const originalGradient = new WeakMap<HTMLElement, string>();

/**
 * Wraps every word in a two-level span without disturbing the surrounding
 * markup. The outer span is the one to clip; the inner span is the one to move.
 */
export function splitWords(root: HTMLElement, outerClass = "rv-word"): SplitWord[] {
  // Effects re-run — a re-render, or React's double-invoke in development.
  // Splitting an already-split tree would walk past every word (they carry
  // outerClass) and hand back nothing, leaving the words parked off-screen
  // with no tween left to bring them in. So reuse what is already there.
  const existing = root.querySelectorAll<HTMLElement>(`.${outerClass}`);
  if (existing.length) {
    return [...existing].map((outer) => ({
      outer,
      inner: outer.firstElementChild as HTMLElement,
    }));
  }

  const parts: SplitWord[] = [];

  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        if (!text.trim()) continue;

        const fragment = document.createDocumentFragment();
        for (const chunk of text.split(/(\s+)/)) {
          if (!chunk) continue;
          if (/^\s+$/.test(chunk)) {
            fragment.appendChild(document.createTextNode(chunk));
            continue;
          }
          const outer = document.createElement("span");
          outer.className = outerClass;
          const inner = document.createElement("span");
          inner.className = `${outerClass}__in`;
          inner.textContent = chunk;
          outer.appendChild(inner);
          fragment.appendChild(outer);
          parts.push({ outer, inner });
        }
        child.replaceWith(fragment);
        continue;
      }

      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        if (element.classList.contains(outerClass)) continue;
        walk(element);
      }
    }
  };

  walk(root);
  return parts;
}

/** Nearest ancestor painting its text with a clipped background gradient. */
function gradientAncestor(node: HTMLElement, root: HTMLElement): HTMLElement | null {
  let element: HTMLElement | null = node.parentElement;
  while (element) {
    if (originalGradient.has(element)) return element;
    const style = getComputedStyle(element);
    const clip = style.webkitBackgroundClip || style.backgroundClip;
    if (clip === "text" && style.backgroundImage !== "none") {
      originalGradient.set(element, style.backgroundImage);
      return element;
    }
    if (element === root) break;
    element = element.parentElement;
  }
  return null;
}

/**
 * A transformed, filtered or will-change'd element gets its own stacking
 * context, and an ancestor's `background-clip: text` can no longer paint
 * through it — the glyphs come out transparent and the word vanishes.
 *
 * So each word carries its own copy of the gradient instead. Sizing the
 * background to the whole phrase and offsetting it by the word's position
 * reproduces one continuous ramp across the line, exactly as before.
 *
 * Call this after every re-measure: the offsets move when the text rewraps.
 */
export function inheritGradients(elements: HTMLElement[], root: HTMLElement): void {
  const phrases = new Set<HTMLElement>();

  // Viewport rects, not offsetLeft/offsetTop: a transformed ancestor becomes
  // the offsetParent of everything under it, so the two elements would be
  // measured against different origins and the ramp would break apart.
  // Callers must clear any transforms before calling.
  const phraseRects = new Map<HTMLElement, DOMRect>();

  for (const element of elements) {
    const ancestor = gradientAncestor(element, root);
    if (!ancestor) continue;
    phrases.add(ancestor);

    let phraseRect = phraseRects.get(ancestor);
    if (!phraseRect) {
      phraseRect = ancestor.getBoundingClientRect();
      phraseRects.set(ancestor, phraseRect);
    }
    const rect = element.getBoundingClientRect();

    element.style.backgroundImage = originalGradient.get(ancestor) ?? "";
    element.style.backgroundSize = `${phraseRect.width}px ${phraseRect.height}px`;
    element.style.backgroundPosition = `${phraseRect.left - rect.left}px ${
      phraseRect.top - rect.top
    }px`;
    element.style.webkitBackgroundClip = "text";
    element.style.backgroundClip = "text";
    element.style.color = "transparent";
  }

  // Leaving the phrase-level gradient on would paint a second, misaligned
  // copy behind the words that now carry their own.
  for (const phrase of phrases) phrase.style.backgroundImage = "none";
}

/** Words sitting within a few pixels of each other belong to the same line. */
export function lineIndexes(parts: SplitWord[]): number[] {
  const tops: number[] = [];
  return parts.map(({ outer }) => {
    const top = outer.offsetTop;
    const existing = tops.findIndex((value) => Math.abs(value - top) < 6);
    if (existing !== -1) return existing;
    tops.push(top);
    return tops.length - 1;
  });
}

/**
 * Breaks each already-split word down to individual characters, so a pointer
 * can push them around independently of the line reveal that moves the word.
 * Idempotent, like splitWords.
 */
export function splitChars(parts: SplitWord[]): HTMLElement[] {
  const chars: HTMLElement[] = [];

  for (const { inner } of parts) {
    const existing = inner.querySelectorAll<HTMLElement>(".rv-char");
    if (existing.length) {
      chars.push(...existing);
      continue;
    }

    const text = inner.textContent ?? "";
    inner.textContent = "";
    for (const character of text) {
      const span = document.createElement("span");
      span.className = "rv-char";
      span.textContent = character;
      inner.appendChild(span);
      chars.push(span);
    }
  }

  return chars;
}
