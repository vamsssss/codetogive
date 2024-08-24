import React, { useState, ChangeEvent, FormEvent } from "react";
import "./DonorInputPage.css";

const DonorInputPage: React.FC = () => {
  const [form, setForm] = useState({
    organization: "",
    availableFood: "",
    tags: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting donor data:", form);
  };

  return (
    <div className="fullscreen-container"> {/* Add the class here */}
      <div className="input-box">
        <h2>Donor Information Input</h2>
        <form onSubmit={handleSubmit}>
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
              value={form.tags.join(", ")}
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
