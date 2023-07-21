import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PaginationComponent = () => {
  const [page, setPage] = useState(1)
  const totalresults = 15
  const pageSize = 5

  const handlePreviousClick = async () => {
    console.log("previous")
    setPage(page - 1)
  }
  
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalresults / pageSize);
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
          <a onClick={() => setPage(i)} style={{ cursor: 'pointer' }} className="page-link">
            {i}
          </a>
        </li>
      );
    }
  
    return pageNumbers;
  };
  
  const handleNextClick = async () => {
    console.log("next")
    if (page + 1 <= (Math.ceil(totalresults / pageSize))) {
      setLoading(true)
      setPage(page + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    } else {
      // Do nothing if next page exceeds total number of pages
    }
    setLoading(false)
  }


  return (
    <div>

      <nav aria-label="Page navigation example m-auto" style={{ 'width': '19rem', 'margin': 'auto', 'height': '6rem' }}>
        <ul className="pagination">
          <li className="page-item"><button disabled={page <= 1} className="btn btn-primary" onClick={handlePreviousClick}>Previous</button></li>
          {renderPageNumbers()}
          <li className="page-item"><button disabled={!(page + 1 <= (Math.ceil(totalresults / pageSize)))} className="btn btn-primary" onClick={handleNextClick}>Next</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default PaginationComponent
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const PaginationComponent = () => {
//   const [page, setPage] = useState(1);
//   const totalResults = 15;
//   const pageSize = 5;

//   const handlePreviousClick = () => {
//     console.log("previous");
//     setPage((prevPage) => prevPage - 1);
//   };

//   const handleNextClick = () => {
//     console.log("next");
//     if (page + 1 <= Math.ceil(totalResults / pageSize)) {
//       setPage((prevPage) => prevPage + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
//     }
//   };

//   const renderPageNumbers = () => {
//     const totalPages = Math.ceil(totalResults / pageSize);
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
//           <a onClick={() => setPage(i)} style={{ cursor: 'pointer' }} className="page-link">
//             {i}
//           </a>
//         </li>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div>
//       <nav aria-label="Page navigation example m-auto" style={{ width: '19rem', margin: 'auto', height: '6rem', backgroundColor: 'black' }}>
//         <ul className="pagination">
//           <li className="page-item">
//             <button disabled={page <= 1} className="btn btn-primary" onClick={handlePreviousClick}>
//               Previous
//             </button>
//           </li>
//           {renderPageNumbers()}
//           <li className="page-item">
//             <button
//               disabled={!(page + 1 <= Math.ceil(totalResults / pageSize))}
//               className="btn btn-primary"
//               onClick={handleNextClick}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PaginationComponent;
