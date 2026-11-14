# Mobil sayfa kaydırma — ortak görev tanımı (12 Kasım 2026)

Repo: /Users/serkanok/Development/HTML/acelya-icin (static Turkish STEM site; each page is one self-contained HTML
lab or game with shared/theme.css + shared/app.js; computing kernels between /* KERNEL-BEGIN */ … /* KERNEL-END */ are
frozen; permanent tests scripts/check-g-<slug>.mjs and older suites test:f1/f2/c/d/e).

## The problem
The user will use the site on phones. On ~46 pages a canvas/SVG/stage used for dragging has `touch-action: none`
(or swallows touch moves via preventDefault). When it spans the screen width, a finger anywhere on it cannot scroll the
page, so the reader is stuck and cannot reach the controls or the Keşif Defteri below. Whole-page scrolling with a
finger must work everywhere on every page.

## The shared tool (already in shared/app.js — do not edit shared/)
`window.AcelyaTouch.guard(el, hit, opts?)`:
- On coarse pointers (phones/tablets) sets `el.style.touchAction = opts?.axis || "pan-y"` (inline, overrides page CSS),
  so a vertical finger move scrolls the page; on mouse/pen nothing changes.
- Adds a non-passive `touchstart` listener: if `hit(clientX, clientY, event)` returns true (the finger landed on
  something draggable: a point, handle, joint, body, slider knob drawn on canvas…), it calls `preventDefault()` so the
  page does not scroll for that touch and the drag works. Otherwise the page scrolls.
- `hit` may be omitted: then vertical moves always scroll and horizontal moves stay with the element.
- `AcelyaTouch.isCoarse()` tells whether the device is touch-first.
Caveats: preventDefault on touchstart also suppresses the synthetic `click`, so `hit` must return true only for
drag starts (pages should use pointer events). Add a `pointercancel` handler that ends any drag (the browser sends it
when it takes the gesture for scrolling). When a drag can start anywhere (e.g. "drag to rotate"), prefer: the hit test
returns true only on the object itself, or use `{axis: "pan-y"}` with horizontal-only interaction, or start the drag
after a short hold — choose what fits the page, keep it simple, and tell the reader in the hint text if behaviour
differs on touch (one short Turkish sentence, e.g. "Telefonda sürüklemek için noktaya dokunup tutun; boş yerde parmak
sayfayı kaydırır.").

Reference implementation: sarkac.html (search `nearBob` / `AcelyaTouch.guard`): only a finger on the bob (≈48 CSS px
radius) grabs the pendulum; elsewhere the page scrolls; pointerdown ignores touches that are not near the bob.

## Games
For games the play area legitimately needs all touches (swipes steer the game). There: keep the game's touch
handling, but make sure the page can still be scrolled with a finger: (a) on phones the game canvas must not occupy
the whole viewport height — cap it (e.g. max-height ≈ 60–65svh while keeping aspect ratio) so there is always a
non-game strip (title, buttons, record box, margins) to scroll from; (b) touch-control bars and buttons must not block
vertical scrolling (`touch-action: manipulation`, not `none`, unless a control truly needs it); (c) if the game only
uses taps or horizontal swipes, use AcelyaTouch.guard with `{axis:"pan-y"}` so vertical swipes scroll. Game
play must still work on touch (verify with synthesized touch events).

## Tools
- Scroll audit (real finger gestures via CDP): `node scripts/audit-scroll.mjs --only <slugs> --tabs`
  (PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright). It must report 0 blocked for your pages.
  The full report from before the fix is in scripts/.scroll-report.json.
- Size audit: `node scripts/audit-mobile.mjs --only <slugs> --width 360` must stay clean.
- Verify the interaction still works on touch: synthesize a touch drag with CDP `Input.dispatchTouchEvent`
  (touchStart on the draggable thing, several touchMove, touchEnd) in a context with `isMobile:true, hasTouch:true`,
  and check the page state changed and `scrollY` did not; also check a drag started on empty canvas scrolls the page.
  Put such throwaway scripts under .shots/tmp-kaydirma-<you>/ and delete them at the end.
- Existing tests must still pass: `node scripts/check-g-<slug>.mjs --browser` (if present), `node scripts/check-site.mjs
  --only <slug>`, `timeout 120 node scripts/smoke.mjs --only <slug> --tabs --width 390`. Some older pages are covered by
  suites (`npm run -s test:f1|f2|c|d|e`) — run the one that covers your page if any (grep scripts/check-*.mjs for the
  slug). Desktop (mouse) behaviour must be unchanged.

## Rules
Edit only your assigned pages (html; their check-g test only if an assertion must change — say so). Do not touch
shared/, index.html, docs/, digests or other pages. Never change kernels or displayed numbers. No git commands that
change state. Report per page: what you did (hit test / axis / game sizing), verification results, anything left.
