import React, { useState, useContext } from 'react'
import FilesContext from '../filesContext'
import axios from 'axios'

function ApplyFilter() {

    const { files, setFiles, fd } = useContext(FilesContext)
    const [formVal, setFormVal] = useState({})
    const [progress, setProgress] = useState(0)
    const [pHid, setPHid] = useState('hidden')
    const [uHid, setUHid] = useState('hidden')
    const [vHid, setVHid] = useState('hidden')

    function handleChange(e) {
        setVHid('hidden')
        var name = e.target.name
        var val = e.target.value

        setFormVal({
            ...formVal,
            [name]: val
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        files.forEach(file => {
            fd.append('file', file)
        })

        for (const [key, value] of Object.entries(formVal)) {
            fd.append(key, value)
        }

        if (formVal['tags'] && files.length) {
            setPHid('show')
            axios.post('http://localhost:8000/up', fd, {
                onUploadProgress: (progressEvent) => {
                    setProgress((progressEvent.loaded / progressEvent.total) * 100)
                    console.log((progressEvent.loaded / progressEvent.total) * 100);
                    console.log(pHid + '_2_' + uHid);
                }
            })
                .then((dt) => {
                    console.log('wooooooooooooooooooooooooooooooooooo');
                    setProgress(0)
                    setPHid('hidden')
                    setUHid('')
                    setTimeout(() => {
                        setUHid('hidden')
                    }, 5000)
                    console.log(dt.data);
                })
                .catch(er => console.log(er))
            console.log(pHid + '_3_' + uHid);
        }
        else{
            setVHid('')
        }
    }


    return (
        <div className='apply_filter'>
            <div className={'valid ' +vHid}>
                Please Enter Tags and Files!!
            </div>
            <div className='filter_box'>
                <div className='filter_name'>Tags (, septared)</div>
                <input type='text' className='filter_field' name='tags' onChange={handleChange} />
            </div>
            <div className='filter_box'>
                <div className='filter_name'>People (, septared)</div>
                <input type='text' className='filter_field' name='people' onChange={handleChange} />
            </div>
            <div className='filter_box'>
                <div className='filter_name'>Location</div>
                <input type='text' className='filter_field' name='locations' onChange={handleChange} />
            </div>
            <div className='filter_box'>
                <div className='filter_name'>Description</div>
                <input type='text' className='filter_field' name='desc' onChange={handleChange} />
            </div>
            <div className='filter_box'>
                <div className='filter_name'>Date (Optional)</div>
                <input type='Date' className='filter_field' name='date' onChange={handleChange} />
            </div>
            <div className='filter_box'>
                <button type='button' className='files_submit' onClick={handleSubmit}>Apply</button>
            </div>
            <div className='filter_box up_stat'>
                <div className={'progress_bar ' + pHid}>
                    <div className='progress' style={{ width: progress + '%' }}></div>
                </div>
                <div className={'file_uploaded ' + uHid}>
                    <div className='file_up_icon'>
                        <span class="material-symbols-outlined">
                            file_download_done
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyFilter