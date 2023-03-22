import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import SmLoading from "../../../components/Loading/SmLoading";
import auth from "../../../firebase.init";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState({});
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  if (user) {
    navigate(from, { replace: true });
  }

  const forgotPassword = () => {
    swal("Enter your email address: ", {
      content: {
        element: "input",
        attributes: {
          placeholder: "Your email",
          type: "email",
          required: "required",
        },
      },
    }).then((value) => {
      let pattern = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (value && value.match(pattern)) {
        sendPasswordResetEmail(auth, value);
        swal("Good job!", "Password reset email sent", "success");
      } else {
        swal("", `${value} is not valid email`, "warning");
      }
    });
  };

  let errorElement;
  if (error) {
    errorElement = <p className="text-red-500">{error?.code}</p>;
  }
  return (
    <section className="min-h-[100vh-64px] flex justify-center py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs border p-3 rounded-2xl shadow-xl"
      >
        <h2 className="text-center font-bold text-3xl py-2 text-slate-700">
          Login
        </h2>
        <div className="grid gap-2">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              autoComplete="onn"
              disabled={loading}
              className="input input-bordered w-full max-w-xs"
            />
            <p className="text-red-500 text-xs md:text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              disabled={loading}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              onClick={forgotPassword}
              type="button"
              className="link link-hover link-warning text-sm"
            >
              Forgot Password
            </button>
            <p className="text-red-500 text-xs md:text-sm">
              {errors.password?.message}
            </p>
          </div>
          <span>{errorElement}</span>
          <div>
            {loading ? (
              <button className="btn w-full max-w-xs">
                <SmLoading />
              </button>
            ) : (
              <input
                type="submit"
                value="Login"
                className="btn w-full max-w-xs"
              />
            )}
            <p>
              <span>New to Lets Make?</span>
              <Link to="/register" className="link link-success">
                Register First
              </Link>
            </p>
          </div>
        </div>
        <GoogleLogin />
      </form>
    </section>
  );
};

export default Login;
