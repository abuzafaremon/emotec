import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import SinglePost from "../../../components/SinglePost/SinglePost";
import usePosts from "../../../hooks/usePosts";

const LatestBlog = () => {
  const [posts] = usePosts();
  return (
    <section className="py-5 px-3 sm:px-5 shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        {posts.length === 0 && <Loading />}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 text-left">
          {posts.slice(0, 3).map((post) => (
            <SinglePost post={post} key={post.id} />
          ))}
        </div>
        <Link to="/products" className="btn btn-sm">
          All Products
        </Link>
      </div>
    </section>
  );
};

export default LatestBlog;
