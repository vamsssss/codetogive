import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegistrationPage.css";

const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "", // New field for user type
    uenNumber: "", // New field for UEN number
    peopleServed: "", // New field for number of people served (for beneficiaries)
    contactNumber: "", // New field for contact number
    address: "", // New field for address
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registering with", form);

    // Navigate to /full-profile and pass the form data as state
    navigate("/full-profile", { state: form });
  };

  return (
    <div className="fullscreen-container">
      <div className="registration-box">
        <h2>Register</h2>
        <form class="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Beneficiary or Looking to Donate Food?</label>
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select type of Organisation
              </option>
              <option value="foodDonor">Food Donor/Restaurant Establishment</option>
              <option value="beneficiary">Beneficiary</option>
            </select>
          </div>
          <div className="form-group">
            <label>Company UEN Number</label>
            <input
              type="text"
              name="uenNumber"
              value={form.uenNumber}
              onChange={handleChange}
              required
            />
          </div>
          {form.userType === "beneficiary" && (
            <div className="form-group">
              <label>Size of Organisation</label>
              <input
                type="number"
                name="peopleServed"
                value={form.peopleServed}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="login-prompt">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
