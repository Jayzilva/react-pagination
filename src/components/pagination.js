import React from 'react'

const Pagination = ({postPerPage, totzlPosts, paginate}) => {

    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(totzlPosts/ postPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <div>
        {pageNumbers.map(number =>(
            <li key={number}>
                <a onClick= {()=> paginate(number)} href='!#'>{number}</a>
            </li>
            
        ))}
    </div>
  )
}

export default Pagination