import React, { useState, useContext, useEffect, useCallback } from 'react';
import { NoteContext } from '../context/Context';
import { v4 as uuid } from 'uuid';

const NoteForm = ({ editNote, setEditNote }) => {
  const { dispatch } = useContext(NoteContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Set form fields when editing
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setBody(editNote.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editNote]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) return;

    if (editNote) {
      dispatch({
        type: 'EDIT',
        payload: { ...editNote, title: trimmedTitle, body: trimmedBody },
      });
      setEditNote(null);
    } else {
      const newNote = {
        id: uuid(),
        title: trimmedTitle,
        body: trimmedBody,
      };
      dispatch({ type: 'ADD', payload: newNote });
    }

    setTitle('');
    setBody('');
  },[title,body,editNote,dispatch,setEditNote]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        required
        placeholder="Title"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        required
        placeholder="Write something..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 resize-none"
        rows="4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        {editNote ? 'Update' : 'Add'} Note
      </button>
    </form>
  );
};

export default React.memo(NoteForm);
