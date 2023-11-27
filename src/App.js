import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./views/Home";
import Navbar from 'components/navbar/NavBar';
import Footer from 'components/footer/Footer';
import ProductDetail from './views/ProductDetail';
import ListProducts from 'components/home/ListProducts';
import CreateProducts from 'components/home/CreateProducts';
import DetailProducts from 'components/home/DetailProducts';
import Error404 from './views/Error404';
import { ProductsProvider } from "./context/ProductsContext";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <Router>
            <Navbar/>
              <section className='content-app'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/product/add" element={<CreateProducts/>}/>
                    <Route path="/product/shopping" element={<DetailProducts/>}/>
                    <Route path="/shopping-cart" element={<ListProducts/>}/>
                    <Route path="/product/detail/:id" element={<ProductDetail/>} />
                    <Route path="*" element={<Error404/>} />
                </Routes>
              </section>
            <Footer/>
        </Router>
      </ProductsProvider>
    </div>
  );
}

export default App;
