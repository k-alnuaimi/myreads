import Book from "./Book"

const BookShelf = ({shelfBooks,shelfProperName,libraryShelfChangeHandler})=>{

   

   
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfProperName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {shelfBooks &&shelfBooks.map((book)=>{
                return <li key={book.id}>
                    <Book
                    shelfChangeHandler={libraryShelfChangeHandler}
                    book={book}
                    shel
                    
                    />
                </li>
            })}
          
          </ol>
        </div>
      </div>
    )
}

export default BookShelf