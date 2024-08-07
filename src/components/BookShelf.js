import Book from "./Book"

const BookShelf = ({shelfName,shelfBooks,shelfProperName,libraryShelfChangeHandler})=>{

   

   
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfProperName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {shelfBooks &&shelfBooks.map((book)=>{
                return <li key={book.id}>
                    <Book
                    shelfChangeHandler={libraryShelfChangeHandler}
                    title={book.title}
                    authors={book.authors}
                    shelf={shelfName}
                    backgroundImage={book.imageLinks.thumbnail}
                    id={book.id}
                    
                    />
                </li>
            })}
          
          </ol>
        </div>
      </div>
    )
}

export default BookShelf