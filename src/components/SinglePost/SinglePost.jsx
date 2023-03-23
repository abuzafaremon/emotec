const SinglePost = ({ post }) => {
  console.log(post);
  const { title, postImage, postText, author, time, id } = post;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="overflow-hidden">
        <img className="w-full" src={postImage} alt="" />
      </figure>
      <div className="flex items-center gap-2 p-2">
        <img
          className="rounded-full"
          width={30}
          height={30}
          src={author.photoURL}
          alt=""
        />
        <p className="flex flex-col text-sm flex-grow">
          <span>
            <strong>{author.name}</strong>
          </span>
          <span>Time:</span>
        </p>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{postText.slice(0, 100)}</p>
        <div className="card-actions justify-end">
          {/* <button className="btn" onClick={() => detailsPage(id)}>Read More &raquo;</button> */}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
