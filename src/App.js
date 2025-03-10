import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcomee';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PlantShop from './components/PlantShop';
import Identify from './components/Identify';
import ProductList from './components/ProductList';
import Wishlist from './components/Wishlist';
import MyOrders from './components/MyOrders';
import Test from './components/Test';
import FloraSnap from './components/FloraSnap';
import PlantIdentification from './components/PlantIdentification';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';



function App() {
  return (
    <BrowserRouter>

    <Routes>
      
      <Route path="/" element={<Welcome/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin'element={<SignIn/>}/>
      <Route path='/plantshop'element={<PlantShop/>}/>
      <Route path='/identify'element={<Identify/>}/>
      <Route path='/productlist'element={<ProductList/>}/>
      <Route path='/wishlist'element={<Wishlist/>}/>
      <Route path='/myorders'element={<MyOrders/>}/>
      <Route path='/test'element={<Test/>}/>
      <Route path='/florasnap'element={<FloraSnap/>}/>
      <Route path='/plantidentification'element={<PlantIdentification/>}/>
      <Route path='/adminlogin'element={<AdminLogin/>}/>
      <Route path='/admindash'element={<AdminDashboard/>}/>
      </Routes></BrowserRouter>
    
  );
}

export default App;
