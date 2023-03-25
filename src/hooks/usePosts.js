import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.init";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const correctionRef = collection(db, "posts");
    const q = query(correctionRef, orderBy("time", "desc"));

    const result = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          time: doc.data().time,
        }))
      );
    });
    return result;
  }, []);
  return [posts, setPosts];
};
export default usePosts;
