import { useState } from "react";
const Book = ({
    book,
    shelfChangeHandler
})=>{


   


    return (<div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: 'imageLinks' in book ?`url("${book.imageLinks.thumbnail}")`: null,
            }}
          ></div>
           <div className="book-shelf-changer"> 
             <select defaultValue={book.shelf} onChange={(e)=>shelfChangeHandler(book,e.target.value)}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading" >
                Currently Reading
              </option>
              <option value="wantToRead" >Want to Read</option>
              <option value="read" >Read</option>
            {book.shelf !='none' &&<option value="none" >None</option>}  
            </select> 
          </div> 
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ?book.authors.toString(): ""}</div>
      </div>)
}

export default Book