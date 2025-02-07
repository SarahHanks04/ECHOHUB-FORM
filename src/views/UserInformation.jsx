import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

// Validation
const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required."),
  lastName: Yup.string().trim().required("Last name is required."),
  contact: Yup.string()
    .trim()
    .matches(/^\d+$/, "Contact must be numbers only.")
    .required("Contact is required."),
  emailAdress: Yup.string()
    .trim()
    .email("Invalid email format.")
    .required("Email is required."),
});

const UserInformation = ({ onUpdate }) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        contact: "",
        emailAdress: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onUpdate(values);
        resetForm();
      }}
    >
      {({ touched, errors, values }) => (
        <Form>
          <motion.div
            className="w-full mx-auto py-16 px-8 sm:px-0 md:px-10 lg:px-10 bg-bulb-lightBlue dark:bg-bulb-blue text-bulb-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Input Fields */}
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Contact", name: "contact" },
                { label: "Email Address", name: "emailAdress", type: "email" },
              ].map(({ label, name, type = "text" }) => (
                <motion.div
                  key={name}
                  className="flex flex-col"
                  variants={fieldVariants}
                >
                  <label
                    htmlFor={name}
                    className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium"
                  >
                    {label}
                  </label>
                  <Field
                    type={type}
                    name={name}
                    id={name}
                    className={`border rounded-[10px] p-2 w-full focus:outline-none text-black transition-all
                      ${
                        touched[name] && errors[name]
                          ? "border-red-500"
                          : touched[name] && !errors[name]
                          ? "border-bulb-success"
                          : "border-gray-600"
                      }`}
                  />
                  <ErrorMessage
                    name={name}
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </motion.div>
              ))}
            </div>

            {/* Submit Button
            <button
              type="submit"
              className="mt-6 bg-bulb-blue text-white py-2 px-6 rounded-lg hover:bg-bulb-darkBlue transition"
            >
              Submit
            </button> */}
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default UserInformation;

// VERY CORRECT.I LOVE IT
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const fieldVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
// };

// const UserInformation = ({ onUpdate, clearFields }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     contact: "",
//     emailAdress: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Handle input change
//   const handleChange = (e, field) => {
//     const value = e.target.value;
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     onUpdate(field, value);

//     // Validate on change
//     validateField(field, value);
//   };

//   // Handle blur (touch event)
//   const handleBlur = (field) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//     validateField(field, formData[field]);
//   };

//   // Validate a single field
//   const validateField = (field, value) => {
//     let errorMessage = "";

//     if (!value.trim()) {
//       errorMessage = `${field.replace(/([A-Z])/g, " $1")} is required.`;
//     } else {
//       if (field === "contact" && !/^\d+$/.test(value)) {
//         errorMessage = "Contact must be numbers only.";
//       }
//       if (field === "emailAdress" && !/\S+@\S+\.\S+/.test(value)) {
//         errorMessage = "Invalid email format.";
//       }
//     }

//     setErrors((prev) => ({ ...prev, [field]: errorMessage }));
//   };

//   // Determine border color based on validation state
//   const getBorderColor = (field) => {
//     if (touched[field]) {
//       if (errors[field]) return "border-red-500";
//       if (formData[field].trim()) return "border-green-500";
//     }
//     return "border-gray-600";
//   };

//   // Clear input fields when form is submitted
//   React.useEffect(() => {
//     if (clearFields) {
//       setFormData({
//         firstName: "",
//         lastName: "",
//         contact: "",
//         emailAdress: "",
//       });
//       setErrors({});
//       setTouched({});
//     }
//   }, [clearFields]);

//   return (
//     <motion.div
//       className="w-full mx-auto px-8 sm:px-0 md:px-10 lg:px-10 bg-bulb-lightBlue dark:bg-bulb-blue dark:text-bulb-white"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* First Name */}
//         <motion.div className="flex flex-col" variants={fieldVariants}>
//           <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
//             First Name
//           </label>
//           <input
//             type="text"
//             className={`border rounded-[10px] p-2 w-full focus:outline-none text-black ${getBorderColor(
//               "firstName"
//             )}`}
//             value={formData.firstName}
//             onChange={(e) => handleChange(e, "firstName")}
//             onBlur={() => handleBlur("firstName")}
//           />
//           {errors.firstName && touched.firstName && (
//             <span className="text-red-500 text-sm">{errors.firstName}</span>
//           )}
//         </motion.div>

//         {/* Last Name */}
//         <motion.div className="flex flex-col" variants={fieldVariants}>
//           <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
//             Last Name
//           </label>
//           <input
//             type="text"
//             className={`border rounded-[10px] p-2 w-full focus:outline-none text-black ${getBorderColor(
//               "lastName"
//             )}`}
//             value={formData.lastName}
//             onChange={(e) => handleChange(e, "lastName")}
//             onBlur={() => handleBlur("lastName")}
//           />
//           {errors.lastName && touched.lastName && (
//             <span className="text-red-500 text-sm">{errors.lastName}</span>
//           )}
//         </motion.div>

//         {/* Contact */}
//         <motion.div className="flex flex-col" variants={fieldVariants}>
//           <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
//             Contact
//           </label>
//           <input
//             type="text"
//             className={`border rounded-[10px] p-2 w-full focus:outline-none text-black ${getBorderColor(
//               "contact"
//             )}`}
//             value={formData.contact}
//             onChange={(e) => handleChange(e, "contact")}
//             onBlur={() => handleBlur("contact")}
//           />
//           {errors.contact && touched.contact && (
//             <span className="text-red-500 text-sm">{errors.contact}</span>
//           )}
//         </motion.div>

//         {/* Email */}
//         <motion.div className="flex flex-col" variants={fieldVariants}>
//           <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
//             Email Address
//           </label>
//           <input
//             type="email"
//             className={`border rounded-[10px] p-2 w-full focus:outline-none text-black ${getBorderColor(
//               "emailAdress"
//             )}`}
//             value={formData.emailAdress}
//             onChange={(e) => handleChange(e, "emailAdress")}
//             onBlur={() => handleBlur("emailAdress")}
//           />
//           {errors.emailAdress && touched.emailAdress && (
//             <span className="text-red-500 text-sm">{errors.emailAdress}</span>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default UserInformation;
