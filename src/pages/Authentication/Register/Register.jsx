import { useForm } from "react-hook-form";
import auth, { db } from "../../../firebase.init";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import SmLoading from "../../../components/Loading/SmLoading";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import swal from "sweetalert";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email().required("Email is Required"),
    password: yup
      .string()
      .min(4, "Minimum 6 character")
      .max(10, "Maximum 10 character")
      .required("Password is Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    //   "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
  })
  .required();

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [updateError, setUpdateError] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        swal({
          title: "Good job!",
          text: "Successfully Create Account. Please Verify First",
          icon: "success",
          button: "Verify",
        }).then((okk) => {
          if (okk) {
            sendEmailVerification(auth.currentUser).then(() => {
              swal(
                "Verification Email Sent!",
                `Check Your inbox in ${data.email}`,
                "success"
              );
            });
          } else {
            swal("Verify First", "", "").then((okk) => {
              if (okk) {
                sendEmailVerification(auth.currentUser).then(() => {
                  swal(
                    "Verification Email Sent!",
                    `Check Your inbox in ${data.email}`,
                    "success"
                  );
                });
              } else {
                signOut(auth)
                  .then(() => {})
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
          }
        });
      })
      .catch((error) => {
        setError(error);
      });

    await updateProfile(auth.currentUser, {
      displayName: data.name,
    })
      .then(async () => {
        const userRef = await addDoc(collection(db, "users"), {
          name: data.name,
          email: data.email,
          role: (data.role = "user"),
        });
        await updateDoc(doc(db, "users", userRef.id), {
          userId: auth.currentUser.uid,
        });
      })
      .catch((error) => {
        setUpdateError(error);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  let errorElement;
  if (error || updateError) {
    errorElement = (
      <p className="text-red-500">{error?.code || updateError?.code}</p>
    );
  }

  return (
    <section className="min-h-[100vh-64px] flex justify-center py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs border p-3 rounded-2xl shadow-xl"
      >
        <h2 className="text-center font-bold text-3xl py-2 text-slate-700">
          Register
        </h2>
        <div className="grid gap-2">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
            />
            <p className="text-red-500 text-xs md:text-sm">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <p className="text-red-500 text-xs md:text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            <p className="text-red-500 text-xs md:text-sm">
              {errors.password?.message}
            </p>
          </div>
          <span className="text-sm">{errorElement}</span>
          <div>
            {loading ? (
              <button className="btn w-full max-w-xs">
                <SmLoading />
              </button>
            ) : (
              <input
                type="submit"
                value="Register"
                className="btn w-full max-w-xs"
              />
            )}
            <p>
              <span>Have an account?</span>
              <Link to="/login" className="link link-success">
                Please Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
