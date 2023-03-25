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
          <button className="btn w-1/4 btn-sm">Like</button>
          <button className="btn w-1/4 btn-sm">Comment</button>
          <button className="btn w-1/4 btn-sm">Share</button>
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
