import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
import Spinner from "@/utils/Spinner";
import ErrorText from "@/utils/ErrorText";
import FormRenderer from "@/utils/FormRenderer";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserInformation from "../UserInformation";
import Modal from "@/utils/Modal";

const FeedbackUserView = () => {
  const { formId } = useParams();
  const queryClient = useQueryClient();

  const { data: formDetails, isLoading, error } = useFetchFormById(formId);
  const { mutate: submitResponse, isPending } = useSubmitResponse();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    emailAdress: "",
  });

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <ErrorText message="Failed to load the form. Please try again later." />
    );
  if (!formDetails) return <ErrorText message="Feedback form not found." />;

  const handleUserInfoUpdate = (field, value) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const handleSubmit = (responseData, resetForm) => {
    const combinedData = { ...userInfo, ...responseData };
    if (!combinedData || Object.keys(combinedData).length === 0) {
      alert("Error: Feedback form submission is empty.");
      return;
    }
    submitResponse(
      { formId, formData: combinedData, formDetails },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["form", formId]);
          queryClient.invalidateQueries(["formEvents"]);
          resetForm();
          setShowModal(true);
        },
        onError: () => {
          toast.error("Failed to submit the form. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
      }
    );
  };

  return (
    <div className="flex mt-[3rem] px-6 md:px-8 lg:px-12 sm:px-0">
      <div className="w-full">
        {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          {formDetails.title}
        </h1> */}

        {/* User Information Section */}
        <div className="">
          <UserInformation onUpdate={handleUserInfoUpdate} />
        </div>

        {/* Feedback Form */}
        <div className="mb-6">
          <FormRenderer
            formFields={formDetails.fields || []}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
          />
        </div>

        {/* Glass-like Modal on Successful Submission */}
        {showModal && (
          <Modal
            message="Your response has been submitted successfully!"
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackUserView;

// import { useQueryClient } from "@tanstack/react-query";
// import { toast, ToastContainer } from "react-toastify";
// import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
// import Spinner from "@/utils/Spinner";
// import ErrorText from "@/utils/ErrorText";
// import FormRenderer from "@/utils/FormRenderer";
// import React from "react";
// import { useParams } from "react-router-dom";
// import ReturnBack from "@/components/ReturnBack/ReturnBack";

// const FeedbackUserView = () => {
//   const { formId } = useParams();
//   const queryClient = useQueryClient();

//   const { data: formDetails, isLoading, error } = useFetchFormById(formId);
//   const { mutate: submitResponse, isPending } = useSubmitResponse();

//   if (isLoading) return <Spinner />;
//   if (error)
//     return (
//       <ErrorText message="Failed to load the form. Please try again later." />
//     );
//   if (!formDetails) return <ErrorText message="Feedback form not found." />;

//   const handleSubmit = (responseData, resetForm) => {
//     if (!responseData || Object.keys(responseData).length === 0) {
//       alert("Error: Feedback form submission is empty.");
//       return;
//     }
//     submitResponse(
//       { formId, formData: responseData, formDetails },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["form", formId]);
//           queryClient.invalidateQueries(["formEvents"]);
//           resetForm();
//           // success toast
//           toast.success("Form submitted successfully!", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         },
//         onError: () => {
//           // fail toast
//           toast.error("Failed to submit the form. Please try again.", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         },
//       }
//     );
//   };

//   return (
//     <div className="user-form-container">
//       <h1 className="user-form-title">{formDetails.title}</h1>
//       <FormRenderer
//         formFields={formDetails.fields || []}
//         onSubmit={handleSubmit}
//         isSubmitting={isPending}
//       />
//       <ReturnBack />
//       <ToastContainer />
//     </div>
//   );
// };

// export default FeedbackUserView;

// import { useQueryClient } from "@tanstack/react-query";
// import { toast, ToastContainer } from "react-toastify";
// import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
// import Spinner from "@/utils/Spinner";
// import ErrorText from "@/utils/ErrorText";
// import FormRenderer from "@/utils/FormRenderer";
// import React from "react";
// import { useParams } from "react-router-dom";
// import ReturnBack from "@/components/ReturnBack/ReturnBack";

// const FeedbackUserView = () => {
//   const { formId } = useParams();
//   const queryClient = useQueryClient();

//   const { data: formDetails, isLoading, error } = useFetchFormById(formId);
//   const { mutate: submitResponse, isPending } = useSubmitResponse();

//   if (isLoading) return <Spinner />;
//   if (error)
//     return (
//       <ErrorText message="Failed to load the form. Please try again later." />
//     );
//   if (!formDetails) return <ErrorText message="Feedback form not found." />;

//   const handleSubmit = (responseData, resetForm) => {
//     if (!responseData || Object.keys(responseData).length === 0) {
//       alert("Error: Feedback form submission is empty.");
//       return;
//     }
//     submitResponse(
//       { formId, formData: responseData, formDetails },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["form", formId]);
//           queryClient.invalidateQueries(["formEvents"]);
//           resetForm();
//           toast.success("Form submitted successfully!", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         },
//         onError: () => {
//           toast.error("Failed to submit the form. Please try again.", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         },
//       }
//     );
//   };

//   return (
//     <div className="max-w-6xl mt-[5rem] mx-auto px-4 md:px-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
//         {formDetails.title}
//       </h1>
//       <FormRenderer
//         formFields={formDetails.fields || []}
//         onSubmit={handleSubmit}
//         isSubmitting={isPending}
//       />
//       <div className="mt-6 flex justify-center">
//         <ReturnBack />
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default FeedbackUserView;

// WITH FORM STYLES
// import { useQueryClient } from "@tanstack/react-query";
// import { toast, ToastContainer } from "react-toastify";
// import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
// import Spinner from "@/utils/Spinner";
// import ErrorText from "@/utils/ErrorText";
// import FormRenderer from "@/utils/FormRenderer";
// import React from "react";
// import { useParams } from "react-router-dom";
// import ReturnBack from "@/components/ReturnBack/ReturnBack";
// import { FormStyles } from "@/utils/FormStyles";

// const FeedbackUserView = () => {
//   const { formId } = useParams();
//   const queryClient = useQueryClient();

//   const { data: formDetails, isLoading, error } = useFetchFormById(formId);
//   const { mutate: submitResponse, isPending } = useSubmitResponse();

//   if (isLoading) return <Spinner />;
//   if (error)
//     return (
//       <ErrorText message="Failed to load the form. Please try again later." />
//     );
//   if (!formDetails) return <ErrorText message="Feedback form not found." />;

//   const handleSubmit = (responseData, resetForm) => {
//     if (!responseData || Object.keys(responseData).length === 0) {
//       alert("Error: Feedback form submission is empty.");
//       return;
//     }
//     submitResponse(
//       { formId, formData: responseData, formDetails },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["form", formId]);
//           queryClient.invalidateQueries(["formEvents"]);
//           resetForm();
//           toast.success("Form submitted successfully!", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         },
//         onError: () => {
//           toast.error("Failed to submit the form. Please try again.", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         },
//       }
//     );
//   };

//   return (
//     <div className={FormStyles.feedback.container}>
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
//         {formDetails.title}
//       </h1>
//       <FormRenderer
//         formFields={formDetails.fields || []}
//         onSubmit={handleSubmit}
//         isSubmitting={isPending}
//         styles={FormStyles.feedback}
//       />
//       <div className="mt-6 flex justify-center">
//         <ReturnBack />
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default FeedbackUserView;
