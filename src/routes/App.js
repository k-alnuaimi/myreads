import { useEffect, useState } from 'react';
import '../App.css';
import { getAll} from '../BooksAPI';
import SearchPage from './SearchPage';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';



function App() {
  const [books,setBooks] = useState()

  useEffect(()=>{

    const getAllBooks = async()=>{

      const booksResult = await getAll()
      setBooks(booksResult)

    }

    getAllBooks()
  },[])


  return (
    <div className="app">
      <Routes >
        <Route path='/search' element={<SearchPage books={books} setBooks={setBooks}/>}/>
        <Route path='/' element={<Home books={books} setBooks={setBooks}/>}/>
      </Routes>
      
 
      

        
      
    </div>
  );
}

export default App;
