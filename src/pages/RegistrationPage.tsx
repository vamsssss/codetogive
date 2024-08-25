import React, { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../http";
import "./RegistrationPage.css";

const libraries = ["places"];

const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    uenNumber: "",
    peopleServed: "",
    contactNumber: "",
    address: "",
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const YOUR_API_KEY = "AIzaSyBAFDKKOMyejno9kqGkgjhOVwKG3B49n4U";

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setForm({ ...form, address: place.formatted_address || "" });
      });
    }
  }, [autocomplete, form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getLocationFromAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      if (data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Address not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registering with", form);

    try {
      const latlong = await getLocationFromAddress(form.address);
      console.log("latlong converted from form.address", latlong);
      await createUser({
        email: form.email,
        //name: form.name,
        role: form.userType,
        size: form.peopleServed ? Number(form.peopleServed) : undefined,
        password: form.password,
        tags: [],
        location: latlong,
      });
      navigate("/login");
    } catch (error) {
      console.error("There was an error registering the user:", error);
      // Handle error appropriately
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${YOUR_API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results[0]) {
                const address = data.results[0].formatted_address;
                setForm({ ...form, address });
                if (addressInputRef.current) {
                  addressInputRef.current.value = address;
                }
              }
            })
            .catch((error) => console.error("Error fetching address:", error));
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={libraries}>
      <div className="register-fullscreen-container">
        <div className="registration-box">
          <h2 className="reg-h2">Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="userType">
                Beneficiary or Looking to Donate Food?
              </label>
              <select
                id="userType"
                name="userType"
                value={form.userType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select type of Organisation
                </option>
                <option value="donor">
                  Food Donor/Restaurant Establishment
                </option>
                <option value="beneficiary">Beneficiary</option>
              </select>
            </div>
            <div className="register-form-group">
              <label htmlFor="uenNumber">Company UEN Number</label>
              <input
                id="uenNumber"
                type="text"
                name="uenNumber"
                value={form.uenNumber}
                onChange={handleChange}
                required
              />
            </div>
            {form.userType === "beneficiary" && (
              <div className="register-form-group">
                <label htmlFor="peopleServed">Size of Organisation</label>
                <input
                  id="peopleServed"
                  type="number"
                  name="peopleServed"
                  value={form.peopleServed}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="register-form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="address">Address</label>
              <Autocomplete
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onPlaceChanged={() => {}}
              >
                <input
                  id="address"
                  type="text"
                  name="address"
                  ref={addressInputRef}
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter address"
                />
              </Autocomplete>
              <span className="use-my-location" onClick={handleUseMyLocation}>
                Use My Location
              </span>
            </div>
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
          <div className="login-prompt">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default RegistrationPage;
