import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useCallback, useMemo, useState, useLayoutEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import SmLoading from "../../components/Loading/SmLoading";
import auth, { db, storage } from "../../firebase.init";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 10px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useLayoutEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
        setLoading(false);
      }),
    []
  );
  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
    });

  const uploadPost = async () => {
    if (title === "" || postText === "") {
      return;
    }
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        postText: postText,
        author: {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        },
        time: Date.now(),
      });
      if (uploadedFile) {
        const imageRef = ref(storage, `postsImages/${title + docRef.id}`);
        uploadBytes(imageRef, uploadedFile, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            postImage: downloadURL,
          });
        });
      }
      navigate("/blogs");

      setTitle("");
      setPostText("");
      setUploadedFile(null);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-sm">
              Hey {user?.displayName}, write your post...
            </h2>
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Title:</span>
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                id="title"
                placeholder="Title..."
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label htmlFor="postText" className="label">
                <span className="label-text">Post:</span>
              </label>
              <textarea
                onChange={(e) => setPostText(e.target.value)}
                value={postText}
                type="text"
                id="postText"
                placeholder={`Whats on your mind ${user?.displayName}`}
                required
                className="textarea input-bordered resize-none"
              ></textarea>
            </div>
            <div>
              <label className="label items-start gap-1">
                <div>
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop image files here</p>
                  </div>
                </div>
                {uploadedFile && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="postImage"
                      width={100}
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="form-control">
              <span>{error?.messages}</span>
              {loading ? (
                <button className="btn">
                  <SmLoading />
                </button>
              ) : (
                <button className="btn" onClick={uploadPost}>
                  Submit Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPost;
