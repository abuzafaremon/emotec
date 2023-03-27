import auth from "../../firebase.init";
import dummyUser from "../../assets/images/dummyUser.png";
import { deleteUser, signOut } from "firebase/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = auth.currentUser;
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
      <div className="w-full max-w-lg shadow rounded-2xl mx-auto p-3">
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
    </section>
  );
};

export default Profile;
