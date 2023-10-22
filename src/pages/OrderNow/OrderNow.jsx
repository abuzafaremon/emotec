import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import auth, { db } from "../../firebase.init";
import { doc, updateDoc } from "firebase/firestore";
import SmLoading from "../../components/Loading/SmLoading";
import swal from "sweetalert";

const OrderNow = () => {
  const user = auth.currentUser;
  const location = useLocation();
  const { post } = location.state;
  const [name, setName] = useState(user ? user.displayName : "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      swal("Your are not logged in", "", "warning");
      return;
    }
    setLoading(true);

    const postRef = doc(db, "posts", post.id);
    // Update the post
    await updateDoc(postRef, {
      comments: [
        ...post.comments,
        { name: name, phone: phone, product: post.title, price: post.price },
      ],
    });

    setLoading(false);
    setPhone("");
    swal("Your Order is Placed", "", "success");
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content items-start flex-col lg:flex-row-reverse">
        <img
          className="max-w-sm rounded-lg shadow-2xl"
          src={post?.postImage}
          alt=""
        />
        <div>
          <h1 className="text-xl md:text-3xl font-bold">{post?.title}</h1>
          <p className="py-5">
            অর্ডার করতে চাইলে আপনি আমাকে ফেসবুকে মেসেজ দিতে পারেন, অথবা
            হোয়াটসএপে মেসেজ দিতে পারেন। অথবা সরাসরি কল দিতে পারেন।
          </p>
          <a
            className="btn btn-primary btn-sm"
            href="https://facebook.com/abuzafaremon"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            className="btn btn-primary btn-sm"
            href="https://facebook.com/oneclick444"
            target="_blank"
            rel="noreferrer"
          >
            Page
          </a>
          <a
            className="btn btn-primary btn-sm"
            href="https://m.me/abuzafaremon"
            target="_blank"
            rel="noreferrer"
          >
            Messenger
          </a>
          <a className="btn btn-primary btn-sm" href="tel:+8801707894381">
            Call Me
          </a>
          <div className="py-5">
            <h2 className="text-lg font-semibold">Order Form</h2>
            <form>
              <div className="form-control mb-1">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="name"
                  placeholder="Your Name..."
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-1">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  id="phone"
                  placeholder="Your Phone Number..."
                  required
                  className="input input-bordered"
                />
              </div>
              <button onClick={handleOrder} className="btn btn-primary btn-sm">
                {loading ? <SmLoading /> : "Order"}
              </button>
            </form>
          </div>
          <div className="p-5">{parse(post?.postText)}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
