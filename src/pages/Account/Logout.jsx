import { useEffect } from "react";
// import { LoggedOutView } from "../shop/home";
import { logout } from "../../axios/auth";
import { Link } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <section>
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full px-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-center text-2xl font-semibold mb-4">
              You have been logged out
            </h3>
            <p className="text-center text-gray-600 mb-6">
              We hope to see you again soon! Please login or register to continue.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signin"
                className="w-1/2 text-center bg-primeColor text-white py-2 rounded-lg hover:bg-black transition duration-300"
              >
                Login <i className="fas fa-sign-in-alt ml-2"></i>
              </Link>
              <Link
                to="/signup"
                className="w-1/2 text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Register <i className="fas fa-user-plus ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Logout;
