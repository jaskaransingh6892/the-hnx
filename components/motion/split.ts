export type SplitWord = { outer: HTMLElement; inner: HTMLElement };

/**
 * Wraps every word in a two-level span without disturbing the surrounding
 * markup — a gradient `<span>` inside a heading stays exactly where it was, so
 * `background-clip: text` still paints across the whole phrase.
 *
 * The outer span is the one to clip; the inner span is the one to move.
 */
export function splitWords(root: HTMLElement, outerClass = "rv-word"): SplitWord[] {
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
