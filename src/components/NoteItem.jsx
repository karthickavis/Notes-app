import React,{ useContext } from "react";
import { NoteContext } from "../context/Context";

function NoteItem({note,onEdit}){
    const{dispatch}=useContext(NoteContext);

    const handleDelete=()=>{
        dispatch({type:'DELETE',payload:note.id});
    }

    const handleEdit=()=>{
      onEdit(note);
    }
    return (
       <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 shadow-sm">
  <h3 className="text-xl font-semibold text-blue-700">{note.title}</h3>
  <p className="text-gray-700 my-2">{note.body}</p>
  <div className="flex gap-3">
    <button
      onClick={handleEdit}
      className="px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
    >
      Edit
    </button>
    <button
      onClick={handleDelete}
      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
</div>

  );

}
export default React.memo(NoteItem);