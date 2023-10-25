import moment from "moment/moment";
import dummyUser from "../../assets/images/dummyUser.png";
import PostMenu from "../PostMenu/PostMenu";
import auth, { db, storage } from "../../firebase.init";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import UpdatePost from "../UpdatePost/UpdatePost";
import { useState } from "react";

const SinglePost = ({ post, setLoading }) => {
  const user = auth.currentUser;
  const { title, postImage, intro, warranty, author, time, id, price, like } =
    post;
  // const [liked, setLiked] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const navigate = useNavigate();
  // Update post modal
  let [isOpen, setIsOpen] = useState(false);
  const liked = like?.likerEmail.find((email) => email === user?.email);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //-----------------------

  const deletePost = async () => {
    setLoading(true);
    // Delete the post
    await deleteDoc(doc(db, "posts", id));
    // Delete the Image
    if (postImage) {
      const imageDeleteRef = ref(storage, `postsImages/${title + id}`);
      await deleteObject(imageDeleteRef)
        .then(() => {
          swal("", "Post deleted successful", "success");
          navigate("/addProduct");
        })
        .catch((error) => {
          swal("", `${error}`, "warning");
        });
    } else {
      swal("", "Post deleted successful", "success");
      navigate("/addProduct");
    }
    setLoading(false);
  };

  const seeMore = () => {
    setIsShowMore(!isShowMore);
  };
  const handleOrder = (id) => {
    // console.log(id);
    navigate(`/products/order/${id}`);
  };

  const giveLike = async () => {
    if (user) {
      if (!liked) {
        const postRef = doc(db, "posts", post.id);
        // Update the post
        await updateDoc(postRef, {
          like: {
            value: like.value + 1,
            likerName: [...like.likerName, String(user?.displayName)],
            likerEmail: [...like.likerEmail, String(user?.email)],
          },
        });
      }
    } else {
      swal("You are not logged in!!!");
    }
  };

  return (
    <>
      <div className="card card-compact bg-base-100 shadow-xl p-2">
        <div className="flex items-center gap-2 p-2">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-offset-white ring-offset-2">
            <a
              href="https://facebook.com/abuzafaremon"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-full"
                src={author?.photoURL ? author.photoURL : dummyUser}
                alt={author?.displayName}
              />
            </a>
          </div>
          <div className="flex flex-col text-sm flex-grow">
            <strong>
              <a
                href="https://facebook.com/abuzafaremon"
                target="_blank"
                rel="noreferrer"
              >
                {author.name}
              </a>
            </strong>
            <span>{moment(time).fromNow()}</span>
          </div>
          {user?.email === "ek985307@gmail.com" && (
            <PostMenu deletePost={deletePost} openModal={openModal} />
          )}
        </div>
        <div className="px-2 pb-2">
          <h2 className="card-title">{title}</h2>
          <div>
            {isShowMore && intro}
            <span>
              <p className="font-semibold text-sm">{warranty}</p>
              <button onClick={seeMore} className="btn-link link-neutral block">
                {isShowMore ? "See Less" : "Intro"}
              </button>
            </span>
          </div>
        </div>
        {postImage && (
          <figure className="overflow-hidden h-64 border">
            <img
              className="h-64 object-contain"
              src={postImage}
              alt={postImage && "Post Image"}
            />
          </figure>
        )}
        <div className="px-2">
          {like?.likerName[like.likerName.length - 1]} and{" "}
          {like?.likerName.length - 1} others Liked
        </div>
        <div className="card-actions flex-nowrap p-2">
          <button
            onClick={giveLike}
            className={`btn ${
              !liked && "btn-outline"
            } flex-grow btn-sm flex items-center gap-1`}
          >
            <span className="font-bold text-lg">{like?.value}</span>
            <span>{liked ? "Liked" : "Like"}</span>
          </button>
          <button
            className={`btn btn-outline flex-grow btn-sm flex items-center gap-1`}
          >
            <span>Price-</span>
            <span className="text-xl font-semibold ">{price}/-</span>
          </button>
          <button
            onClick={() => handleOrder(id)}
            className={`btn btn-outline flex-grow btn-sm flex items-center gap-1`}
          >
            <span>Details</span>
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
