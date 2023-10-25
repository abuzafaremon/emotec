import React, { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import auth, { db } from "../../firebase.init";
import { doc, updateDoc } from "firebase/firestore";
import SmLoading from "../../components/Loading/SmLoading";
import swal from "sweetalert";
import usePosts from "../../hooks/usePosts";

const OrderNow = () => {
  const user = auth.currentUser;
  const [posts] = usePosts();
  const { productId } = useParams();
  const product = posts.find((p) => p.id === productId);
  const [name, setName] = useState(user ? user.displayName : "");
  const [phone, setPhone] = useState("+8801");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      swal("Your are not logged in", "", "warning");
      return;
    }
    setLoading(true);

    const postRef = doc(db, "posts", product.id);
    // Update the post
    await updateDoc(postRef, {
      orders: [
        ...product.orders,
        {
          name: name,
          email: user?.email,
          phone: phone,
          product: product.title,
          price: product.price,
        },
      ],
    });
    setLoading(false);
    setPhone("");
    swal("Your Order is Placed", "", "success");
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content items-start flex-col lg:flex-row-reverse">
        <div className="w-full">
          <img
            className="w-full max-w-sm lg:max-w-full rounded-lg shadow-lg"
            src={product?.postImage}
            alt=""
          />
          <p>{product?.title}</p>
          <p className="font-semibold">{product?.warranty}</p>
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-bold">{product?.title}</h1>
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
            <h2 className="font-semibold">
              অথবা, আপনার তথ্য দিন আমরা আপনার সাথে যোগাযোগ করবো।
            </h2>
            <form>
              <div className="form-control mb-1">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="name"
                  placeholder="আপনার নাম..."
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-1">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  minLength={11}
                  maxLength={11}
                  type="text"
                  id="phone"
                  placeholder="আপনার মোবাইল নাম্বার..."
                  required
                  className="input input-bordered"
                />
              </div>
              <button onClick={handleOrder} className="btn btn-primary btn-sm">
                {loading ? <SmLoading /> : "জমা দিন"}
              </button>
            </form>
          </div>
          <div className="p-5">{product && parse(product?.postText)}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
