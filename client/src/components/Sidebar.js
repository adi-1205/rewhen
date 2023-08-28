import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ImageContext } from './ImagePage'
function Sidebar() {


  const [data, setData] = useState({search:'',filter:''})
  const { setImages } = useContext(ImageContext)

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value

    setData({
      ...data,
      [name]: value
    })
  }

  useEffect(() => {
    axios.post('http://localhost:8000/images', { search: '', filter: '' }, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        setImages(res.data)
        console.log(res.data);
      })

  }, [])


  function handleClick(e) {
    e.preventDefault()

    const fd = new FormData();

      fd.append('search', data.search.toLowerCase())
      fd.append('filter', data.filter.toLowerCase())

    axios.post('http://localhost:8000/images', fd, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        setImages(res.data)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div className='sidebar'>
      <h1 className='sidebar_item'>Filter</h1>
      <div className='search_item'>
        <span className="material-symbols-outlined">
          search
        </span>
        <input type='text' placeholder='Search image' className='sidebar_item search' name='search' onChange={handleChange} />
      </div>
      <select className='sidebar_item filter' name='filter' onChange={handleChange}>
        <option value='tags'>Tags</option>
        <option value='people'>People</option>
        <option value='locations'>Locations</option>
        <option value='desc'>Description</option>
        <option value='date'>Date</option>
      </select>
      <button className='sidebar_item apply' onClick={handleClick}>
        Search
      </button>
    </div>
  )
}

export default Sidebar