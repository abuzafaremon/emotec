import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import SinglePost from "../../components/SinglePost/SinglePost";
import usePosts from "../../hooks/usePosts";
const Earbuds = () => {
  const [posts] = usePosts();
  const earbuds = posts.filter((p) => p.category.includes("earbuds"));
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="p-5 md:p-10">
        <p className="text-3xl text-slate-700 font-bold text-center pb-5">
          All Earbuds
        </p>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5">
          {posts.length === 0 && <Loading />}
          {earbuds.map((post) => (
            <SinglePost post={post} key={post.id} setLoading={setLoading} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Earbuds;
