import { sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../../components/Loading/Loading";
import auth from "../../../firebase.init";

const RequireAuth = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  // useLayoutEffect(() => {
  //   setLoading(true);
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     }
  //     setLoading(false);
  //   });
  // }, [auth]);

  if (loading || sending) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  const handleEmailVerification = async () => {
    setSending(true);
    await sendEmailVerification(auth.currentUser);
    swal(
      "Your Verification Email Sent",
      "Check Your Email Inbox or Spam Folder",
      "success"
    );
    setSending(false);
  };

  if (!user?.emailVerified) {
    return (
      <section className="flex justify-center">
        <div className="w-fit shadow-xl p-3 rounded-xl text-center grid gap-2 text-lg">
          <h2>Your Email is not verified!</h2>
          <p>Please verify your email address.</p>
          <div>
            <button onClick={handleEmailVerification} className="btn">
              Send Verification Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return children;
};

export default RequireAuth;
