import React, { createContext, useState } from 'react'
import Display from './Display'
import Sidebar from './Sidebar'

const ImageContext = createContext(null)

function ImagePage() {

  const [images, setImages] = useState([])
  const [dlt, setDlt] = useState([])
  return (
    <div className='container'>
      <ImageContext.Provider value={{ images, setImages , dlt, setDlt}}>
        <Sidebar />
        <Display />
      </ImageContext.Provider >
    </div>
  )
}

export default ImagePage
export {ImageContext}