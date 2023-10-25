import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import SinglePost from "../../../components/SinglePost/SinglePost";
import usePosts from "../../../hooks/usePosts";

const LatestBlog = () => {
  const [posts] = usePosts();
  const smartwatch = posts.filter((post) =>
    post.category.includes("smartwatch")
  );
  const tws = posts.filter((post) => post.category.includes("earbuds"));
  const neckbands = posts.filter((post) => post.category.includes("neckband"));
  const ups = posts.filter((post) => post.category.includes("ups"));
  return (
    <section>
      <div className="text-center py-5 px-3 sm:px-5 shadow-lg">
        <h2 className="text-3xl font-bold">Latest Products</h2>
        {posts.length === 0 && <Loading />}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 text-left">
          {posts.slice(0, 3).map((post) => (
            <SinglePost post={post} key={post.id} />
          ))}
        </div>
        <Link to="/products" className="btn btn-sm">
          All Products
        </Link>
      </div>
      {smartwatch.length > 0 && (
        <div className="text-center py-5 px-3 sm:px-5 shadow-lg">
          <h2 className="text-3xl font-bold">Latest Smartwatch</h2>
          {posts.length === 0 && <Loading />}
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 text-left">
            {smartwatch.map((post) => (
              <SinglePost post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
      {tws.length > 0 && (
        <div className="text-center py-5 px-3 sm:px-5 shadow-lg">
          <h2 className="text-3xl font-bold">Latest Earbuds/Tws</h2>
          {posts.length === 0 && <Loading />}
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 text-left">
            {tws.map((post) => (
              <SinglePost post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
      {neckbands.length > 0 && (
        <div className="text-center py-5 px-3 sm:px-5 shadow-lg">
          <h2 className="text-3xl font-bold">Latest Neckband</h2>
          {posts.length === 0 && <Loading />}
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 text-left">
            {neckbands.map((post) => (
              <SinglePost post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
      {ups.length > 0 && (
        <div className="text-center py-5 px-3 sm:px-5 shadow-lg">
          <h2 className="text-3xl font-bold">Mini UPS</h2>
          {posts.length === 0 && <Loading />}
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 text-left">
            {ups.map((post) => (
              <SinglePost post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestBlog;
