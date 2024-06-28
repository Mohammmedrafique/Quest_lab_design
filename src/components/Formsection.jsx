import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Formsection = ({ onClose }) => {
  const [Form, setForm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoader, setformLoader] = useState(false);
  const [design, setdesign] = useState(false);
  const [faceone, setfaceone] = useState(1);
  const [forward, setforward] = useState(true);
  const [inputform, setinputform] = useState({
    "First name": "hello",
    "Last name": "world",
    "Email address": "helloworld@gmail.com",
    Company: "Masai",
    "Phone number": "1234567890",
    "Job Title": "Software Engineer",
    Industry: "IT ",
    "Number of Employees": "20",
    Country: "India",
  });

  function getData() {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: "k-8f7aa4ea-a0c7-42ac-a821-a342d21887fe",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTM1ZTFhY2M0LTlmNGYtNGY3OS1hZGMxLWUyZTg0ZjMyZDNlOSIsImlhdCI6MTcxODk4MDM5MiwiZXhwIjoxNzE5NTg1MTkyfQ.2lCdj1a15GNsjGephnhb2VegIv7O1lz6h-6C4_uHfIk",
        userid: "u-35e1acc4-9f4f-4f79-adc1-e2e84f32d3e9",
      },
    };

    fetch(
      "https://staging.questprotocol.xyz/api/v2/entities/e-b66bca24-f6ce-4489-b2e9-e24a90e04877/campaigns/c-14d4f959-5999-4308-af48-37549b89eec7",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setForm(response.data.actions);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    validateFields(faceone === 1 ? faceone1Fields : faceone2Fields);
  }, [inputform, faceone]);

  const handleChange = (e, title) => {
    setinputform({
      ...inputform,
      [title]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setformLoader(true);
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        apikey: "k-8f7aa4ea-a0c7-42ac-a821-a342d21887fe",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTM1ZTFhY2M0LTlmNGYtNGY3OS1hZGMxLWUyZTg0ZjMyZDNlOSIsImlhdCI6MTcxODk4MDM5MiwiZXhwIjoxNzE5NTg1MTkyfQ.2lCdj1a15GNsjGephnhb2VegIv7O1lz6h-6C4_uHfIk",
        userid: "u-35e1acc4-9f4f-4f79-adc1-e2e84f32d3e9",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        actions: [
          {
            actionId: "ca-336fef44-9d0f-42dc-8493-15a91ea36013",
            answers: [inputform],
          },
        ],
        campaignVariationId: "cv-d9d30363-2ce8-4793-a7b3-ab34eccdbd71",
      }),
    };

    fetch(
      "https://staging.questprotocol.xyz/api/v2/entities/e-b66bca24-f6ce-4489-b2e9-e24a90e04877/campaigns/c-14d4f959-5999-4308-af48-37549b89eec7/verify",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        alert("Form Submitted successfully");
        setformLoader(false);
        setinputform({});
        onClose();
      })
      .catch((err) => {
        setformLoader(false);
        console.error(err);
      });
  };

  const handleNext = () => {
    setfaceone(2);
  };

  const handleBack = () => {
    setfaceone(1);
  };

  const handleClose = () => {
    setdesign(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const faceone1Fields = [
    "First name",
    "Last name",
    "Email address",
    "Company",
    "Phone number",
    "Job Title",
  ];
  const faceone2Fields = ["Industry", "Number of Employees", "Country"];

  const validateFields = (fields) => {
    const isValid = fields.every(
      (field) => inputform[field] && inputform[field].trim() !== ""
    );
    setforward(isValid);
  };

  const renderFields = (fields) => {
    return fields.map((fieldTitle) => {
      const fieldData = Form.find((el) => el.title === fieldTitle);
      if (!fieldData) return null;

      return (
        <div key={fieldData.id} className="form-field mb-4">
          <label
            htmlFor={fieldData.title}
            className="form-label block mb-2 text-sm font-medium text-gray-700"
          >
            {fieldData.title}:
          </label>
          <input
            type={
              fieldData.title === "Email address"
                ? "email"
                : fieldData.title === "Phone number"
                ? "tel"
                : "text"
            }
            placeholder={fieldData.title}
            value={inputform[fieldData.title] || ""}
            onChange={(e) => handleChange(e, fieldData.title)}
            className="input-field border border-gray-300 rounded-lg w-full p-2.5 text-sm"
            required
          />
        </div>
      );
    });
  };

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
          <p className="text-center">Getting form from API...</p>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <span
                className={`${
                  faceone === 1 ? "text-purple-600 font-bold" : "text-gray-400"
                }`}
              >
                YOUR DETAILS
              </span>
              <span
                className={`${
                  faceone === 2 ? "text-purple-600 font-bold" : "text-gray-400"
                }`}
              >
                YOUR BUSINESS
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {faceone === 1 && renderFields(faceone1Fields)}
              {faceone === 2 && renderFields(faceone2Fields)}

              <div className="flex justify-between mt-6">
                {faceone === 1 && (
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
                )}
                {faceone === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      <FaArrowLeft className="inline mr-2" /> Back
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                      disabled={formLoader}
                    >
                      {formLoader ? "Submitting..." : "Submit"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
