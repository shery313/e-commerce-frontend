import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { logoLight } from "../../assets/images";
import { login } from "../../axios/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email) setErrEmail("Please enter your email.");
    if (!password) setErrPassword("Please enter your password.");
    
    if (email && password) {
      setLoading(true);
      const { error } = await login(email, password);
      if (error) {
        alert(error);
      } else {
        navigate("/");
        setSuccessMsg(`Welcome back! Your credentials are being processed. Keep an eye on your email: ${email}.`);
      }
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center lg:flex-row">
      <div className="hidden lg:flex w-1/2 h-full bg-primeColor text-white flex-col px-10 justify-center">
        <Link to="/">
          <img src='/vivify.png' alt="logoImg" className="w-28 mb-5" />
        </Link>
        <h1 className="text-2xl font-titleFont font-semibold mb-2">Stay signed in for more with Vivify Store</h1>
        <p className="text-base mb-4">Sign in and enjoy personalized services with us.</p>
        <div className="flex items-start gap-3 mb-4">
          <BsCheckCircleFill className="text-green-500 mt-1" />
          <p className="text-gray-300">
            <span className="font-semibold">Fast and easy access to Vivify Store</span>
            <br /> Experience a seamless shopping journey with our platform.
          </p>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <BsCheckCircleFill className="text-green-500 mt-1" />
          <p className="text-gray-300">
            <span className="font-semibold">Unlock all Vivify Store services</span>
            <br /> Explore a wide range of products and services.
          </p>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <BsCheckCircleFill className="text-green-500 mt-1" />
          <p className="text-gray-300">
            <span className="font-semibold">Trusted by shoppers globally</span>
            <br /> We guarantee a secure and enjoyable shopping experience.
          </p>
        </div>
        <div className="flex justify-between text-sm font-titleFont text-gray-300 mt-10">
          <Link to="/" className="hover:text-white">© Vivify Store</Link>
          <Link to="/" className="hover:text-white">Terms</Link>
          <Link to="/" className="hover:text-white">Privacy</Link>
          <Link to="/" className="hover:text-white">Security</Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
        {successMsg ? (
          <div className="w-full lg:w-[500px] flex flex-col items-center justify-center px-6 py-4">
            <p className="text-green-500 text-center font-titleFont font-medium mb-4">{successMsg}</p>
            <Link to="/signup">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lg:w-[450px] flex flex-col justify-center px-6 py-4" onSubmit={handleSignIn}>
            <h1 className="text-3xl font-titleFont underline decoration-[1px] underline-offset-4 font-semibold mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-base font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  className="h-10 px-4 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-primeColor"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmail}
                />
                {errEmail && <p className="text-red-500 text-sm mt-1">{errEmail}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-base font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  className="h-10 px-4 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-primeColor"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePassword}
                />
                {errPassword && <p className="text-red-500 text-sm mt-1">{errPassword}</p>}
              </div>
              <button
                type="submit"
                className={`mt-4 h-10 rounded-md font-medium ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-primeColor text-white hover:bg-black"
                } duration-300`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-sm text-center font-medium mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="hover:text-blue-600 duration-300">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
