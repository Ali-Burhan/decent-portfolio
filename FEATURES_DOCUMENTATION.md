# Portfolio Features Documentation

This document explains how the **Color Scheme System** and **Custom Cursor Effect** are implemented in this Next.js portfolio.

---

## 🎨 Color Scheme System

The color scheme system allows users to dynamically switch between 8 different accent colors that theme the entire portfolio.

### Available Color Schemes

1. **Visionary** - `#FF6B6B` (Vibrant Red)
2. **Depth Seeker** - `#00ADB5` (Teal)
3. **Subtle Luxe** - `#B388FF` (Purple)
4. **Ocean Breeze** - `#3B82F6` (Blue)
5. **Sunset Glow** - `#F97316` (Orange)
6. **Forest Zen** - `#10B981` (Green)
7. **Royal Purple** - `#8B5CF6` (Deep Purple)
8. **Coral Dream** - `#FB7185` (Coral Pink)
9. **Midnight Sky** - `#1E40AF` (Deep Blue)
10. **Cherry Blossom** - `#EC4899` (Pink)
11. **Amber Glow** - `#F59E0B` (Warm Amber)
12. **Mint Fresh** - `#14B8A6` (Mint Green)
13. **Lavender Dream** - `#A855F7` (Soft Lavender)
14. **Crimson Fire** - `#DC2626` (Bold Red)
15. **Electric Cyan** - `#06B6D4` (Vibrant Cyan)

### Architecture

#### 1. CSS Custom Properties (`app/globals.css`)

The foundation of the color system uses CSS custom properties (CSS variables):

```css
:root {
  --background: #ffffff;
  --foreground: #171717;

  /* Color scheme definitions */
  --visionary: #ff6b6b;
  --depth-seeker: #00adb5;
  --subtle-luxe: #b388ff;
  --ocean-breeze: #3b82f6;
  --sunset-glow: #f97316;
  --forest-zen: #10b981;
  --royal-purple: #8b5cf6;
  --coral-dream: #fb7185;

  /* Active accent color */
  --accent: var(--visionary);
}
```

**Dark mode variants** are defined with adjusted brightness:

```css
.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --visionary: #e95454;
  --ocean-breeze: #60a5fa;
  /* ... other colors with adjusted brightness */
}
```

#### 2. Data Attribute Selectors

Each color scheme has a corresponding `data-accent` attribute selector:

```css
[data-accent="ocean-breeze"] {
  --accent: var(--ocean-breeze);
}

[data-accent="sunset-glow"] {
  --accent: var(--sunset-glow);
}
```

When the user selects a color, the `data-accent` attribute is set on the `<body>` element, which updates the `--accent` variable globally.

#### 3. Tailwind CSS Integration

The colors are exposed to Tailwind CSS via the `@theme inline` directive:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-ocean-breeze: var(--ocean-breeze);
  /* ... all other colors */
}
```

This allows using them in Tailwind classes:

- `bg-accent` - Background with accent color
- `text-accent` - Text with accent color
- `border-accent` - Border with accent color
- `shadow-accent/50` - Shadow with 50% opacity accent

### Component Implementation

#### Accent Switcher Component (`components/accent-switcher.tsx`)

```tsx
const accents = [
  { name: "Visionary", value: "visionary", color: "#FF6B6B" },
  { name: "Ocean Breeze", value: "ocean-breeze", color: "#3B82F6" },
  // ... other colors
];

const handleAccentChange = (accent: string) => {
  setActiveAccent(accent);
  localStorage.setItem("accent", accent);
  document.body.setAttribute("data-accent", accent);
};
```

**Key Features:**

1. **Persistence**: Selected color is saved to `localStorage`
2. **Immediate Update**: Changes the `data-accent` attribute on `<body>`
3. **Visual Feedback**: Shows current selection with checkmark
4. **Color Preview**: Displays color swatch for each option

#### Navbar Integration (`components/nav.tsx`)

The accent switcher is integrated into the navbar with:

- Desktop: Dropdown menu with all color options
- Mobile: Simplified toggle that cycles through colors

```tsx
// Desktop dropdown
<motion.button onClick={() => setAccentDropdownOpen(!accentDropdownOpen)}>
  <div className="w-5 h-5 rounded-full"
       style={{ backgroundColor: accents.find(a => a.value === activeAccent)?.color }} />
</motion.button>

// Mobile toggle (cycles through colors)
<button onClick={() => {
  const nextIndex = (accents.findIndex(a => a.value === activeAccent) + 1) % accents.length;
  handleAccentChange(accents[nextIndex].value);
}}>
```

### How It Works: Step-by-Step

1. **User clicks** on a color in the accent switcher
2. **JavaScript updates** the `data-accent` attribute on `<body>`
   ```js
   document.body.setAttribute("data-accent", "ocean-breeze");
   ```
3. **CSS selector activates** and updates the `--accent` variable
   ```css
   [data-accent="ocean-breeze"] {
     --accent: var(--ocean-breeze);
   }
   ```
4. **All components** using `var(--accent)` or Tailwind's `accent` color instantly update
5. **Choice is saved** to `localStorage` for persistence across sessions

### Adding New Colors

To add a new color scheme:

1. **Add to CSS** (`app/globals.css`):

   ```css
   :root {
     --my-new-color: #123456;
   }

   [data-accent="my-new-color"] {
     --accent: var(--my-new-color);
   }

   .dark {
     --my-new-color: #234567; /* Adjusted for dark mode */
   }

   @theme inline {
     --color-my-new-color: var(--my-new-color);
   }
   ```

2. **Add to components** (`components/nav.tsx` and `components/accent-switcher.tsx`):
   ```tsx
   const accents = [
     // ... existing colors
     { name: "My New Color", value: "my-new-color", color: "#123456" },
   ];
   ```

---

## 🖱️ Custom Cursor Effect

The custom cursor replaces the default system cursor with an animated, interactive cursor that responds to user actions.

### Features

1. **Smooth Following**: Cursor smoothly follows mouse movement using spring physics
2. **Hover Detection**: Enlarges and changes color when hovering over interactive elements
3. **Element Tooltips**: Shows element name/text when hovering
4. **Scroll Progress**: Inner fill shows page scroll progress
5. **Click Ripples**: Disabled for performance (can be re-enabled)
6. **Context Menu**: Custom right-click menu with quick actions
7. **Copy Feedback**: Visual confirmation when text is copied
8. **Toggle-able**: Can be disabled via cursor toggle button

### Architecture

#### Component Structure (`components/custom-cursor.tsx`)

```tsx
export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, show: false });
  const [cursorEnabled, setCursorEnabled] = useState(true);

  // ... implementation
}
```

### Core Mechanics

#### 1. Mouse Tracking

```tsx
const handleMouseMove = (e: MouseEvent) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

useEffect(() => {
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
```

#### 2. Spring Animation (Framer Motion)

The cursor uses spring physics for smooth, natural movement:

```tsx
<motion.div
  animate={{
    x: mousePosition.x - 12,
    y: mousePosition.y - 12,
    scale: isHovering ? 1.5 : 1,
  }}
  transition={{
    type: "spring",
    stiffness: 1200, // Ultra-fast response
    damping: 12, // Minimal resistance
    mass: 0.2, // Feather-light
  }}
/>
```

**Performance Optimization:**

- `stiffness: 1200` - Ultra-fast response to mouse movement
- `damping: 12` - Minimal lag, buttery smooth feel
- `mass: 0.2` - Feather-light for instant acceleration
- `willChange: "transform"` - GPU acceleration hint

#### 3. Hover Detection

```tsx
const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (
    target.tagName === "A" ||
    target.tagName === "BUTTON" ||
    target.closest("a") ||
    target.closest("button") ||
    target.classList.contains("cursor-pointer")
  ) {
    setIsHovering(true);
    const text = target.textContent?.trim().slice(0, 20) || "Click";
    setHoveredElement(text);
  } else {
    setIsHovering(false);
    setHoveredElement("");
  }
};
```

#### 4. Scroll Progress Indicator

```tsx
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  setScrollProgress(Math.min(progress, 100));
};

// Visual representation
<motion.div
  className="absolute bottom-0 left-0 right-0 bg-accent/50"
  style={{ height: `${scrollProgress}%` }}
/>;
```

#### 5. Custom Context Menu

Right-click triggers a custom menu with quick actions:

```tsx
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  setContextMenu({ x: e.clientX, y: e.clientY, show: true });
};

// Menu actions include:
// - Navigation (Home, About, Projects, etc.)
// - Theme toggle
// - Copy email
// - Social links
// - Page reload
```

### Visual Layers

The cursor consists of multiple layers:

1. **Main Dot** (24px)

   - Filled circle with accent color
   - Contains scroll progress indicator
   - Scales up on hover

2. **Outer Ring** (40px)

   - Hollow circle with accent border
   - Follows with slight delay for trailing effect
   - Also scales on hover

3. **Element Tooltip**

   - Appears when hovering interactive elements
   - Shows element text/name
   - Positioned above and to the right of cursor

4. **Copy Feedback**
   - Green "✓ Copied!" message
   - Appears when text is copied
   - Auto-dismisses after 2 seconds

### Hiding Default Cursor

```css
/* app/globals.css */
@media (min-width: 768px) {
  * {
    cursor: none !important;
  }
}
```

**Important:** Custom cursor only shows on desktop (≥768px). Mobile devices use native cursor.

### Toggle Functionality

Users can disable the custom cursor via the toggle button in the navbar:

```tsx
// components/cursor-toggle.tsx
const handleToggle = () => {
  const newState = !enabled;
  setEnabled(newState);
  localStorage.setItem("customCursor", newState ? "enabled" : "disabled");

  // Dispatch event to notify CustomCursor component
  window.dispatchEvent(
    new CustomEvent("cursorToggle", {
      detail: { enabled: newState },
    })
  );
};
```

### Performance Considerations

1. **GPU Acceleration**: Uses `transform` instead of `top/left` for positioning
2. **Will-Change**: Hints browser to optimize transform animations
3. **Passive Listeners**: Scroll events use `{ passive: true }`
4. **Disabled Features**: Trail particles and ripples disabled by default
5. **Conditional Rendering**: Only renders on desktop (`hidden md:block`)
6. **Event Cleanup**: All listeners properly removed on unmount

### Customization Options

#### Adjust Cursor Speed

In `custom-cursor.tsx`, modify the spring configuration:

```tsx
transition={{
  type: "spring",
  stiffness: 1200,  // ↑ = faster, ↓ = slower (current: ultra-fast)
  damping: 12,      // ↑ = less bounce, ↓ = more bounce (current: minimal)
  mass: 0.2,        // ↑ = heavier, ↓ = lighter (current: feather-light)
}}
```

#### Change Cursor Size

```tsx
style={{
  width: "24px",   // Main dot size
  height: "24px",
}}

// Outer ring
style={{
  width: "40px",
  height: "40px",
}}
```

#### Enable Trail Particles

Uncomment the trail rendering code (currently disabled for performance):

```tsx
// In the render section
{
  trails.map((trail) => (
    <motion.div
      key={trail.id}
      className="absolute w-2 h-2 rounded-full bg-accent/30"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
      style={{ left: trail.x, top: trail.y }}
    />
  ));
}
```

---

## 🔧 Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4 with CSS Custom Properties
- **Animation**: Framer Motion
- **State**: React Hooks (useState, useEffect)
- **Storage**: localStorage for persistence
- **TypeScript**: Full type safety

---

## 📝 Summary

### Color Scheme System

- **15 color options** with light/dark variants
- **CSS Custom Properties** for dynamic theming
- **localStorage** persistence
- **Instant switching** via data attributes
- **Tailwind integration** for easy usage

### Custom Cursor

- **Spring physics** for smooth movement
- **Interactive feedback** on hover
- **Scroll progress** indicator
- **Custom context menu** with quick actions
- **Toggle-able** with localStorage persistence
- **Performance optimized** with GPU acceleration

Both systems are designed to be:

- ✅ **User-friendly**: Easy to use and customize
- ✅ **Performant**: Optimized for smooth 60fps animations
- ✅ **Accessible**: Can be disabled if needed
- ✅ **Persistent**: Saves user preferences
- ✅ **Extensible**: Easy to add new colors or cursor features
