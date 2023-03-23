import { onAuthStateChanged } from "firebase/auth";
import { useLayoutEffect, useState } from "react";

const useAuthState = ({ auth }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
  }, [auth]);
  return [user, loading];
};

// export default useAuthState;
