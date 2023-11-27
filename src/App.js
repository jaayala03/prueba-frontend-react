import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./views/Home";
import Navbar from 'components/navbar/NavBar';
import Footer from 'components/footer/Footer';
import ProductDetail from './views/ProductDetail';
import Error404 from './views/Error404';

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
              <section className='content-app'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/product/detail/:id" element={<ProductDetail/>} />
                    <Route path="*" element={<Error404/>} />
                </Routes>
              </section>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
