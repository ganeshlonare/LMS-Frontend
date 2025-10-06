import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiPlay, FiUsers, FiAward, FiTrendingUp, FiArrowRight, FiCheck, FiStar, FiBook, FiClock, FiZap, FiShield, FiHeadphones, FiCheckCircle, FiTarget } from "react-icons/fi";

const Homepage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect logged-in users to their dashboard
    if (isLoggedIn && role === "USER") {
      navigate("/user/dashboard");
    } else if (isLoggedIn && role === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn, role, navigate]);

  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Certificates",
      description: "Earn recognized certificates to showcase your skills and advance your career"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Access courses designed to help you advance in your professional journey"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white dark:bg-base-100 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/5 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-accent/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-primary/5 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({length: 144}).map((_, i) => (
                <div key={i} className="border border-base-content/10"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start min-h-[80vh] pt-24 pb-16 max-w-[1400px] mx-auto">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                #1 Learning Platform 2024
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-tight">
                  Master Skills
                  <span className="block bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                    Build Your Future
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-base-content/70 leading-relaxed">
                  Join over <span className="font-semibold text-primary">50,000+ students</span> learning from industry experts. 
                  Get certified, advance your career, and unlock your potential with our comprehensive courses.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-base-100 dark:bg-base-200 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Lifetime Access</div>
                    <div className="text-xs text-base-content/60">Learn at your pace</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-100 dark:bg-base-200 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <FiAward className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Certificates</div>
                    <div className="text-xs text-base-content/60">Industry recognized</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-100 dark:bg-base-200 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <FiUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Expert Support</div>
                    <div className="text-xs text-base-content/60">24/7 assistance</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link to="/courses" className="btn btn-primary btn-lg gap-2 group shadow-lg hover:shadow-xl transition-all">
                  Start Learning Today
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn btn-outline btn-lg gap-2 hover:shadow-lg transition-all">
                  <FiPlay className="w-5 h-5" />
                  Watch Demo (2 min)
                </button>
              </div>

              {/* Social Proof */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="avatar-group -space-x-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="avatar">
                          <div className="w-10 rounded-full ring ring-white ring-offset-1">
                            <img src={`https://i.pravatar.cc/40?img=${i}`} alt={`Student ${i}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-base-content/60 font-medium">50,000+ happy students</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-8 pt-4 border-t border-base-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-content">4.9/5</div>
                    <div className="text-xs text-base-content/60">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-content">50+</div>
                    <div className="text-xs text-base-content/60">Expert Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-content">95%</div>
                    <div className="text-xs text-base-content/60">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-content">24/7</div>
                    <div className="text-xs text-base-content/60">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div className="relative lg:pl-8">
              {/* Main Visual Card */}
              <div className="relative">
                {/* Background Cards */}
                <div className="absolute -top-4 -right-4 w-80 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-sm"></div>
                <div className="absolute -bottom-4 -left-4 w-80 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-sm"></div>
                
                {/* Main Card */}
                <div className="relative bg-white dark:bg-base-100 rounded-3xl shadow-2xl p-8 border border-base-300">
                  {/* Course Preview */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Featured Course</h3>
                      <div className="badge badge-primary">Popular</div>
                    </div>
                    
                    {/* Video Thumbnail */}
                    <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl h-48 flex items-center justify-center group cursor-pointer">
                      <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                      <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FiPlay className="w-8 h-8 text-white ml-1" />
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm font-medium">React Masterclass</div>
                        <div className="text-xs opacity-80">12 hours • 45 lessons</div>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-base-200 rounded-lg">
                        <div className="text-lg font-bold text-primary">4.9</div>
                        <div className="text-xs text-base-content/60">Rating</div>
                      </div>
                      <div className="text-center p-3 bg-base-200 rounded-lg">
                        <div className="text-lg font-bold text-secondary">12k+</div>
                        <div className="text-xs text-base-content/60">Students</div>
                      </div>
                      <div className="text-center p-3 bg-base-200 rounded-lg">
                        <div className="text-lg font-bold text-accent">45</div>
                        <div className="text-xs text-base-content/60">Lessons</div>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src="https://i.pravatar.cc/40?img=10" alt="Instructor" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Sarah Johnson</div>
                        <div className="text-xs text-base-content/60">Senior Developer at Google</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                  <FiTrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center animate-pulse">
                  <FiAward className="w-8 h-8 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="pb-20 bg-base-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Join a community of learners who are transforming their careers and lives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FiUsers className="w-8 h-8" />, value: "50,000+", label: "Active Students", color: "text-blue-600" },
              { icon: <FiAward className="w-8 h-8" />, value: "500+", label: "Expert Instructors", color: "text-green-600" },
              { icon: <FiBook className="w-8 h-8" />, value: "1000+", label: "Courses Available", color: "text-purple-600" },
              { icon: <FiTrendingUp className="w-8 h-8" />, value: "95%", label: "Success Rate", color: "text-orange-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`mx-auto w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-base-content mb-2">{stat.value}</div>
                <div className="text-base-content/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-medium text-sm">
                <FiTarget className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-base-content">
                Democratizing Quality Education
              </h2>
              <p className="text-lg text-base-content/80 leading-relaxed">
                We believe that quality education should be accessible to everyone, regardless of their background, location, or financial situation. Our mission is to break down barriers and create equal opportunities for lifelong learning.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                  <span>Provide affordable, high-quality courses</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                  <span>Connect learners with industry experts</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                  <span>Build a supportive learning community</span>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full text-secondary font-medium text-sm">
                <FiStar className="w-4 h-4" />
                Our Vision
              </div>
              <h2 className="text-3xl font-bold text-base-content">
                A World of Lifelong Learners
              </h2>
              <p className="text-lg text-base-content/80 leading-relaxed">
                We envision a future where continuous learning is the norm, where curiosity drives innovation, and where education empowers individuals to reach their full potential and contribute meaningfully to society.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Foster a global learning community</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Drive innovation through education</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Create positive social impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Expert-Led Content",
                description: "Learn from industry professionals with real-world experience and proven track records.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: "Lifetime Access",
                description: "Get unlimited access to course materials and updates for life, learn at your own pace.",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: <FiHeadphones className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Our dedicated support team is available round the clock to help you succeed.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: "Certified Learning",
                description: "Earn industry-recognized certificates that boost your career prospects.",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 group">
                <div className="card-body text-center">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title justify-center text-xl mb-3">{feature.title}</h3>
                  <p className="text-base-content/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-base-content/70">
              Real stories from real learners who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Software Developer",
                content: "This platform transformed my career. The courses are comprehensive and the instructors are exceptional.",
                rating: 5,
                image: "https://i.pravatar.cc/100?img=5"
              },
              {
                name: "Raj Patel",
                role: "Data Scientist",
                content: "The practical approach and real-world projects helped me land my dream job at a Fortune 500 company.",
                rating: 5,
                image: "https://i.pravatar.cc/100?img=6"
              },
              {
                name: "Anita Singh",
                role: "UX Designer",
                content: "The community support and mentorship program are outstanding. I feel supported throughout my learning journey.",
                rating: 5,
                image: "https://i.pravatar.cc/100?img=7"
              }
            ].map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base-content/80 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-base-content/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their careers with our comprehensive courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/courses" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-slate-800">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};
export default Homepage;
