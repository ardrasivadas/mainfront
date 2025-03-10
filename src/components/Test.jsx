import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://plant-identify.onrender.com/predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setPrediction(response.data);
    } catch (err) {
      setError("Error identifying the plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Plant Identifier</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Identifying..." : "Identify Plant"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {prediction && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="font-semibold">Prediction:</h3>
          <p><strong>Plant:</strong> {prediction.plant_name}</p>
          <p><strong>Confidence:</strong> {prediction.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default Test;
