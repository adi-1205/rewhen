import {React, useContext} from 'react'
import FilesContext from '../filesContext'
function Preview() {

    const { files, setFiles } = useContext(FilesContext)

    return (
        <div className='preview'>
            {
                files.map(file=>{
                    return(
                        <img src={URL.createObjectURL(file)} className='files_image'/>
                    )
                })
            }
        </div>
    )
}

export default Preview