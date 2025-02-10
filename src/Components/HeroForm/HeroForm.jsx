import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { X } from "lucide-react";

const HeroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const submitHeroForm = useMutation({
    mutationFn: async (data) => {
      const submissionData = {
        id: Math.random().toString(36).substr(2, 5),
        formId: "feedback",
        formType: "feedback",
        submissionDate: new Date().toISOString(),
        status: "unresolved",
        data: Object.entries(data).map(([key, value]) => ({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          type: key === "message" ? "textarea" : "text",
          value: value,
        })),
      };

      return axios.post(`${BASE_URL}/responses`, submissionData);
    },
    onSuccess: () => {
      setFormData({ name: "", email: "", message: "" });
      setIsModalOpen(true); // Open the modal on successful submission
      queryClient.invalidateQueries("responses");

      // Automatically close the modal after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    },
    onError: () => {
      alert(
        "Error submitting form. Please ensure all fields are filled correctly."
      );
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHeroForm.mutate(formData);
  };

  return (
    <section className="h-auto bg-bulb-lightBlue dark:bg-[var(--background)] text-[var(--text)]">
      <div className="flex items-center justify-center font-roboto">
        <div className="flex flex-col md:flex-row w-full px-[8%]">
          <div className="md:w-1/2 items-center my-auto">
            <h1 className="text-[35px] pl-0 md:pl-6 lg:pl-6 font-bold mb-2 text-[var(--text)]">
              Provide Your Feedback
            </h1>
            <p className="mb-3 text-[var(--text)] text-[17px]">
              Your opinion matters to us. Share your thoughts with us.
            </p>
          </div>
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-[15px] pt-[10px] font-medium text-[var(--text)]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-[#252526] rounded-[8px] shadow-sm py-2 px-3 focus:outline-none focus:ring-bulb-blue focus:border-bulb-blue sm:text-sm text-[var(--text)]"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-[15px] font-medium text-[var(--text)]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-[#252526] rounded-[8px] shadow-sm py-2 px-3 focus:outline-none focus:ring-bulb-blue focus:border-bulb-blue sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-[15px] font-medium text-[var(--text)]"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-[#252526] rounded-[8px] shadow-sm py-2 px-3 focus:outline-none focus:ring-bulb-blue focus:border-bulb-blue sm:text-sm"
                  rows={3}
                  style={{ resize: "none", overflow: "hidden" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  placeholder="Write your message..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-bulb-yellow text-[var(--background)] py-2 px-8 rounded-[10px] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50"
                  disabled={submitHeroForm.isLoading}
                >
                  {submitHeroForm.isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg relative">
            <button
              className="absolute top-0 right-4 py-3 mb-6 text-gray-500 hover:text-black focus:outline-none"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            <p className="text-center py-4 text-gray-700">
              Your response has been submitted successfully.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroForm;

// import React, { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { BASE_URL } from "../../constants/BASE_URL";

// const HeroForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     submissionDate: "",
//   });

//   const queryClient = useQueryClient();

//   const submitHeroForm = useMutation({
//     mutationFn: async (data) => {
//       const submissionData = {
//         ...data,
//         submissionDate: new Date().toISOString(),
//       };
//       return axios.post(`${BASE_URL}/responses`, submissionData);
//     },
//     onSuccess: () => {
//       setFormData({ name: "", email: "", message: "", submissionDate: "" });
//       toast.success("Your response has been submitted successfully");
//       queryClient.invalidateQueries("feedback");
//     },
//     onError: (error) => {
//       toast.error(
//         "Error submitting form. Please ensure all fields are unique."
//       );
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormData((prevState) => ({
//       ...prevState,
//       submissionDate: new Date().toISOString(),
//     }));
//     submitHeroForm.mutate(formData);
//   };

//   return (
//     <section className="h-auto bg-bulb-lightBlue dark:bg-[var(--background)] text-[var(--text)]">
//       <div className="flex items-center justify-center font-roboto">
//         <div className="flex flex-col md:flex-row w-full px-[8%]">
//           <div className="md:w-1/2 items-center my-auto">
//             <h1 className="text-[35px] pl-0 md:pl-6 lg:pl-6 font-bold mb-2  text-[var(--text)]">
//               Provide Your Feedback
//             </h1>
//             <p className="mb-3 text-[var(--text)] text-[17px]">
//               Your opinion matters to us. Share your thoughts with us.
//             </p>
//           </div>
//           <div className="md:w-1/2">
//             <form onSubmit={handleSubmit} className="flex flex-col">
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-[15px] pt-[10px] font-medium text-[var(--text)]"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-[#252526] rounded-[8px] shadow-sm py-2 px-3 focus:outline-none focus:ring-bulb-blue focus:border-bulb-blue sm:text-sm text-[var(--text)]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-[15px] font-medium text-[var(--text)]"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-[#252526] rounded-[8px] shadow-sm py-2 px-3 focus:outline-none focus:ring-bulb-blue focus:border-bulb-blue sm:text-sm"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="message"
//                   className="block text-[15px] font-medium text-[var(--text)]"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-[#252526] rounded-[8px] shadow-sm py-2 px-3 focus:outline-none focus:ring-bulb-blue focus:border-bulb-blue sm:text-sm"
//                   rows={3}
//                   style={{ resize: "none", overflow: "hidden" }}
//                   onInput={(e) => {
//                     e.target.style.height = "auto";
//                     e.target.style.height = e.target.scrollHeight + "px";
//                   }}
//                   placeholder="Write your message..."
//                   required
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-bulb-yellow text-[var(--background)] py-2 px-8 rounded-[10px] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50"
//                   disabled={submitHeroForm.isLoading}
//                 >
//                   {submitHeroForm.isLoading ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} />
//     </section>
//   );
// };

// export default HeroForm;
