import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { NoteContext } from "../context/Context";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";

function NoteList() {
  const { state } = useContext(NoteContext);
  const [editNote, setEditNote] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // reduced delay for more responsive search

    return () => clearTimeout(handler);
  }, [search]);

  // Edit note callback
  const handleEdit = useCallback((note) => {
    setEditNote(note);
  }, []);

  // Filter notes using memoization
  const filteredNotes = useMemo(() => {
    const lowerSearch = debouncedSearch.toLowerCase();
    return state.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerSearch) ||
        note.body.toLowerCase().includes(lowerSearch)
    );
  }, [state.notes, debouncedSearch]); // ⚠️ fix: should depend on debouncedSearch, not search

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search notes"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <NoteForm editNote={editNote} setEditNote={setEditNote} />

      {filteredNotes.length === 0 ? (
        <p className="text-gray-500 text-center">No notes found.</p>
      ) : (
        filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} onEdit={handleEdit} />
        ))
      )}
    </div>
  );
}

export default NoteList;
