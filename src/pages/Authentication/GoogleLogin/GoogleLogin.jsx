import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import auth from "../../../firebase.init";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  if (user) {
    navigate(from, { replace: true });
  }

  let errorElement;
  if (error) {
    errorElement = <p className="text-red-500">{error?.message}</p>;
  }

  return (
    <div>
      <div className="divider">OR</div>
      <span className="text-sm">{errorElement}</span>
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        className="btn btn-outline gap-2 w-full"
      >
        <span>Continue With</span>
        <span className="flex items-center">
          <span className="text-2xl mb-1">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>le
        </span>
      </button>
    </div>
  );
};

export default GoogleLogin;
