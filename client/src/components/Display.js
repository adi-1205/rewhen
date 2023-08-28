import React, { useState, useContext } from 'react'
import { ImageContext } from './ImagePage'
import { LazyLoadImage } from "react-lazy-load-image-component";


function Display() {

  const { images, setImages } = useContext(ImageContext)
  var { dlt, setDlt } = useContext(ImageContext)
  var arr = []

  function handleCheckboxChange(e, img) {
    if (e.target.checked) {
      dlt = [...dlt, {...img}]
      setDlt(dlt)
    } else {
      dlt = dlt.filter(i => i.name != img)
      setDlt(dlt)
    }
  }
  return (


    <div className='display'>
      <section id='casestudies' className='casestudies'>

        {
          images.map(image => {
            return (
              <article className='content'>
                <a href={'http://localhost:8000/' + image.name.split(',')[0]}>
                  <div className='content-overlay'></div>
                  <LazyLoadImage className='content-image' src={'http://localhost:8000/' + image.name.split(',')[0]} alt='' />
                  <div className='content-details fadeIn-bottom'>
                    <h2 className='content-title'><span style={{ fontWeight: 500 }}>Tags:</span> {image.tags}</h2>
                    <p className='content-text'>{image.name.split(',')[1]}</p>
                    <label className="cont">
                      Delete
                      <input type="checkbox" onChange={(e) => {
                        handleCheckboxChange(e, image)
                      }} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </a>
              </article>
            )
          })
        }

      </section >
    </div>
  )
}

export default Display