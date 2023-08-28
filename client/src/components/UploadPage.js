import { React, useState } from 'react'
import Uploader from './Uploader'
import Preview from './Preview'
import ApplyFilter from './ApplyFilter'
import FilesContext from '../filesContext'

function UploadPage() {

  const [files, setFiles] = useState([])
  const fd = new FormData()
  return (
    <div className='upload'>
      <FilesContext.Provider value={{ files, setFiles ,fd}}>
        <Uploader />
        <Preview />
        <ApplyFilter />
      </FilesContext.Provider>
    </div>
  )
}

export default UploadPage