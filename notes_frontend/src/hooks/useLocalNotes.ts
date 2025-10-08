import { useEffect, useMemo, useReducer } from 'react';
import { Note, NotesState, NotesAction } from '../types';

const STORAGE_KEY = 'notes_app_data_v1';

function nowIso() {
  return new Date().toISOString();
}

function createNewNote(): Note {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  const stamp = nowIso();
  return {
    id,
    title: '',
    body: '',
    createdAt: stamp,
    updatedAt: stamp,
  };
}

function load(): NotesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { notes: [], selectedId: null };
    const parsed = JSON.parse(raw) as NotesState;
    // Basic shape validation
    if (!parsed || !Array.isArray(parsed.notes)) return { notes: [], selectedId: null };
    return {
      notes: parsed.notes,
      selectedId: parsed.selectedId ?? (parsed.notes[0]?.id ?? null),
    };
  } catch {
    return { notes: [], selectedId: null };
  }
}

function persist(state: NotesState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors (quota, etc.)
  }
}

function reducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case 'hydrate': {
      return action.state;
    }
    case 'create': {
      const newNote = createNewNote();
      const next: NotesState = {
        notes: [newNote, ...state.notes],
        selectedId: newNote.id,
      };
      persist(next);
      return next;
    }
    case 'select': {
      const next = { ...state, selectedId: action.id };
      persist(next);
      return next;
    }
    case 'update': {
      const nextNotes = state.notes.map((n) =>
        n.id === action.id ? { ...n, ...action.patch, updatedAt: nowIso() } : n
      );
      const next: NotesState = { ...state, notes: nextNotes };
      persist(next);
      return next;
    }
    case 'delete': {
      const nextNotes = state.notes.filter((n) => n.id !== action.id);
      const nextSelected =
        state.selectedId === action.id
          ? nextNotes[0]?.id ?? null
          : state.selectedId;
      const next: NotesState = { notes: nextNotes, selectedId: nextSelected };
      persist(next);
      return next;
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function useLocalNotes() {
  /**
   * Hook providing notes state and dispatch actions, persisted to localStorage.
   * Actions: hydrate (internal), create, select, update, delete
   */
  const [state, dispatchBase] = useReducer(reducer, undefined as unknown as NotesState, () => load());

  // Ensure selection is valid on first mount
  useEffect(() => {
    if (!state.selectedId && state.notes[0]) {
      dispatchBase({ type: 'select', id: state.notes[0].id });
    }
    // Persist initial state to ensure structure exists
    persist(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useMemo(() => dispatchBase, [dispatchBase]);

  return { state, dispatch };
}
