import { Link } from "react-router-dom"
import { update } from "../BooksAPI"
import BookShelf from "../components/BookShelf"


const Home = ({books,setBooks})=>{

    console.log(books)

    const handleShelfChangeExisting = async(bookToModify,desiredShelf)=>{
        setBooks(books.map(book=>
          book.id == bookToModify.id ? {...book,shelf: desiredShelf}:book
        )
        )
        await update(books.find(book=>book.id == bookToModify.id),desiredShelf)
      }

    return (
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
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
    )


}

export default Home;