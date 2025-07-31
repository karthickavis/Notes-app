import { createContext,useReducer,useEffect } from "react";

export const NoteContext=createContext();

 const initialState={
    notes:JSON.parse(localStorage.getItem('notes'))||[],
 }
const reducer=(state,action)=>{
    switch(action.type){
        case "ADD":
            return{...state, notes:[...state.notes,action.payload]};
    case "DELETE":
        return{ 
         ...state, notes: state.notes.filter(note=>note.id!==action.payload)
        };
    case "EDIT":
        return {
         ...state,  notes:state.notes.map((note)=>note.id===action.payload.id?action.payload:note)
        };
     default :
     return state;
    }

}

export const NoteProvider=({children})=>{
     const[state,dispatch]=useReducer(reducer,initialState);

     useEffect(()=>{
      localStorage.setItem('notes',JSON.stringify(state.notes))
     },[state.notes]); 

    return(
        <NoteContext.Provider value={{state,dispatch}}>
            {children}
        </NoteContext.Provider>
    )

}