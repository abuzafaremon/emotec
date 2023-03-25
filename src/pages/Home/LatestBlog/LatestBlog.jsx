import React from "react";
import SinglePost from "../../../components/SinglePost/SinglePost";
import usePosts from "../../../hooks/usePosts";

const LatestBlog = () => {
  const [posts] = usePosts();
  return (
    <section className="py-5 px-3 sm:px-5">
      <div>
        <h2 className="text-3xl font-bold text-center">Latest Blog</h2>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-5">
          {posts.slice(0, 3).map((post) => (
            <SinglePost post={post} key={post.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
