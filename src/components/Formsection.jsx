import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Formsection = ({ onClose }) => {
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoader, setformLoader] = useState(false);
  const [design, setdesign] = useState(false);
  const [page, setPage] = useState(1);
  const [forward, setForward] = useState(false);
  const [inputForm, setInputForm] = useState({});

  const FIELDS_PER_PAGE = 6;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    validateFields();
  }, [inputForm, page]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://staging.questprotocol.xyz/api/v2/entities/e-b66bca24-f6ce-4489-b2e9-e24a90e04877/campaigns/c-14d4f959-5999-4308-af48-37549b89eec7",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            apikey: "k-8f7aa4ea-a0c7-42ac-a821-a342d21887fe",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTFhODJlYjQ1LTdmMjAtNDM0ZC1hODUxLWUyNTExOWIwMjE0MCIsImlhdCI6MTcxOTU5NzQ4MiwiZXhwIjoxNzIwMjAyMjgyfQ.QnFUFe_pllXj3eOupIZ6yfKR95m9VNAhSvMoFdKJWlY",
            userid: "u-1a82eb45-7f20-434d-a851-e25119b02140",
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFormFields(data.data.actions);
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, field) => {
    setInputForm({
      ...inputForm,
      [field.title]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformLoader(true);
    try {
      const formattedActions = formFields.map((field) => ({
        actionId: field.actionId,
        answers: [inputForm[field.title] || ""],
      }));

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          apikey: "k-8f7aa4ea-a0c7-42ac-a821-a342d21887fe",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTFhODJlYjQ1LTdmMjAtNDM0ZC1hODUxLWUyNTExOWIwMjE0MCIsImlhdCI6MTcxOTU5NzQ4MiwiZXhwIjoxNzIwMjAyMjgyfQ.QnFUFe_pllXj3eOupIZ6yfKR95m9VNAhSvMoFdKJWlY",
          userid: "u-1a82eb45-7f20-434d-a851-e25119b02140",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          campaignVariationId: "cv-d9d30363-2ce8-4793-a7b3-ab34eccdbd71",
          actions: formattedActions,
        }),
      };

      const response = await fetch(
        "https://staging.questprotocol.xyz/api/v2/entities/e-b66bca24-f6ce-4489-b2e9-e24a90e04877/campaigns/c-14d4f959-5999-4308-af48-37549b89eec7/verify",
        options
      );

      const result = await response.json();
      // console.log(result); 
      if (result.success) {
        alert("Form Submitted successfully");
        onClose();
      } else {
        alert("Form submission failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setformLoader(false);
      setInputForm({});
    }
  };
  const validateFields = () => {
    const currentFields = formFields.slice(
      (page - 1) * FIELDS_PER_PAGE,
      page * FIELDS_PER_PAGE
    );
    const isValid = currentFields.every((field) => {
      if (field.isRequired) {
        return inputForm[field.title] && inputForm[field.title].trim() !== "";
      }
      return true; 
    });
    setForward(isValid);
  };

  const renderField = (field) => {
    switch (field.actionType) {
      case "USER_INPUT_TEXT":
      case "USER_INPUT_EMAIL":
      case "USER_INPUT_NUMBER":
        return (
          <input
            type={
              field.actionType === "USER_INPUT_EMAIL"
                ? "email"
                : field.actionType === "USER_INPUT_NUMBER"
                ? "number"
                : "text"
            }
            placeholder={field.title}
            value={inputForm[field.title] || ""}
            onChange={(e) => handleChange(e, field)}
            className="input-field border border-gray-300 rounded-lg w-full p-2.5 text-sm"
            required
          />
        );
      case "USER_INPUT_SINGLE_CHOICE":
        return (
          <select
            value={inputForm[field.title] || ""}
            onChange={(e) => handleChange(e, field)}
            className="input-field border border-gray-300 rounded-lg w-full p-2.5 text-sm"
            required
          >
            <option value="">Select {field.title}</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const renderFields = () => {
    const startIndex = (page - 1) * FIELDS_PER_PAGE;
    const endIndex = page * FIELDS_PER_PAGE;
    return formFields.slice(startIndex, endIndex).map((field) => (
      <div key={field.actionId} className="form-field mb-4">
        <label
          htmlFor={field.title}
          className="form-label block mb-2 text-sm font-medium text-gray-700"
        >
          {field.title}:
        </label>
        {renderField(field)}
      </div>
    ));
  };

  // const handleNext = () => setPage(page + 1);
  const handleNext = () => {
    const currentFields = formFields.slice(
      (page - 1) * FIELDS_PER_PAGE,
      page * FIELDS_PER_PAGE
    );
    const isValid = currentFields.every((field) => {
      if (field.isRequired) {
        return inputForm[field.title] && inputForm[field.title].trim() !== "";
      }
      return true;
    });

    if (isValid) {
      setPage(page + 1);
    } else {
      alert("Please fill out all required fields before proceeding.");
    }
  };

  const handleBack = () => setPage(page - 1);
  const handleClose = () => {
    setdesign(true);
    setTimeout(onClose, 500);
  };

  const totalPages = Math.ceil(formFields.length / FIELDS_PER_PAGE);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start overflow-y-auto">
      <div
        className={`bg-white text-gray-800 w-full max-w-md p-6 h-full overflow-y-auto ${
          design ? "animate-slide-out" : "animate-slide-in"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-600">
            Connect With Sales
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        {loading ? (
          <p className="text-center">Loading form fields...</p>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <span
                  key={i}
                  className={`${
                    page === i + 1
                      ? "text-purple-600 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  Page {i + 1}
                </span>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderFields()}

              <div className="flex justify-between mt-6">
                {page > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    <FaArrowLeft className="inline mr-2" /> Back
                  </button>
                )}
                {page < totalPages ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`bg-purple-600 text-white px-4 py-2 rounded ${
                      !forward
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-purple-700"
                    }`}
                    disabled={!forward}
                  >
                    Next <FaArrowRight className="inline ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    disabled={formLoader || !forward}
                  >
                    {formLoader ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
