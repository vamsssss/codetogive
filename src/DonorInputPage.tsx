import React, { useState, ChangeEvent, FormEvent } from "react";
import "./DonorInputPage.css";

const DonorInputPage: React.FC = () => {
  const [form, setForm] = useState({
    organization: "",
    availableFood: "",
    tags: [] as string[], // Explicitly typing tags as a string array
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      tags: value.split(",").map((tag) => tag.trim()), // Split and trim tags
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting donor data:", form);
    // Add logic to submit form data to your backend or state management
  };

  return (
    <div className="fullscreen-container">
      <div className="input-box">
        <h2 className="don-h2">Donation Information</h2>
        <form className="donor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Available Food</label>
            <input
              type="text"
              name="availableFood"
              value={form.availableFood}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={form.tags.join(", ")} // Join tags array into a string
              onChange={handleTagChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorInputPage;
