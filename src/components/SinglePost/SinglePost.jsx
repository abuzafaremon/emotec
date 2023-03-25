import moment from "moment/moment";
import dummyUser from "../../assets/images/dummyUser.png";
import PostMenu from "../PostMenu/PostMenu";
import auth, { db, storage } from "../../firebase.init";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import UpdatePost from "../UpdatePost/UpdatePost";
import { useState } from "react";

const SinglePost = ({ post, setLoading }) => {
  const user = auth.currentUser;
  const { title, postImage, postText, author, time, id } = post;
  const navigate = useNavigate();

  // Update post modal
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //-----------------------

  const deletePost = async () => {
    if (user?.uid !== author?.id) {
      swal("This is not your post", "You can not delete this post", "error");
      return;
    }
    setLoading(true);
    // Delete the post
    await deleteDoc(doc(db, "posts", id));
    // Delete the Image
    if (postImage) {
      const imageDeleteRef = ref(storage, `postsImages/${title + id}`);
      await deleteObject(imageDeleteRef)
        .then(() => {
          swal("", "Post deleted successful", "success");
          navigate("/addPost");
        })
        .catch((error) => {
          swal("", `${error}`, "warning");
        });
    } else {
      swal("", "Post deleted successful", "success");
      navigate("/addPost");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="card card-compact bg-base-100 shadow-xl">
        <div className="flex items-center gap-2 p-2">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-offset-white ring-offset-2">
            <img
              className="w-full"
              src={author?.photoURL ? author.photoURL : dummyUser}
              alt={author?.displayName}
            />
          </div>
          <div className="flex flex-col text-sm flex-grow">
            <strong>{author.name}</strong>
            <span>{moment(time).fromNow()}</span>
          </div>
          {user && <PostMenu deletePost={deletePost} openModal={openModal} />}
        </div>
        <div className="px-2 pb-2">
          <h2 className="card-title">{title}</h2>
          <p>{postText.split(" ").slice(0, 10).join(" ")}</p>
        </div>
        <figure className="overflow-hidden">
          <img
            className="w-full"
            src={postImage}
            alt={postImage && "Post Image"}
          />
        </figure>
        <div className="card-actions justify-between p-2">
          <button className="btn w-1/4 btn-sm flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
            <span>Like</span>
          </button>
          <button className="btn flex-grow btn-sm flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>Comment</span>
          </button>
          <button className="btn w-1/4 btn-sm flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
      <UpdatePost
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        post={post}
      />
    </>
  );
};

export default SinglePost;
