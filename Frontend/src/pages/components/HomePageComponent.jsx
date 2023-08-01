// import React, { useEffect, useState } from 'react'
// import ProductCorouselComponent from '../../components/ProductCorouselComponent'
// import CategoryCardComponent from '../../components/CategoryCardComponent'

// const HomePageComponent = ({ categories }) => {
//   // const categories = [
//   //   "SHOES", "WATCHES", "TABLETS", "MONITORS", "PRINTERS", "SOFTWARE", "CAMERAS", "BOO,KS"
//   // ]

//   const [mainCategories, setMainCategories] = useState([])
//   useEffect(() => {
//     setMainCategories(categories.filter(item => !item.name.includes("/")))
//   }, [categories])

//   return (
//     <>
//       <ProductCorouselComponent />
//       <div className="d-flex flex-wrap justify-content-around">
//         {
//           categories.map((item, idx) => (
//             <CategoryCardComponent key={idx} category={item} idx={idx} />
//           ))
//         }
//       </div>
//     </>
//   )
// }

// export default HomePageComponent
import React, { useEffect, useState } from 'react';
import ProductCorouselComponent from '../../components/ProductCorouselComponent';
import CategoryCardComponent from '../../components/CategoryCardComponent';

const HomePageComponent = ({ categories }) => {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories(categories.filter(item => !item.name.includes("/")));
  }, [categories]);

  return (
    <>
      <ProductCorouselComponent />
      <div className="d-flex flex-wrap justify-content-around">
        {mainCategories.map((item, idx) => ( // Changed 'categories' to 'mainCategories'
          <CategoryCardComponent key={idx} category={item} idx={idx} />
        ))}
      </div>
    </>
  );
};

export default HomePageComponent;
