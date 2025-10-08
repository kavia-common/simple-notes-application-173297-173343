import React from 'react';
import { Note } from '../types';

type Props = {
  notes: Note[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
};

// PUBLIC_INTERFACE
export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
  query,
  onQueryChange,
}: Props) {
  /** Sidebar listing notes with search and create action */
  return (
    <div>
      <div className="search-row">
        <input
          aria-label="Search notes by title"
          className="input"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button className="btn btn-primary" onClick={onCreate} aria-label="Create new note">
          + New
        </button>
      </div>
      <ul className="notes-list" role="list">
        {notes.length === 0 && (
          <li style={{ padding: 12, color: '#6b7280' }}>No notes yet. Create your first note.</li>
        )}
        {notes.map((n) => (
          <li
            key={n.id}
            className={`note-item ${n.id === selectedId ? 'selected' : ''}`}
          >
            <button
              className="btn"
              style={{ background: 'transparent', border: 'none', textAlign: 'left', padding: 0, flex: 1 }}
              onClick={() => onSelect(n.id)}
              aria-label={`Open note: ${n.title || 'Untitled'}`}
              title={n.title || 'Untitled'}
            >
              <div className="note-title">{n.title || 'Untitled'}</div>
              <div className="note-meta">{new Date(n.updatedAt).toLocaleString()}</div>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(n.id)}
              aria-label={`Delete note ${n.title || ''}`}
              title="Delete note"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
