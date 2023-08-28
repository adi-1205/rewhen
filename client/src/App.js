import './App.css'
import { BrowserRouter, Routes, Route ,Outlet} from "react-router-dom";
import ImagePage from './components/ImagePage'
import UploadPage from './components/UploadPage'
import Navbar from './components/Navbar'

function App() {
  return (

    <BrowserRouter>

      <div className='wrapper'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<ImagePage />} />
          <Route path="/action" element={<UploadPage />} />
        </Routes>
        <Outlet />
      </div>
    </BrowserRouter>
  );
}

export default App;
