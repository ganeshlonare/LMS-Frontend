import React from "react";
import Layout from "../Layout/Layout";
import { FiUsers, FiAward, FiTrendingUp, FiBook, FiClock, FiStar, FiTarget, FiHeart, FiGlobe, FiCheckCircle, FiZap, FiShield, FiHeadphones, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: <FiUsers className="w-8 h-8" />, value: "50,000+", label: "Active Students", color: "text-blue-600" },
    { icon: <FiAward className="w-8 h-8" />, value: "500+", label: "Expert Instructors", color: "text-green-600" },
    { icon: <FiBook className="w-8 h-8" />, value: "1000+", label: "Courses Available", color: "text-purple-600" },
    { icon: <FiTrendingUp className="w-8 h-8" />, value: "95%", label: "Success Rate", color: "text-orange-600" }
  ];

  const features = [
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
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former Google engineer with 15+ years in tech education.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Ex-Amazon architect specializing in scalable learning platforms.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      description: "Educational psychologist ensuring effective learning methodologies.",
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "David Kim",
      role: "Lead Instructor",
      description: "Full-stack developer teaching React, Node.js, and modern web technologies.",
      image: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const testimonials = [
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
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-base-200">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 bg-accent/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-medium text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  About Our Platform
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Empowering Learners
                    <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Worldwide
                    </span>
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed">
                    We're on a mission to democratize quality education, making world-class learning accessible to everyone, everywhere. Our platform connects passionate learners with expert instructors to create transformative educational experiences.
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-white/70">Active Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">1000+</div>
                    <div className="text-white/70">Courses</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link to="/courses" className="btn btn-primary btn-lg">
                    Explore Courses
                  </Link>
                  <Link to="/contact" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-slate-800">
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 text-center">
                      <FiUsers className="w-12 h-12 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm opacity-80">Students</div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-6 text-center">
                      <FiAward className="w-12 h-12 text-secondary mx-auto mb-3" />
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm opacity-80">Instructors</div>
                    </div>
                    <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl p-6 text-center">
                      <FiBook className="w-12 h-12 text-accent mx-auto mb-3" />
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-sm opacity-80">Courses</div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 text-center">
                      <FiTrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm opacity-80">Success</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Team Section */}
        <section className="py-20 bg-base-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-base-content mb-4">
                Meet Our Expert Team
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                Passionate educators and industry professionals dedicated to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 group">
                  <div className="card-body text-center">
                    <div className="avatar mx-auto mb-4">
                      <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 group-hover:ring-4 transition-all">
                        <img src={member.image} alt={member.name} />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-base-content/70 text-sm leading-relaxed">{member.description}</p>
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

      </div>
    </Layout>
  );
};

export default About;
