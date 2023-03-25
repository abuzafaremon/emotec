import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import SinglePost from "../../components/SinglePost/SinglePost";
import usePosts from "../../hooks/usePosts";
const Blogs = () => {
  const [posts] = usePosts();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-5 md:p-10">
      <p className="text-3xl text-slate-700 font-bold text-center pb-5 uppercase">
        {" "}
        All Blogs
      </p>
      <div className="w-full max-w-lg mx-auto grid gap-5">
        {posts.map((post) => (
          <SinglePost post={post} key={post.id} setLoading={setLoading} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
