# Interactive Resume Builder & View

A premium, interactive single-page resume application for **Ariharasuthan S**. The design, typography, and sections are inspired by a sleek, modern layout template, with advanced browser controls for live customization and print optimization.

## Live Preview
The project is configured to run locally. To view and edit the resume:
1. Run a local development server in the repository folder:
   ```bash
   python3 -m http.server 8085
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8085
   ```

---

## Key Features

* **Premium Layout & Design**: Styled with modern typography (Outfit and Source Sans 3) and a clean document-sheet grid.
* **Interactive Edit Mode**: Click the **Edit Mode** button on the top menu bar to make any text block, bullet point, or header directly editable. Custom modifications are instantly saved using browser `localStorage` so changes are preserved on page reload.
* **Theme Customization**: Change the visual theme instantly using the dropdown selector:
  * **Classic Lavender**: The primary purple brand style.
  * **Sleek Slate Blue**: A deep navy, professional layout.
  * **Modern Dark Mode**: High-contrast, eye-friendly dark design.
  * **Minimalist Charcoal**: Classic, clean monochrome styling.
* **Reset Data Option**: Easily discard all interactive edits and restore the original template details in a single click.
* **Perfect A4 PDF Export**: Custom CSS `@media print` rules hide the interactive editing headers and banners, clean up margins, adjust font sizes, and force print colors to output a professional, single-page or cleanly-partitioned A4 document.

---

## File Structure

```
├── index.html       # Semantic HTML layout of the resume & interactive dashboard
├── styles.css       # Layout grids, color tokens, theme variables, and print stylesheets
├── app.js           # Interactive state, theme switching, and localStorage handler
├── contents.txt     # Raw source resume text
├── resume.pdf       # Original source resume
├── .gitignore       # System file excludes
└── README.md        # Project guide (this file)
```

## How to Export to PDF
1. Ensure **Edit Mode** is saved/turned off.
2. Click the **Print Resume** button on the top-right of the dashboard (or press `Ctrl+P` / `Cmd+P`).
3. In your browser's Print Dialog:
   * **Destination**: Select *Save as PDF*.
   * **Paper Size**: Choose *A4*.
   * **Margins**: Set to *Default* or *None*.
   * **Headers & Footers**: Uncheck to hide browser page titles and date lines.
   * **Background Graphics**: Keep checked to ensure themed border dividers display.
4. Click **Save**.
