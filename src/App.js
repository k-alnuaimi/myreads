import { useEffect, useState } from 'react';
import './App.css';
import { getAll, update } from './BooksAPI';
import Book from './components/Book';
import BookShelf from './components/BookShelf';



function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books,setBooks] = useState()

  useEffect(()=>{

    const getAllBooks = async()=>{

      const booksResult = await getAll()
      setBooks(booksResult)

    }

    getAllBooks()
  },[])

  const handleShelfChange = async(bookId,desiredShelf)=>{
    setBooks(books.map(book=>
      book.id == bookId ? {...book,shelf: desiredShelf}:book
    )
    )
    await update(books.find(book=>book.id == bookId),desiredShelf)

    

  }



  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
              libraryShelfChangeHandler={handleShelfChange}
              shelfProperName="Currently Reading" 
              shelfName="currentlyReading" 
              shelfBooks={books &&books.filter((book)=> book.shelf == "currentlyReading")}/>
              <BookShelf 
              libraryShelfChangeHandler={handleShelfChange}
              shelfProperName="Want To Read" 
              shelfName="wantToRead" 
              shelfBooks={books &&books.filter((book)=> book.shelf == "wantToRead")}/>
              <BookShelf 
             libraryShelfChangeHandler={handleShelfChange}
              shelfProperName="Read" 
              shelfName="read" 
              shelfBooks={books &&books.filter((book)=> book.shelf == "read")}/>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
