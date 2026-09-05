# The HNX — social brand assets

Ready-to-upload exports for social profiles. Everything here is generated from the
same mark and palette the site itself uses, so it stays in sync with `globals.css`.
Served publicly, so any of these can be linked directly, e.g.
`https://thehnx.com/brand/social/hnx-logo-on-dark.png`.

## Profile picture

| File | Use it for |
| --- | --- |
| `hnx-profile-circle-1024.png` | **Default choice.** LinkedIn, X, GitHub — they all crop to a circle, and this plate is already circular. |
| `hnx-profile-square-1024.png` | Anywhere a square avatar is kept square. |
| `hnx-profile-circle-512.png`, `hnx-profile-square-512.png` | Same, smaller, for upload limits. |

## Logo

| File | Use it for |
| --- | --- |
| `hnx-logo-on-dark.png` | Horizontal logo on the brand dark background. |
| `hnx-logo-on-light.png` | White or light backgrounds — "The" is darkened and the gradient deepened so it holds contrast. |
| `hnx-logo-transparent.png` | Transparent; the centre knot is punched out rather than filled dark, so it works on any surface. |
| `hnx-mark-transparent-1024.png`, `-512.png` | Mark only, no wordmark. |

## Covers

| File | Use it for |
| --- | --- |
| `banner-x-1500x500.png` | X header. |
| `banner-linkedin-1584x396.png` | LinkedIn personal cover. |
| `banner-linkedin-1128x191.png` | LinkedIn company page cover. |
| `social-card-og-1200x630.png` | Snapshot of the card `app/opengraph-image.tsx` generates — what shows when a link is shared. Regenerate from `/opengraph-image` rather than editing this file. |

## Vector originals

Not duplicated here — they live where the site uses them:

- `public/brand/hnx-logo.svg` — horizontal logo
- `public/brand/hnx-icon.svg` — icon with plate
- `app/icon.svg` — favicon

The navbar logo is neither of those: it is inline SVG plus live text in
`components/ui/Logo.tsx`. `hnx-logo.svg` is its standalone equivalent.
