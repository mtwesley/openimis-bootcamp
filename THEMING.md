# Color & Theming System

## Tailwind CSS v4 - Important Changes

This project uses **Tailwind CSS v4**, which has a completely different theming system compared to v3.

### Key Differences from Tailwind v3

❌ **OLD (v3):** Colors defined in `tailwind.config.js`
```javascript
// This NO LONGER WORKS in v4!
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
    }
  }
}
```

✅ **NEW (v4):** Colors defined in CSS using `@theme` directive
```css
@theme {
  --color-primary: #3b82f6;
}
```

## Our Color Palette

### Brand Colors
Used for buttons, links, and primary UI elements:

| Variable | Value | Usage | Example Classes |
|----------|-------|-------|-----------------|
| `--color-primary` | `#3b82f6` | Primary brand color | `bg-primary`, `text-primary`, `border-primary` |
| `--color-secondary` | `#1e40af` | Secondary/hover states | `bg-secondary`, `hover:bg-secondary` |
| `--color-card-background` | `#ffffff` | Card backgrounds | `bg-card-background` |
| `--color-border-color` | `#e5e7eb` | Borders and dividers | `border-border-color` |

### Icon Color Palette
Diverse colors for visual differentiation:

| Variable | Value | Color | Usage |
|----------|-------|-------|-------|
| `--color-icon-blue` | `#3b82f6` | Blue | Generic/default icons |
| `--color-icon-green` | `#10b981` | Green | Success, paths, completion |
| `--color-icon-purple` | `#8b5cf6` | Purple | Education, courses, books |
| `--color-icon-orange` | `#f97316` | Orange | Time, playlists, warnings |
| `--color-icon-red` | `#ef4444` | Red | YouTube, videos |
| `--color-icon-teal` | `#14b8a6` | Teal | Web, global, platforms |
| `--color-icon-pink` | `#ec4899` | Pink | Special features |
| `--color-icon-indigo` | `#6366f1` | Indigo | Analytics, charts |
| `--color-icon-yellow` | `#eab308` | Yellow | Time-based, intermediate |
| `--color-icon-cyan` | `#06b6d4` | Cyan | Microsoft, technical |

## Usage Examples

### In Components
```tsx
// Background colors
<div className="bg-primary">...</div>
<div className="bg-icon-green">...</div>

// Text colors
<span className="text-primary">...</span>
<i className="text-icon-red">...</i>

// Border colors
<div className="border border-primary">...</div>

// With opacity modifiers
<div className="bg-primary/10">...</div>  // 10% opacity
<div className="text-icon-purple/50">...</div>  // 50% opacity
```

### Icon Color Utility
We have a helper function in `src/utils/iconColors.ts` that automatically assigns appropriate colors to icons:

```tsx
import { getIconColor } from '../utils/iconColors';

// Automatically gets the right color for the icon
<i className={`fas fa-youtube ${getIconColor('fas fa-youtube', 'platform')}`}></i>
// Results in: text-icon-red

<i className={`fas fa-graduation-cap ${getIconColor('fas fa-graduation-cap', 'format')}`}></i>
// Results in: text-icon-purple
```

## How to Add New Colors

1. Open `src/index.css`
2. Add your color variable in the `@theme` block:
```css
@theme {
  /* Existing colors... */
  
  /* Your new color */
  --color-my-new-color: #123456;
}
```
3. Use it in components with `bg-my-new-color`, `text-my-new-color`, etc.

## Troubleshooting

### "My colors aren't working!"
- ✅ Make sure you're defining colors in `src/index.css` inside `@theme { }`, NOT in `tailwind.config.js`
- ✅ Use the format `--color-{name}`, not just `--{name}`
- ✅ Restart your dev server after adding new colors

### "ESLint shows @theme error"
- This is normal - ESLint doesn't recognize Tailwind v4's `@theme` directive yet
- The PostCSS plugin handles it correctly, so you can ignore this warning

## Migration from v3 to v4

If you see old color definitions in `tailwind.config.js`, they won't work. Move them to the `@theme` block in CSS:

**Before (v3 - doesn't work):**
```javascript
// tailwind.config.js
colors: {
  brand: '#ff0000'
}
```

**After (v4 - correct):**
```css
/* src/index.css */
@theme {
  --color-brand: #ff0000;
}
```

## References
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- Icon Colors: `src/utils/iconColors.ts`
- Main Theme: `src/index.css`
