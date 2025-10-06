import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { login } from "../Redux/authSlice";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // function to handle the user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // function to login
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // checking the empty fields
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    // calling login action
    const res = await dispatch(login(loginData));

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");

    // clearing the login inputs
    setLoginData({
      email: "",
      password: "",
    });
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
                  Welcome
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Back
                  </span>
                </h1>
                <p className="text-xl text-base-content/70 leading-relaxed">
                  Sign in to continue your learning journey with us.
                  Access your courses, track your progress, and connect with our community.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">Continue Learning</h3>
                    <p className="text-base-content/60 text-sm">Pick up where you left off</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">Track Progress</h3>
                    <p className="text-base-content/60 text-sm">Monitor your learning journey</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">Earn Certificates</h3>
                    <p className="text-base-content/60 text-sm">Get recognized for your achievements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative">
              <div className="bg-base-100 rounded-3xl p-8 shadow-2xl border border-base-300">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-base-content mb-2">Sign In</h2>
                  <p className="text-base-content/70">Welcome back to your learning journey</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
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
                        value={loginData.email}
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
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 pr-12 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={loginData.password}
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
                  </div>

                  {/* Guest Login */}
                  <div
                    onClick={() =>
                      setLoginData({ email: "test@gmail.com", password: "Test@123" })
                    }
                    className="text-center text-primary hover:text-primary-focus cursor-pointer transition-colors text-sm"
                  >
                    Use Guest Account
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
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Forgot Password Link */}
                  <div className="text-center pt-2">
                    <Link
                      to="/forgetpassword"
                      className="text-primary hover:text-primary-focus font-medium transition-colors text-sm"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Signup Link */}
                  <div className="text-center pt-4">
                    <p className="text-base-content/70">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:text-primary-focus font-medium transition-colors"
                      >
                        Create Account
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

export default Login;
