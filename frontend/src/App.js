import './App.css';
import Header  from './components/layout/Header/Header';
import Footer  from './components/layout/Footer/Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useEffect } from "react"
import Webfont from "webfontloader"
import Home from "./components/Home/Home"
import ProductDetails from './components/Product/ProductDetails';
function App() {

  useEffect(()=>{
    Webfont.load({
      google:{
        families:["Roboto",'Droid Sans','Chilanka']
      }
    })
  },[])
  return(
    <Router>
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;
