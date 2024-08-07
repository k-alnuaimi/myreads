import { useEffect, useState } from 'react';
import './App.css';
import { getAll, search, update } from './BooksAPI';
import Book from './components/Book';
import BookShelf from './components/BookShelf';



function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books,setBooks] = useState()
  const [searchBooks,setSearchBooks] = useState(null)
  const [query,setQuery] = useState('')

  useEffect(()=>{

    const getAllBooks = async()=>{

      const booksResult = await getAll()
      setBooks(booksResult)

    }

    getAllBooks()
  },[])

  useEffect(()=>{

    const SearchBooks = async ()=>{

      
        const searchBooksResult = await search(query,20)
        if(searchBooksResult !=null && !('error' in searchBooksResult))
        setSearchBooks(searchBooksResult)
    }

    if(query!=""){
      SearchBooks()
    }else if (query ==""){
      setSearchBooks(null)
    }

  },[query])

  const handleShelfChangeExisting = async(bookToModify,desiredShelf)=>{
    setBooks(books.map(book=>
      book.id == bookToModify.id ? {...book,shelf: desiredShelf}:book
    )
    )
    await update(books.find(book=>book.id == bookToModify.id),desiredShelf)
  }
  const handleShelfChangeNew = async(bookToModify,desiredShelf)=>{
    bookToModify.shelf = desiredShelf
    setBooks(books=>[...books,bookToModify])
    await update(bookToModify,desiredShelf)
  }

  const getSearchBooks = ()=>{
    if (searchBooks!=null ){
      return(
        searchBooks.map((book)=>
        {
          const shelf = books.find(b=>b.id == book.id)?books.find(b=>b.id == book.id).shelf : 'none'
          book.shelf = shelf
          return (<Book
            key={book.id}
            book={book}
            shelfChangeHandler={handleShelfChangeNew}
            />)
        }
        )
      )

    }

  }

  console.log(books)

  

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
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
               getSearchBooks()
              }
            </ol>
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
              libraryShelfChangeHandler={handleShelfChangeExisting}
              shelfProperName="Currently Reading" 
              shelfBooks={books &&books.filter((book)=> book.shelf === "currentlyReading")}/>
              <BookShelf 
              libraryShelfChangeHandler={handleShelfChangeExisting}
              shelfProperName="Want To Read" 
              shelfBooks={books &&books.filter((book)=> book.shelf === "wantToRead")}/>
              <BookShelf 
             libraryShelfChangeHandler={handleShelfChangeExisting}
              shelfProperName="Read" 
              shelfBooks={books &&books.filter((book)=> book.shelf === "read")}/>
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
