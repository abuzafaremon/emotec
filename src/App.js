import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AddProduct from "./pages/AddProduct/AddProduct";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";
import RequireAuth from "./pages/Authentication/RequireAuth/RequireAuth";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import OrderNow from "./pages/OrderNow/OrderNow";
import Smartwatch from "./pages/Smartwatch/Smartwatch";
import Earbuds from "./pages/Earbuds/Earbuds";
import Neckband from "./pages/Neckband/Neckbands";
import Ups from "./pages/Ups/Ups";
import PowerBank from "./pages/PowerBank/PowerBank";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/myProfile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/addProduct"
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/products/smartwatch" element={<Smartwatch />} />
        <Route path="/products/earbuds" element={<Earbuds />} />
        <Route path="/products/neckband" element={<Neckband />} />
        <Route path="/products/ups" element={<Ups />} />
        <Route path="/products/powerbank" element={<PowerBank />} />
        <Route path="/products/order/:productId" element={<OrderNow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
