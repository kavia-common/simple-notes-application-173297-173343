export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type NotesState = {
  notes: Note[];
  selectedId: string | null;
};

export type NotesAction =
  | { type: 'hydrate'; state: NotesState }
  | { type: 'create' }
  | { type: 'select'; id: string }
  | { type: 'update'; id: string; patch: Partial<Pick<Note, 'title' | 'body'>> }
  | { type: 'delete'; id: string };
