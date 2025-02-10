import React, { useState } from "react";
import Modal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
import Spinner from "@/utils/Spinner";
import ErrorText from "@/utils/ErrorText";
import FormRenderer from "@/utils/FormRenderer";
import { useParams } from "react-router-dom";
import UserInformation from "../UserInformation";
import { X } from "lucide-react";

const EventFeedbackUserView = () => {
  const { formId } = useParams();
  const queryClient = useQueryClient();

  const { data: formDetails, isLoading, error } = useFetchFormById(formId);
  const { mutate: submitResponse, isPending } = useSubmitResponse();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    emailAddress: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <ErrorText message="Failed to load the form. Please try again later." />
    );
  if (!formDetails) return <ErrorText message="Event form not found." />;

  const handleUserInfoUpdate = (field, values) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, [field]: values }));
  };

  const handleSubmit = (responseData, resetForm) => {
    const combinedData = { ...userInfo, ...responseData };
    if (!combinedData || Object.keys(combinedData).length === 0) {
      alert("Error: Event form submission is empty.");
      return;
    }

    submitResponse(
      { formId, formData: combinedData, formDetails },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["form", formId]);
          queryClient.invalidateQueries(["formEvents"]);
          resetForm();
          setIsModalOpen(true);
        },
        onError: () => {
          toast.error("Failed to submit the form. Please try again.", {
            position: "top-center",
            autoClose: 3000,
          });
        },
      }
    );
  };

  return (
    <div className="flex mt-[3rem] px-6 md:px-8 lg:px-12 sm:px-0">
      <div className="w-full">
        {/* User Information Section */}
        <div>
          <UserInformation onUpdate={handleUserInfoUpdate} />
        </div>

        {/* Event Form */}
        <div className="mb-6">
          <FormRenderer
            formFields={formDetails.fields || []}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
          />
        </div>

        {/* React Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg relative mx-auto mt-[10%]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <button
            className="absolute top-2 right-2 py-2 mb-6 text-gray-500 hover:text-black focus:outline-none"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={24} />
          </button>
          <p className="text-center py-4 text-gray-700">
            Your response has been submitted successfully!
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default EventFeedbackUserView;
