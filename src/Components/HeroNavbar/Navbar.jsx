// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { User2, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activePage, setActivePage] = useState("Feedback Form");

//   const location = useLocation();

//   // Update header title based route
//   useEffect(() => {
//     const pathToTitle = {
//       "/form/complaint/complaint": "Complaint",
//       "/form/feedback/feedback": "Feedback",
//       "/admin/feedback/feedback": "Events",
//       "/admin/complaint/complaint": "Admin",
//     };

//     setActivePage(pathToTitle[location.pathname] || "Feedback Form");
//   }, [location.pathname]);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   // Framer Motion animations
//   const mobileMenuVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//     exit: {
//       opacity: 0,
//       y: -50,
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//   };

//   // Animation for the activePage text
//   const activePageVariants = {
//     hidden: { opacity: 0, pathLength: 0 },
//     visible: {
//       opacity: 1,
//       pathLength: 1,
//       transition: {
//         duration: 1,
//         ease: "easeInOut",
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   return (
//     <nav className="bg-bulb-white dark:bg-[var(--background)] text-[var(--text)] py-2 px-6 md:px-16 flex justify-between items-center relative">
//       {/* Dynamic Header with writing effect */}
//       <motion.header
//         className="text-2xl md:text-3xl font-bold dark:text-dark-text"
//         initial="hidden"
//         animate="visible"
//         variants={activePageVariants}
//       >
//         {Array.from(activePage).map((char, index) => (
//           <motion.span
//             key={index}
//             variants={activePageVariants}
//             style={{ display: "inline-block" }}
//           >
//             {char === " " ? "\u00A0" : char}
//           </motion.span>
//         ))}
//       </motion.header>

//       {/* Desktop Links */}
//       <div className="hidden md:flex items-center space-x-8 ml-auto">
//         {["Complaint", "Feedback", "Admin"].map((text, index) => (
//           <NavLink
//             key={index}
//             to={
//               text.toLowerCase() === "feedback"
//                 ? "admin/complaint/complaint"
//                 : text.toLowerCase() === "events"
//                 ? "/admin/feedback/feedback"
//                 : `form/${text.toLowerCase()}/${text.toLowerCase()}`
//             }
//             className={({ isActive }) =>
//               `text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
//                 isActive ? "text-bulb-yellow font-semibold" : ""
//               }`
//             }
//           >
//             {text}
//           </NavLink>
//         ))}
//         {/* Profile (Desktop) */}
//         <div className="hidden md:flex items-center space-x-12 ml-8">
//           <User2 className="w-6 h-6 text-[var(--text)] cursor-pointer" />
//         </div>
//       </div>

//       {/* Mobile Controls (Menu Button) */}
//       <div className="flex items-center space-x-20 md:hidden">
//         <button
//           onClick={toggleMenu}
//           className="text-2xl focus:outline-none"
//           aria-label="Toggle Menu"
//         >
//           {isMenuOpen ? (
//             <X size={26} className="text-[var(--text)]" />
//           ) : (
//             <Menu size={26} className="text-[var(--text)]" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu with Framer Motion */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="absolute top-16 left-0 w-full bg-bulb-blue text-bulb-white shadow-md flex flex-col space-y-4 py-4 px-6 text-lg z-50"
//             variants={mobileMenuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {["Complaint", "Feedback", "Admin"].map((text, index) => (
//               <NavLink
//                 key={index}
//                 to={
//                   text.toLowerCase() === "admin"
//                     ? "/admin/feedback"
//                     : `/${text.toLowerCase()}`
//                 }
//                 className={({ isActive }) =>
//                   `block py-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
//                     isActive ? "text-red-500 font-semibold" : ""
//                   }`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {text}
//               </NavLink>
//             ))}
//             {/* Mobile Profile */}
//             <div className="flex justify-center pt-3 border-t border-[var(--border)] mt-2">
//               <User2 className="w-6 h-6 text-[var(--text)] cursor-pointer" />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { User2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Feedback Form");

  const location = useLocation();

  // Update header title
  useEffect(() => {
    const pathToTitle = {
      "/form/complaint/complaint": "Complaint",
      "/form/feedback/feedback": "Event Form",
      "/": "Feedback",
      // "/admin/complaint/complaint": "Events Feedback",
      // "/admin/feedback/feedback": "Admin",
      "/admin/event/event": "Home",
    };

    setActivePage(pathToTitle[location.pathname] || "Feedback Form");
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Framer Motion animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Animation for the activePage text
  const activePageVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 bg-bulb-white dark:bg-[var(--background)] text-[var(--text)] py-2 px-6 md:px-16 flex justify-between items-center w-full z-50 mt-0 shadow-lg rounded-md">
      {/* Dynamic Header with writing effect */}
      <motion.header
        className="text-2xl md:text-3xl font-bold dark:text-dark-text"
        initial="hidden"
        animate="visible"
        variants={activePageVariants}
      >
        {Array.from(activePage).map((char, index) => (
          <motion.span
            key={index}
            variants={activePageVariants}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.header>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8 ml-auto">
        {[
          { text: "Home", to: "/" },
          { text: "Complaint", to: "/form/complaint/complaint" },
          { text: "Event", to: "/form/feedback/feedback" },
          {
            /* { text: "Feedback", to: "/form/feedback/feedback" }, */
          },
          {
            /* { text: "Admin", to: "/admin/feedback/feedback" }, */
          },
        ].map(({ text, to }, index) => (
          <NavLink
            key={index}
            to={to}
            className={({ isActive }) =>
              `text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
                isActive ? "text-bulb-yellow font-semibold" : ""
              }`
            }
          >
            {text}
          </NavLink>
        ))}
      </div>

      {/* Mobile Controls (Menu Button) */}
      <div className="flex items-center space-x-20 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X size={26} className="text-[var(--text)]" />
          ) : (
            <Menu size={26} className="text-[var(--text)]" />
          )}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-bulb-blue text-bulb-white shadow-md flex flex-col space-y-4 py-4 px-6 text-lg z-50"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {[
              {
                /* { text: "Complaint", to: "/form/complaint/complaint" },
              { text: "Feedback", to: "/form/feedback/feedback" },
              { text: "Event", to: "/admin/complaint/complaint" },
              { text: "Admin", to: "/admin/feedback/feedback" },
              { text: "Home", to: "/admin/event/event" }, */
              },
              { text: "Home", to: "/" },
              { text: "Complaint", to: "/form/complaint/complaint" },
              { text: "Event", to: "/form/feedback/feedback" },
            ].map(({ text, to }, index) => (
              <NavLink
                key={index}
                to={to}
                className={({ isActive }) =>
                  `block py-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
                    isActive
                      ? "text-bulb-yellow font-semibold"
                      : "text-bulb-white"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {text}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
