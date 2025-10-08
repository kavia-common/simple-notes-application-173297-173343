import React, { useEffect, useRef } from 'react';
import { Note } from '../types';

type Props = {
  note: Note;
  onChange: (patch: Partial<Pick<Note, 'title' | 'body'>>) => void;
  onDelete: () => void;
};

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onDelete }: Props) {
  /** Editor for note title and body, autosaving on change */
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!note.title && titleRef.current) {
      titleRef.current.focus();
    }
  }, [note.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <div className="editor-toolbar">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-amber" title="Last updated" aria-label="Last updated time">
            Updated: {new Date(note.updatedAt).toLocaleTimeString()}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-danger" onClick={onDelete} aria-label="Delete note">
            Delete
          </button>
        </div>
      </div>

      <input
        ref={titleRef}
        className="title-input"
        placeholder="Title..."
        value={note.title}
        onChange={(e) => onChange({ title: e.target.value })}
        aria-label="Note title"
      />
      <textarea
        className="body-input"
        placeholder="Write your note here... (supports plain text)"
        value={note.body}
        onChange={(e) => onChange({ body: e.target.value })}
        aria-label="Note body"
      />
    </div>
  );
}
