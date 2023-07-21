import React from 'react'
import ProductCorouselComponent from '../components/ProductCorouselComponent'
import CategoryCardComponent from '../components/CategoryCardComponent'

const HomePage = () => {
  const categories = [
    "SHOES","WATCHES", "TABLETS", "MONITORS", "PRINTERS", "SOFTWARE", "CAMERAS", "BOO,KS"
  ]
  return (
    <>
      <ProductCorouselComponent />
      <div className="d-flex flex-wrap justify-content-around">
      {
        categories.map((item, idx) => (
          <CategoryCardComponent key={idx} category={item} idx={idx}/>
        ))
      }
      </div>
    </>
  )
}

export default HomePage
