import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import apiInstance from "../../axios/axios";
import { register } from "../../axios/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checked, setChecked] = useState(false);
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errPassword2, setErrPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ============= Event Handlers =============
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
    setErrPassword2("");
  };

  // ============= Validation Functions =============
  // Email Validation
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  // Phone Validation for Pakistani numbers
  const phoneValidation = (phone) => {
    const regex = /^(\+92|0)?(3[0-9]{2})[0-9]{7}$/; // Matches +92 XXX XXXXXXX or 03XX XXXXXXX
    return regex.test(phone);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic field validation
    if (checked) {
      if (!clientName) {
        setErrClientName("Enter your name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else if (!EmailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
      if (!phone) {
        setErrPhone("Enter your phone number");
      } else if (!phoneValidation(phone)) {
        setErrPhone("Enter a valid Pakistani phone number (03XX XXXXXXX or +92 XXX XXXXXXX)");
      }
      if (!password) {
        setErrPassword("Create a password");
      } else if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      } else if (password !== password2) {
        setErrPassword2("Your passwords do not match");
      }

      // Proceed with form submission if all validations pass
      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        phone &&
        phoneValidation(phone) &&
        password &&
        password.length >= 6 &&
        password === password2
      ) {
        setLoading(true);
        const { error } = await register(clientName, email, phone, password, password2);
        if (error) {
          alert(JSON.stringify(error));
        } else {
          navigate("/");
        }

        setLoading(false);
        setSuccessMsg(
          `Hello dear ${clientName}, Welcome to Vivify Store. We received your signup request. We are processing your account and will notify you at ${email}.`
        );
        setClientName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setPassword2("");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      {/* Left Section */}
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src='/vivify.png' alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">Get started for free</h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          {/* Benefits list */}
          {/* Footer */}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* Full Name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Full Name</p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Email</p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Phone Number</p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="03XX XXXXXXX or +92 XXX XXXXXXX"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Password</p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Enter a password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">Confirm Password</p>
                  <input
                    onChange={handlePassword2}
                    value={password2}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm your password"
                  />
                  {errPassword2 && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword2}
                    </p>
                  )}
                </div>
                {/* Terms Checkbox */}
                <div className="flex flex-row items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <p className="font-medium text-gray-500 text-sm">
                    I agree to the{" "}
                    <span className="text-primeColor cursor-pointer">Terms & Conditions</span>
                  </p>
                </div>
                {/* Sign Up Button */}
                <button
                  onClick={handleSignUp}
                  className={`w-full text-white text-base font-semibold tracking-wide h-10 ${
                    !checked ? "bg-gray-500" : "bg-primeColor hover:bg-black duration-300"
                  } rounded-md flex justify-center items-center mt-6`}
                  disabled={!checked}
                >
                  {loading ? "Creating your account..." : "Sign Up"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
