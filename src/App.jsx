
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NoteList from './components/NoteList';

function App() {


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className='text-3xl font-bold text-center mb-6 text-blue-600'>Notes app</h1>
       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <NoteList />
      </div>
    </div>
  );
}


export default App
