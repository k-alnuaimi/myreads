import { useEffect, useState } from "react"
import Book from "../components/Book"
import { search, update } from "../BooksAPI"
import { Link } from "react-router-dom"


const SearchPage = ({books,setBooks})=>{
    const [query,setQuery] = useState('')
    const [searchBooks,setSearchBooks] = useState(null)


    useEffect(()=>{

        const SearchBooks = async ()=>{
    
          
            const searchBooksResult = await search(query,20)
            if(searchBooksResult !=null && !('error' in searchBooksResult))
            setSearchBooks(searchBooksResult)
        }
    
        if(query === "")
          setSearchBooks(null)
        else
        SearchBooks()
    
      },[query])
    const getSearchBooks = ()=>{
        if (searchBooks!=null ){
            console.log(searchBooks)
          return(
            searchBooks.map((book)=>
            {
              const shelf = books.find(b=>b.id === book.id)?books.find(b=>b.id === book.id).shelf : 'none'
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

      const handleShelfChangeNew = async(bookToModify,desiredShelf)=>{
        if(books.find(b=>b.id == bookToModify.id) ==null){
            bookToModify.shelf = desiredShelf
            setBooks(books=>[...books,bookToModify])
            await update(bookToModify,desiredShelf)
        }else{
            setBooks(books.map(book=>
                book.id === bookToModify.id ? {...book,shelf: desiredShelf}:book
              )
              )
              await update(bookToModify,desiredShelf)
        }
     
      }

    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to='/'
            >
              Close
            </Link>
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
    )
}

export default SearchPage