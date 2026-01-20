# Example Screenshots

This folder contains screenshots for privacy UI pattern examples.

## Naming Convention

Each screenshot must be named after its example ID:

```
ex-001.png
ex-002.webp
ex-003.jpg
```

The example ID can be found in `catalog.json` under the `examples` array.

## Supported Formats

The UI tries extensions in this order: `.webp` → `.png` → `.jpg`

- **PNG** (recommended): Best for crisp UI screenshots with sharp text and edges
- **WebP**: Smaller file sizes with good quality, use for optimization
- **JPG**: Use only for photo-heavy content

## Screenshot Guidelines

### Dimensions
- **Width:** 1200–1600px (retina-friendly)
- **Aspect ratio:** Prefer 16:10 or 4:3 for consistency

### Content
- Crop to the relevant UI area
- Avoid excessive browser chrome or empty space
- Ensure the privacy UI pattern is clearly visible
- Capture in a clean state (no debug tools, notifications, etc.)

### Quality
- Use 2x resolution if possible for retina displays
- Avoid compression artifacts on text
- Ensure sufficient contrast for readability

## Adding New Screenshots

1. Take a screenshot of the example UI
2. Crop and resize according to guidelines above
3. Save as `{example-id}.png` (e.g., `ex-015.png`)
4. Drop the file in this folder
5. The UI will automatically display it—no code changes needed

## Missing Screenshots

If a screenshot is missing, the UI displays a placeholder with the expected filename.
Visit any pattern's Examples tab to see which screenshots are needed.

