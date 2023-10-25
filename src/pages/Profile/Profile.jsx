import auth from "../../firebase.init";
import dummyUser from "../../assets/images/dummyUser.png";
import { deleteUser, signOut } from "firebase/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import { useEffect, useState } from "react";

const Profile = () => {
  const user = auth.currentUser;
  const [orders, setOrders] = useState([]);
  const [posts] = usePosts();
  const myOrders = orders?.filter((order) => order.email === user?.email);
  useEffect(() => {
    posts?.map((post) => setOrders(post.orders));
  }, [posts]);
  const navigate = useNavigate();
  const deleteAccount = async () => {
    swal({
      title: "Are You Sure?",
      text: "If you delete your account, you can not recover this account",
      icon: "warning",
      button: "Delete",
    }).then((okk) => {
      if (okk) {
        deleteUser(auth?.currentUser)
          .then(() => {
            swal("Done", "Successfully Deleted Your Account", "success");
            signOut(auth);
            navigate("/register");
          })
          .catch((error) => {
            swal("An error occurred", `${error}`, "error");
          });
      } else {
        swal("Don't Worry", "Your Account is safe", "");
      }
    });
  };
  return (
    <section className="min-h-screen p-3 sm:p-5">
      <div className="w-full max-w-xl shadow rounded-2xl mx-auto p-3">
        <h2 className="text-3xl font-bold text-center mb-5">My Profile</h2>
        <div>
          <div>
            <img
              className="rounded-full w-16 h-16 mx-auto border"
              src={user?.photoURL ? user.photoURL : dummyUser}
              alt={user?.displayName}
            />
          </div>
          <div className="text-center text-xl ">
            <h2 className="font-semibold">{user?.displayName}</h2>
            <h3 className="font-medium">{user?.email}</h3>
          </div>
          <div className="text-center mt-5">
            <button
              onClick={deleteAccount}
              className="btn btn-sm btn-error text-white"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl shadow rounded-2xl mx-auto p-3 mt-2">
        <h2 className="text-3xl font-bold text-center mb-5">My Orders</h2>
        <div>
          {myOrders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders?.map((order, i) => (
                    <tr key={i} className="bg-base-200">
                      <td>{order.product}</td>
                      <td>{order.price}/-</td>
                      <td>{order.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
