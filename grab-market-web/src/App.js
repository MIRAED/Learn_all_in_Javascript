
import './App.css';
import MainPage from "./main/index.js";
import {Routes, Route} from 'react-router-dom';
import UploadPage from "./upload";
import ProductPage from "./product";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}>
      
        </Route>
        <Route path="/product/:id" element={<ProductPage></ProductPage>}>
      
        </Route>
        
        <Route path="/upload" element={<UploadPage></UploadPage>}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
