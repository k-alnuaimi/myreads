import { useState } from "react";
const Book = ({
    backgroundImage,
    shelf,
    title,
    authors,
    id,
    shelfChangeHandler
})=>{


   


    return (<div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url("${backgroundImage}")`,
            }}
          ></div>
           <div className="book-shelf-changer"> 
             <select defaultValue={shelf} onChange={(e)=>shelfChangeHandler(id,e.target.value)}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading" >
                Currently Reading
              </option>
              <option value="wantToRead" >Want to Read</option>
              <option value="read" >Read</option>
              <option value="none" >None</option>
            </select> 
          </div> 
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.toString()}</div>
      </div>)
}

export default Book