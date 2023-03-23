import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AddPost from "./pages/AddPost/AddPost";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";
import RequireAuth from "./pages/Authentication/RequireAuth/RequireAuth";
import Blogs from "./pages/Blogs/Blogs";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/addPost"
          element={
            <RequireAuth>
              <AddPost />
            </RequireAuth>
          }
        />
        <Route
          path="/blogs"
          element={
            <RequireAuth>
              <Blogs />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
