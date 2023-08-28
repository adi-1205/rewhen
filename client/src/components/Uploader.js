import { React, useContext } from 'react'
import FilesContext from '../filesContext'
import axios from 'axios'
function Uploader() {

    const { files, setFiles,fd } = useContext(FilesContext)
    function handleChange(e) {
        setFiles([...e.target.files])
    }

    return (
        <div className='uploader'>
            <input type='file' name='file' className='choose' onChange={handleChange} multiple accept="image/png, image/gif, image/jpeg" />
            <ul className='files_list'>
                {
                    files.map(file => {
                        return (
                            <li>{file.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Uploader