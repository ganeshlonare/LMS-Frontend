import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <>
      {/* Modern footer */}
      <footer className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4">LMS</h2>
                <p className="text-white/80 leading-relaxed">
                  Transform your career with expert-led courses and modern learning experiences designed for success.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" 
                  href="#" 
                  aria-label="Facebook"
                >
                  <BsFacebook className="w-5 h-5" />
                </a>
                <a 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" 
                  href="#" 
                  aria-label="Instagram"
                >
                  <BsInstagram className="w-5 h-5" />
                </a>
                <a 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" 
                  href="#" 
                  aria-label="Twitter"
                >
                  <BsTwitter className="w-5 h-5" />
                </a>
                <a 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" 
                  href="#" 
                  aria-label="LinkedIn"
                >
                  <BsLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-6 text-xl">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-white/80 hover:text-white transition-colors flex items-center gap-2" to="/courses">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link className="text-white/80 hover:text-white transition-colors flex items-center gap-2" to="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="text-white/80 hover:text-white transition-colors flex items-center gap-2" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-6 text-xl">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a className="text-white/80 hover:text-white transition-colors" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="text-white/80 hover:text-white transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-white/80 hover:text-white transition-colors" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-6 text-xl">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">support@lms.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-white/60 mt-1" />
                  <span className="text-white/80">
                    123 Learning Street<br />
                    Education City, EC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © {year} LMS. All rights reserved.
              </p>
              <p className="text-white/60 text-sm">
                Built with ❤️ for learners worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
