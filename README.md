# Simple Notes Application - Frontend (Vite + React)

This is a simple notes application frontend built with Vite and React. It supports:
- Create, Read, Update, Delete notes
- Autosave edits (title/body)
- Search/filter by title
- LocalStorage persistence (no backend yet)
- Responsive, modern Ocean Professional theme (blue & amber accents)

Runs at port 3000 by default.

## Getting Started

1. Change directory:
   - `cd notes_frontend`

2. Install dependencies:
   - `npm install`

3. Start the dev server:
   - `npm run dev`
   - App will be available on http://localhost:3000

4. Build for production:
   - `npm run build`
   - Preview: `npm run preview`

## Notes Persistence

- Notes are stored in `localStorage` under the key `notes_app_data_v1`.
- No external services or environment variables are required.
- Data persists across reloads in the same browser.
- Clearing site data or switching browsers will remove notes.

## Keyboard & Accessibility

- Sidebar search input is focused with mouse/keyboard normally.
- Delete has confirmation dialog to prevent accidental deletion.
- Title input uses placeholder when empty.
- Editor uses a textarea with large click target and high contrast colors.

## Project Structure

- `src/main.tsx`: React entrypoint
- `src/App.tsx`: App shell, layout, and composition
- `src/components/Sidebar.tsx`: Notes list, search, new note
- `src/components/NoteEditor.tsx`: Title/body editor with autosave
- `src/hooks/useLocalNotes.ts`: Reducer-based notes store synced to localStorage
- `src/types.ts`: Shared types
- `src/styles/theme.css`: Ocean Professional theme variables and global styles

## Theme

Ocean Professional:
- primary: #2563EB
- secondary/success: #F59E0B
- error: #EF4444
- background: #f9fafb
- surface: #ffffff
- text: #111827

Includes subtle shadows, rounded corners, and smooth transitions.

## Roadmap

- Markdown formatting preview
- Tagging & sorting
- Backend API integration (replace localStorage)