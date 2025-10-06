import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/courseSlice";
import { FiPlay, FiUsers, FiAward, FiTrendingUp, FiArrowRight, FiCheck, FiStar, FiBook, FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coursesData } = useSelector((state) => state.course);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
    })();
  }, []);

  const filteredCourses = coursesData?.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleViewCourse = (course) => {
    // For non-logged-in users, show course details in modal
    // For logged-in users, navigate to lectures
    if (!localStorage.getItem('isLoggedIn')) {
      setSelectedCourse(course);
      setShowModal(true);
    } else {
      navigate("/course/displaylectures", { state: { ...course } });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-base-200">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-6">
          <div className="relative z-10 flex items-center justify-between max-w-[1400px] mx-auto">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Power Up Your Tech Skills With</h2>
              <h3 className="text-3xl font-extrabold text-cyan-400 mb-2">PREMIUM COURSES</h3>
              <h4 className="text-xl font-bold mb-4">React, Node.js, Python & DSA</h4>
              <div className="flex gap-4">
                <Link to="/courses" className="btn btn-primary">
                  Start Learning<br />At Just ₹4,999/-
                </Link>
                <button className="btn btn-outline btn-accent">View Demo</button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg opacity-20"></div>
            </div>
          </div>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">💻</div>
            <div className="absolute bottom-4 left-4 text-4xl">🚀</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">All Courses</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">📚 {filteredCourses.length}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 w-full max-w-2xl">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-base rounded-full border-2 border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all duration-300 outline-none"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                className="group relative px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow hover:shadow-md transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600"
                onClick={() => {}}
              >
                <span className="relative z-10">Search</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-4 border-b border-base-300 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">🔽 Filter</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`btn btn-sm ${filterType === "all" ? "btn-primary" : "btn-ghost"}`}
              >
                All Courses
              </button>
              <button
                onClick={() => setFilterType("popular")}
                className={`btn btn-sm ${filterType === "popular" ? "btn-secondary" : "btn-ghost"}`}
              >
                Popular
              </button>
              <button
                onClick={() => setFilterType("new")}
                className={`btn btn-sm ${filterType === "new" ? "btn-accent" : "btn-ghost"}`}
              >
                New
              </button>
            </div>
          </div>

          {/* Course Cards Grid */}
          {filteredCourses && filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={course._id}
                  className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition cursor-pointer relative overflow-hidden"
                  onClick={() => handleViewCourse(course)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`badge text-xs font-bold ${
                      index % 3 === 0 ? "badge-warning text-black" :
                      index % 3 === 1 ? "badge-success" : "badge-info"
                    }`}>
                      {index % 3 === 0 ? "BESTSELLER" : index % 3 === 1 ? "POPULAR" : "NEW"}
                    </span>
                  </div>

                  {/* WhatsApp Icon */}
                  <div className="absolute top-3 right-3 z-10">
                    <button className="btn btn-circle btn-sm bg-green-500 hover:bg-green-600 border-none text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </button>
                  </div>

                  <figure className="h-48 relative">
                    <img
                      src={course?.thumbnail?.secure_url || "/api/placeholder/400/200"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Skills Badge */}
                    <div className="absolute bottom-3 left-3">
                      <div className="badge badge-neutral text-xs">⚡ SKILLS</div>
                    </div>
                    {/* Language Badge */}
                    <div className="absolute bottom-3 right-3">
                      <div className="badge badge-outline bg-white text-black text-xs">English</div>
                    </div>
                  </figure>

                  <div className="card-body p-4">
                    <h3 className="card-title text-base font-bold line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm opacity-70 line-clamp-1 mb-3">
                      {course.createdBy}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-xs opacity-70 mb-3">
                      <span>📚 {course.numberOfLectures} Lectures</span>
                      <span>👥 {Math.floor(Math.random() * 1000) + 100}+ Students</span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-bold text-lg">₹{Math.floor(Math.random() * 5000) + 2000}</span>
                        <span className="line-through opacity-50 ml-2">₹{Math.floor(Math.random() * 10000) + 8000}</span>
                      </div>
                      <button className="group relative px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-md shadow-sm hover:shadow transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600">
                        <span className="relative z-10">View Details</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body text-center py-16">
                <div className="text-7xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-2">No Courses Available</h3>
                <p className="opacity-70">New courses will be added soon. Stay tuned!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course Details Modal for Non-Logged-In Users */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Course Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost btn-sm"
                >
                  ✕
                </button>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Course Image & Basic Info */}
                <div className="space-y-4">
                  <img
                    src={selectedCourse?.thumbnail?.secure_url || "/api/placeholder/400/200"}
                    alt={selectedCourse.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedCourse.title}</h3>
                    <p className="text-base-content/70 mb-4">{selectedCourse.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <FiBook className="w-4 h-4" />
                        {selectedCourse.numberOfLectures} Lectures
                      </span>
                      <span className="flex items-center gap-1">
                        <FiUsers className="w-4 h-4" />
                        {Math.floor(Math.random() * 1000) + 100}+ Students
                      </span>
                      <span className="badge badge-primary">English</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-base-200 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{Math.floor(Math.random() * 5000) + 2000}
                        </span>
                        <span className="line-through opacity-50 ml-2">
                          ₹{Math.floor(Math.random() * 10000) + 8000}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Course Features */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold mb-4">What You'll Learn</h4>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">📚</span>
                      </div>
                      <span>Comprehensive curriculum with practical examples</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">🎯</span>
                      </div>
                      <span>Industry-relevant projects and case studies</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400">🏆</span>
                      </div>
                      <span>Certificate of completion</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                      </div>
                      <span>Lifetime access to course materials</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400">💬</span>
                      </div>
                      <span>Community support and Q&A forums</span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
                    <h5 className="text-lg font-semibold mb-2">Ready to Start Learning?</h5>
                    <p className="mb-4 opacity-90">Join thousands of students already learning with us!</p>
                    <div className="flex gap-3">
                      <Link
                        to="/signup"
                        className="flex-1 btn btn-accent"
                        onClick={() => setShowModal(false)}
                      >
                        Sign Up to Enroll
                      </Link>
                      <Link
                        to="/login"
                        className="flex-1 btn btn-outline btn-accent text-white border-white hover:bg-white hover:text-primary"
                        onClick={() => setShowModal(false)}
                      >
                        Login to Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Courses;
