import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = ({ signInWithGoogle, gUser, gError }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (gUser) {
      navigate(from, { replace: true });
    }
  }, [gUser, navigate, from]);

  let errorElement;
  if (gError) {
    errorElement = <p className="text-red-500">{gError?.message}</p>;
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
