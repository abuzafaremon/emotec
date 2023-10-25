import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";
import dummyUser from "../../assets/images/dummyUser.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        swal("Sign-out successful.", "", "success");
        // navigate("/login");
      })
      .catch((error) => {
        swal("An Error Occurred.", `${error?.messages}`, "error");
      })
      .finally(() => {
        setUser(null);
        navigate("/addProduct");
      });
  };
  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/products">All Products</Link>
            </li>
            <li>
              <Link to="/products/ups">Ups</Link>
            </li>
            <li>
              <Link to="/products/smartwatch">Smartwatch</Link>
            </li>
            <li>
              <Link to="/products/earbuds">Earbuds</Link>
            </li>
            <li>
              <Link to="/products/neckband">Neckband</Link>
            </li>
            <li>
              <Link to="/products/powerbank">Powerbank</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          One Click
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/products">All Products</Link>
          </li>
          <li>
            <Link to="/products/ups">Ups</Link>
          </li>
          <li>
            <Link to="/products/smartwatch">Smartwatch</Link>
          </li>
          <li>
            <Link to="/products/earbuds">Earbuds</Link>
          </li>
          <li>
            <Link to="/products/neckband">Neckband</Link>
          </li>
          <li>
            <Link to="/products/powerbank">Powerbank</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <button tabIndex={1} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-52"
          >
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search here..."
              className="input input-ghost"
            />
          </div>
        </div>

        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar online ring-2 ring-slate-700"
            >
              <div className="w-10 rounded-full">
                {user?.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName?.split(" ")[0]}
                  />
                ) : (
                  <img src={dummyUser} alt={user?.displayName?.split(" ")[0]} />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/myProfile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              {user && user?.email === "ek985307@gmail.com" && (
                <li>
                  <Link to="/addProduct">Add Product</Link>
                </li>
              )}
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
