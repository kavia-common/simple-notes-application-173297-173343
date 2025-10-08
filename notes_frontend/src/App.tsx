import React, { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import { useLocalNotes } from './hooks/useLocalNotes';
import { Note } from './types';

// PUBLIC_INTERFACE
export default function App() {
  /** App container with Ocean Professional theme and split layout */
  const { state, dispatch } = useLocalNotes();
  const { notes, selectedId } = state;

  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => n.title.toLowerCase().includes(q));
  }, [notes, query]);

  const selectedNote: Note | undefined = useMemo(
    () => notes.find((n) => n.id === selectedId),
    [notes, selectedId]
  );

  const handleCreate = () => {
    dispatch({ type: 'create' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this note? This cannot be undone.')) {
      dispatch({ type: 'delete', id });
    }
  };

  const handleSelect = (id: string) => dispatch({ type: 'select', id });

  const handleUpdate = (id: string, patch: Partial<Pick<Note, 'title' | 'body'>>) => {
    dispatch({ type: 'update', id, patch });
  };

  return (
    <div className="app-root">
      <header className="app-header" role="banner">
        <div className="brand">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-name">Simple Notes</span>
        </div>
        <div className="header-actions" />
      </header>

      <main className="app-main" role="main">
        <aside className="sidebar" aria-label="Notes list">
          <Sidebar
            notes={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
            query={query}
            onQueryChange={setQuery}
          />
        </aside>

        <section className="editor" aria-label="Note editor">
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onChange={(patch) => handleUpdate(selectedNote.id, patch)}
              onDelete={() => handleDelete(selectedNote.id)}
            />
          ) : (
            <div className="empty-state">
              <h2>No note selected</h2>
              <p>Select a note from the list or create a new one.</p>
              <button className="btn btn-primary" onClick={handleCreate}>
                + New Note
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
