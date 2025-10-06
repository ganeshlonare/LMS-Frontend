import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/authSlice";
import { FiUser, FiMail, FiLock, FiCamera, FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // for user input
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // function to create account
  const createNewAccount = async (event) => {
  event.preventDefault();
  setIsLoading(true);

  if (!signupData.email || !signupData.fullName || !signupData.password) {
    toast.error("Please fill all the fields");
    setIsLoading(false);
    return;
  }

  if (signupData.fullName.length < 5) {
    toast.error("Name should be at least 5 characters");
    setIsLoading(false);
    return;
  }

  if (!signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    toast.error("Invalid email id");
    setIsLoading(false);
    return;
  }

  if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
    toast.error("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol");
    setIsLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append("fullName", signupData.fullName);
  formData.append("email", signupData.email);
  formData.append("password", signupData.password);

  // Only append avatar if a file was selected
  if (signupData.avatar) {
    formData.append("avatar", signupData.avatar);
  }

  const res = await dispatch(createAccount(formData));
  console.log("Response from createAccount:", res);

  if (res?.payload?.success) {
    navigate("/login");
  } else {
    toast.error(res?.payload?.message || "Signup failed");
  }

  setSignupData({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  setImagePreview("");
  setIsLoading(false);
};


  return (
    <Layout>
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full filter blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main Container */}
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* Left Side - Welcome Section */}
            <div className="hidden lg:block text-base-content space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-tight">
                  Join Our
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Learning Community
                  </span>
                </h1>
                <p className="text-xl text-base-content/70 leading-relaxed">
                  Start your journey with us and unlock unlimited access to premium courses,
                  expert instructors, and a vibrant community of learners.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">Expert-Led Courses</h3>
                    <p className="text-base-content/60 text-sm">Learn from industry professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">Career Growth</h3>
                    <p className="text-base-content/60 text-sm">Advance your professional skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">Lifetime Access</h3>
                    <p className="text-base-content/60 text-sm">Learn at your own pace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="relative">
              <div className="bg-base-100 rounded-3xl p-8 shadow-2xl border border-base-300">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-base-content mb-2">Create Account</h2>
                  <p className="text-base-content/70">Join thousands of learners today</p>
                </div>

                <form onSubmit={createNewAccount} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="flex justify-center mb-6">
                    <div className="relative group">
                      <label className="cursor-pointer block" htmlFor="image_uploads">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-primary/20 p-1">
                          <div className="w-full h-full rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                            {previewImage ? (
                              <img
                                className="w-full h-full object-cover"
                                src={previewImage}
                                alt="preview"
                              />
                            ) : (
                              <BsPersonCircle className="w-12 h-12 text-base-content/40" />
                            )}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <FiCamera className="w-6 h-6 text-primary-content" />
                        </div>
                      </label>
                      <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png"
                      />
                    </div>
                  </div>

                  {/* Full Name Input */}
                  <div className="space-y-2">
                    <label className="text-base-content font-medium flex items-center gap-2" htmlFor="fullName">
                      <FiUser className="w-4 h-4" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={signupData.fullName}
                        onChange={handleUserInput}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-base-content font-medium flex items-center gap-2" htmlFor="email">
                      <FiMail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={signupData.email}
                        onChange={handleUserInput}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="text-base-content font-medium flex items-center gap-2" htmlFor="password">
                      <FiLock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Create a strong password"
                        className="w-full px-4 py-3 pr-12 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={signupData.password}
                        onChange={handleUserInput}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                      >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-base-content/60">
                      Password must contain uppercase, lowercase, number and be 8+ characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary-content/30 border-t-primary-content rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-base-content/70">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:text-primary-focus font-medium transition-colors"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
