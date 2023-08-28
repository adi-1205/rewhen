import React, { useState, useContext } from 'react'
import { ImageContext } from './ImagePage'
import { LazyLoadImage } from "react-lazy-load-image-component";


function Display() {

  const { images, setImages } = useContext(ImageContext)
  const { dlt, setDlt } = useContext(ImageContext)

  function handleCheckboxChange(e, img) {
    console.log(e.target.checked);

    if (e.target.checked) {
      setDlt(prevDlt => {
        return [...prevDlt, img]
      })
    } else {
      setDlt(prevDlt => {
        return prevDlt.filter((i) => {
          return (i !== img)
        })
      })
    }


    console.log(dlt);
  }
  return (
    // <div className='display'>
    //   {
    //     images.map((image) => {
    //       return (
    //         <div className='image_card'>
    //           <a href={'http://localhost:8000/'+image}>
    //             <LazyLoadImage src={'http://localhost:8000/'+image} />
    //           </a>
    //             <div className='image_data'>
    //               This is your data
    //             </div>
    //         </div>
    //       )
    //     })
    //   }
    // </div>


    <div className='display'>
      <section id='casestudies' className='casestudies'>

        {
          images.map(image => {
            return (
              <article className='content'>
                <a href={'http://localhost:8000/' + image.name.split(',')[0]}>
                  <div className='content-overlay'></div>
                  <img className='content-image' src={'http://localhost:8000/' + image.name.split(',')[0]} alt='' />
                  <div className='content-details fadeIn-bottom'>
                    <h2 className='content-title'><span style={{ fontWeight: 500 }}>Tags:</span> {image.tags}</h2>
                    <p className='content-text'>{image.name.split(',')[1]}</p>
                    <label className="cont">
                      Delete
                      <input type="checkbox" onChange={(e) => {
                        handleCheckboxChange(e, image.name.split(',')[0])
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