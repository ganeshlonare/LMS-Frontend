import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { getAllCourses } from "../../Redux/courseSlice";
import { 
  FiHome, 
  FiBook, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX,
  FiGrid,
  FiPlay,
  FiClock,
  FiTrendingUp,
  FiSun,
  FiMoon
} from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const userData = useSelector((state) => state?.auth?.data);
  const { coursesData } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    // Apply theme to document
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply theme on component mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    { icon: FiHome, label: "Overview", id: "overview" },
    { icon: FiBook, label: "My Courses", id: "courses" },
    { icon: FiGrid, label: "All Batches", id: "batches" },
    { icon: FiUser, label: "Profile", id: "profile" },
    { icon: FiSettings, label: "Settings", id: "settings" },
  ];

  const isActive = (id) => activeSection === id;

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  const hasPurchasedCourses = userData?.subscription?.status === "active";

  return (
    <div className="flex flex-col h-screen w-screen bg-base-200 fixed inset-0 overflow-hidden">
      {/* Top Navbar */}
      <nav className="bg-base-100 border-b border-base-300 px-6 py-3 flex items-center justify-between z-50">
        {/* Left: Brand/Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden btn btn-ghost btn-sm"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-base-content">
              LMS
            </span>
          </Link>
        </div>

        {/* Center: Page Title (optional, can be dynamic) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium opacity-70">Learning Dashboard</span>
        </div>

        {/* Right: Theme Toggle & User Info */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <FiSun size={18} className="text-yellow-500" />
            ) : (
              <FiMoon size={18} className="text-slate-600" />
            )}
          </button>
          
          <span className="hidden sm:inline text-sm">Hi, {userData?.fullName?.split(' ')[0] || "User"}</span>
          <div className="avatar">
            <div className="w-10 rounded-full">
              {userData?.avatar?.secure_url ? (
                <img src={userData.avatar.secure_url} alt={userData?.fullName || "User"} />
              ) : (
                <span className="text-base bg-primary text-primary-content">
                  {userData?.fullName?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 top-[57px] lg:top-0
            w-80 bg-base-100 border-r border-base-300
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
        <div className="flex flex-col h-full pt-4">
          {/* User info */}
          <div className="p-6 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {userData?.avatar?.secure_url ? (
                    <img src={userData.avatar.secure_url} alt={userData?.fullName || "User"} />
                  ) : (
                    <span className="text-base bg-primary text-primary-content">
                      {userData?.fullName?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{userData?.fullName || "User"}</p>
                <p className="text-xs opacity-70 truncate">{userData?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 text-left
                  ${
                    isActive(item.id)
                      ? "bg-neutral text-neutral-content shadow-sm"
                      : "hover:bg-base-200 text-base-content"
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-error hover:text-error-content transition-all duration-200"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto flex justify-center">
          <div className="w-full max-w-7xl p-6 lg:p-10">
            {/* Render content based on active section */}
            {activeSection === "overview" && <OverviewSection userData={userData} coursesData={coursesData} hasPurchasedCourses={hasPurchasedCourses} navigate={navigate} />}
            {activeSection === "courses" && <MyCoursesSection userData={userData} coursesData={coursesData} hasPurchasedCourses={hasPurchasedCourses} navigate={navigate} />}
            {activeSection === "batches" && !selectedCourse && <AllBatchesSection coursesData={coursesData} navigate={navigate} setSelectedCourse={setSelectedCourse} />}
            {activeSection === "batches" && selectedCourse && <CourseOverviewSection course={selectedCourse} setSelectedCourse={setSelectedCourse} />}
            {activeSection === "profile" && <ProfileSection userData={userData} navigate={navigate} />}
            {activeSection === "settings" && <SettingsSection userData={userData} />}
          </div>
        </main>
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({ userData, coursesData, hasPurchasedCourses, navigate }) => {
  const enrolledCourses = hasPurchasedCourses ? coursesData?.slice(0, 3) : [];
  const handleResumeCourse = (courseId) => {
    navigate("/course/displaylectures", { state: courseId });
  };

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {userData?.fullName || "Learner"}! 👋
        </h1>
        <p className="opacity-90">Ready to continue your learning journey?</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiBook className="text-neutral" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{hasPurchasedCourses ? coursesData?.length || 0 : 0}</p>
                <p className="text-sm opacity-70">Courses Enrolled</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiClock className="text-neutral" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">12h</p>
                <p className="text-sm opacity-70">Learning Time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiTrendingUp className="text-neutral" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{hasPurchasedCourses ? "Active" : "Free"}</p>
                <p className="text-sm opacity-70">Subscription</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning / Enrolled Courses */}
      {hasPurchasedCourses && enrolledCourses.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course._id} className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition">
                <figure className="h-48">
                  <img src={course?.thumbnail?.secure_url} alt={course.title} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg line-clamp-1">{course.title}</h3>
                  <p className="text-sm opacity-70 line-clamp-2">{course.description}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="badge badge-neutral">{course.numberOfLectures} Lectures</div>
                    <button onClick={() => handleResumeCourse(course._id)} className="btn btn-neutral btn-sm gap-2">
                      <FiPlay size={16} />
                      Resume
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="card bg-base-100 border border-base-300 shadow-md">
          <div className="card-body text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">No Courses Yet</h3>
            <p className="opacity-70 mb-6">Subscribe to unlock all courses and start learning today!</p>
            <button onClick={() => navigate("/checkout")} className="btn btn-neutral mx-auto">
              Subscribe Now
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

// My Courses Section Component
const MyCoursesSection = ({ userData, coursesData, hasPurchasedCourses, navigate }) => {
  const handleResumeCourse = (courseId) => {
    navigate("/course/displaylectures", { state: courseId });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="opacity-70 mt-1">
            {hasPurchasedCourses ? `You have access to ${coursesData?.length || 0} courses` : "Subscribe to unlock all courses"}
          </p>
        </div>
        {!hasPurchasedCourses && (
          <button onClick={() => navigate("/checkout")} className="btn btn-neutral">
            Subscribe Now
          </button>
        )}
      </div>

      {hasPurchasedCourses && coursesData?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((course) => (
            <div key={course._id} className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition">
              <figure className="h-48">
                <img src={course?.thumbnail?.secure_url} alt={course.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">{course.title}</h3>
                <p className="text-sm opacity-70 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm opacity-70">
                  <span className="flex items-center gap-1">
                    <FiClock size={14} />
                    {course.numberOfLectures} Lectures
                  </span>
                  <span className="badge badge-sm">{course.category}</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button onClick={() => handleResumeCourse(course._id)} className="btn btn-neutral btn-sm gap-2">
                    <FiPlay size={16} />
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 border border-base-300 shadow-md">
          <div className="card-body text-center py-16">
            <div className="text-7xl mb-4">📖</div>
            <h3 className="text-2xl font-bold mb-2">{hasPurchasedCourses ? "No courses available" : "Subscribe to Access All Courses"}</h3>
            <p className="opacity-70 mb-6 max-w-md mx-auto">
              {hasPurchasedCourses ? "New courses will appear here once they're added." : "Get unlimited access to all courses with a single subscription."}
            </p>
            {!hasPurchasedCourses && (
              <button onClick={() => navigate("/checkout")} className="btn btn-neutral mx-auto">
                View Plans
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// All Batches Section Component
const AllBatchesSection = ({ coursesData, navigate, setSelectedCourse }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const filteredCourses = coursesData?.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Batches</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-70">📊 0</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for batches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-lg w-full pl-12 text-base"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="btn btn-primary btn-lg">Study</button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Power Up Your Tech Skills With</h2>
            <h3 className="text-3xl font-extrabold text-cyan-400 mb-2">DECODE PROGRAMMING POWERHOUSE</h3>
            <h4 className="text-xl font-bold mb-4">C++, JAVA, PYTHON & DSA COURSE</h4>
            <div className="flex gap-4">
              <button className="btn btn-primary">
                Start Upskilling<br />At Just ₹4,999/-
              </button>
              <button className="btn btn-outline btn-accent">Enroll Now</button>
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-4 border-b border-base-300 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">🔽 Filter</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilterType("live")}
            className={`btn btn-sm ${filterType === "live" ? "btn-primary" : "btn-ghost"}`}
          >
            🔴 Live
          </button>
          <button 
            onClick={() => setFilterType("offline")}
            className={`btn btn-sm ${filterType === "offline" ? "btn-secondary" : "btn-ghost"}`}
          >
            Offline
          </button>
          <button 
            onClick={() => setFilterType("upcoming")}
            className={`btn btn-sm ${filterType === "upcoming" ? "btn-accent" : "btn-ghost"}`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Batches Count */}
      <div className="text-sm opacity-70">
        {filteredCourses.length} Batches available
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
                  {index % 3 === 0 ? "NEW" : index % 3 === 1 ? "LIVE" : "HOT"}
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
                  <button className="btn btn-primary btn-sm">
                    View Details
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
            <h3 className="text-2xl font-bold mb-2">No Batches Available</h3>
            <p className="opacity-70">New batches will be added soon. Stay tuned!</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Profile Section Component
const ProfileSection = ({ userData, navigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: userData?.fullName || '',
    email: userData?.email || ''
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditData({
        fullName: userData?.fullName || '',
        email: userData?.email || ''
      });
    }
  };

  const handleSave = () => {
    // Here you would typically dispatch an action to update the user data
    console.log('Saving profile data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      fullName: userData?.fullName || '',
      email: userData?.email || ''
    });
    setIsEditing(false);
  };

  const joinDate = new Date(userData?.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              {userData?.avatar?.secure_url ? (
                <img
                  src={userData.avatar.secure_url}
                  alt={userData?.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-content">
                    {userData?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">
              {userData?.fullName || "Welcome User"} 👋
            </h1>
            <p className="opacity-90">
              {userData?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiBook className="text-neutral" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm opacity-70">Courses Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiClock className="text-neutral" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">48h</p>
                <p className="text-sm opacity-70">Learning Hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiTrendingUp className="text-neutral" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm opacity-70">Progress Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <span className="text-neutral text-2xl">🏆</span>
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm opacity-70">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="p-3 bg-neutral/10 rounded-lg">
                  <FiUser className="text-neutral" size={18} />
                </div>
                Personal Information
              </h2>
              <button
                onClick={handleEditToggle}
                className={`btn btn-sm gap-2 ${
                  isEditing ? 'btn-ghost' : 'btn-primary'
                }`}
              >
                {isEditing ? (
                  <>
                    <FiX size={16} />
                    Cancel
                  </>
                ) : (
                  <>
                    <FiSettings size={16} />
                    Edit
                  </>
                )}
              </button>
            </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="font-medium">{userData?.fullName || "Not set"}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="font-medium">{userData?.email || "Not set"}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Account Status
              </label>
              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    userData?.subscription?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="font-medium capitalize">
                    {userData?.subscription?.status === 'active' ? 'Premium Member' : 'Free Member'}
                  </span>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="btn btn-primary flex-1 gap-2"
                >
                  <FiUser size={16} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <div className="p-3 bg-neutral/10 rounded-lg">
                <FiClock className="text-neutral" size={18} />
              </div>
              Recent Activity
            </h2>

            <div className="space-y-4">
              {[
                { icon: '📚', title: 'Completed "React Fundamentals" course', time: '2 hours ago' },
                { icon: '🎯', title: 'Started "Advanced JavaScript" course', time: '1 day ago' },
                { icon: '🏆', title: 'Earned "Quick Learner" badge', time: '3 days ago' },
                { icon: '📖', title: 'Watched 5 lectures in "Python Basics"', time: '1 week ago' },
                { icon: '✅', title: 'Completed quiz in "HTML & CSS"', time: '2 weeks ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm opacity-70">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <div className="p-3 bg-neutral/10 rounded-lg">
              <FiSettings className="text-neutral" size={18} />
            </div>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/user/editprofile')}
              className="flex items-center gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors text-left"
            >
              <FiUser className="text-neutral" size={20} />
              <div>
                <p className="font-medium">Edit Profile</p>
                <p className="text-sm opacity-70">Update your information</p>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/changepassword')}
              className="flex items-center gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors text-left"
            >
              <FiLogOut className="text-neutral" size={20} />
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm opacity-70">Update your security</p>
              </div>
            </button>
            
            <button
              onClick={() => setActiveSection('courses')}
              className="flex items-center gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors text-left"
            >
              <FiBook className="text-neutral" size={20} />
              <div>
                <p className="font-medium">My Courses</p>
                <p className="text-sm opacity-70">View your progress</p>
              </div>
            </button>
            
            {userData?.subscription?.status !== 'active' && (
              <button
                onClick={() => navigate('/checkout')}
                className="flex items-center gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors text-left"
              >
                <FiTrendingUp className="text-neutral" size={20} />
                <div>
                  <p className="font-medium">Upgrade Account</p>
                  <p className="text-sm opacity-70">Get premium access</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Course Overview Section Component
const CourseOverviewSection = ({ course, setSelectedCourse }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedCourse(null)}
          className="btn btn-ghost btn-sm gap-2 hover:bg-base-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-2 text-sm opacity-70">
          <span>👥 0</span>
        </div>
      </div>

      {/* Course Title Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          {course.title}
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-4 border-b border-base-300 pb-4">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "description" 
              ? "bg-neutral text-neutral-content" 
              : "hover:bg-base-200"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "courses" 
              ? "bg-neutral text-neutral-content" 
              : "hover:bg-base-200"
          }`}
        >
          All Courses
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "announcements" 
              ? "bg-neutral text-neutral-content" 
              : "hover:bg-base-200"
          }`}
        >
          Announcements
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Batch
          </button>
          <button className="btn btn-neutral btn-sm">
            New
          </button>
        </div>
      </div>

      {/* No Plans Available Alert */}
      <div className="alert alert-warning">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span>No plans available currently!</span>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Course Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* This Batch Includes */}
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-6">This Batch Includes</h2>
              
              <div className="space-y-4">
                {/* Course Duration */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">📅</span>
                  </div>
                  <div>
                    <p className="font-medium">Course Duration</p>
                    <p className="text-sm opacity-70">05 September 2025 - 04 Sep 2027</p>
                  </div>
                </div>

                {/* Validity */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium">Validity</p>
                    <p className="text-sm opacity-70">04 July 2027</p>
                  </div>
                </div>

                {/* Blended */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium">Blended (Live + Recorded)</p>
                  </div>
                </div>

                {/* Industry Projects */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium">5+ Industry-Relevant Projects</p>
                  </div>
                </div>

                {/* Exam Guidance */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium">Exam guidance at our PW Offline centers</p>
                  </div>
                </div>

                {/* Emotional Support */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium">One-to-one emotional well-being support by PW Prerna counselors</p>
                  </div>
                </div>

                {/* In-person Support */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium">In-person support and helpdesk at PW Offline centers</p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">📚</span>
                  </div>
                  <div>
                    <p className="font-medium">Subjects:</p>
                    <p className="text-sm opacity-70 mt-1">{course.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Course Image and Enrollment */}
        <div className="space-y-6">
          {/* Course Image */}
          <div className="card bg-base-100 shadow-md border border-base-300 overflow-hidden">
            <figure className="h-48">
              <img 
                src={course?.thumbnail?.secure_url || "/api/placeholder/400/200"} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm opacity-70">🌐 {course.createdBy}</span>
                <span className="badge badge-sm">English</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-green-600">FREE</span>
                </div>
                <button className="btn btn-primary">
                  ENROLL NOW
                </button>
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-70">Lectures</span>
                  <span className="font-medium">{course.numberOfLectures}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-70">Students Enrolled</span>
                  <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-70">Language</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection = ({ userData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="opacity-70 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Settings */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FiUser />
              Profile Information
            </h2>
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-sm opacity-70">Full Name</label>
                <p className="font-medium">{userData?.fullName || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm opacity-70">Email</label>
                <p className="font-medium">{userData?.email || "Not set"}</p>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link to="/user/editprofile" className="btn btn-neutral btn-sm gap-2">
                  <FiSettings size={16} />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FiLogOut />
              Security
            </h2>
            <p className="text-sm opacity-70 mt-2">Manage your password and account security</p>
            <div className="card-actions justify-end mt-4">
              <Link to="/changepassword" className="btn btn-neutral btn-sm gap-2">
                <FiLogOut size={16} />
                Change Password
              </Link>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FiTrendingUp />
              Subscription
            </h2>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Status:{" "}
                    <span className={`badge ${userData?.subscription?.status === "active" ? "badge-success" : "badge-warning"}`}>
                      {userData?.subscription?.status || "inactive"}
                    </span>
                  </p>
                  {userData?.subscription?.id && (
                    <p className="text-sm opacity-70 mt-1">ID: {userData.subscription.id}</p>
                  )}
                </div>
                {userData?.subscription?.status !== "active" && (
                  <Link to="/checkout" className="btn btn-neutral btn-sm">
                    Subscribe Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
