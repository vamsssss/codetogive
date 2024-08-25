import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "./DonorInputPage.css";

const libraries = ["places"];

interface FormState {
  organization: string;
  availableFood: string;
  tags: string[];
  address: string;
  pax: string;
}

const DonorInputPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    organization: "",
    availableFood: "",
    tags: [],
    address: "",
    pax: "",
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const YOUR_API_KEY = "AIzaSyBAFDKKOMyejno9kqGkgjhOVwKG3B49n4U"; // Replace with your actual API key

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setForm({ ...form, address: place.formatted_address || "" });
      });
    }
  }, [autocomplete, form]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitting donor data:", form);
    // Add logic to submit form data to your backend or state management
  };

  const handleLogout = (): void => {
    console.log("Logging out...");
    // Add your logout logic here
    navigate("/login"); // Redirect to login page
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${YOUR_API_KEY}`)
            .then(response => response.json())
            .then(data => {
              if (data.results[0]) {
                const address = data.results[0].formatted_address;
                setForm({ ...form, address });
                if (addressInputRef.current) {
                  addressInputRef.current.value = address;
                }
              }
            })
            .catch(error => console.error("Error fetching address:", error));
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={libraries}>
      <div className="donor-input-container">
        <div className="teal-section">
          <h2>Tell Us what you can donate here!</h2>
          <form onSubmit={handleSubmit}>
            <div className="donate-form-group">
              <label>Organization Name</label>
              <input
                type="text"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                required
              />
            </div>
            <div className="donate-form-group">
              <label>Available Food</label>
              <input
                type="text"
                name="availableFood"
                value={form.availableFood}
                onChange={handleChange}
                required
              />
            </div>
            <div className="donate-form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={form.tags.join(", ")}
                onChange={handleTagChange}
                required
              />
            </div>
            <div className="donate-form-group">
              <label>Address</label>
              <Autocomplete
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onPlaceChanged={() => {}}
              >
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  ref={addressInputRef}
                  onChange={handleChange}
                  required
                  placeholder="Enter address"
                />
              </Autocomplete>
              <span
                className="use-my-location"
                onClick={handleUseMyLocation}
              >
                Use My Location
              </span>
            </div>
            <div className="donate-form-group">
              <label>Number of Pax</label>
              <input
                type="number"
                name="pax"
                value={form.pax}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-group-donate">
              <button type="submit" className="submit-button-donate">
                Submit
              </button>
              <button type="button" onClick={handleLogout} className="logout-button">
                Log Out
              </button>
            </div>
          </form>
        </div>

        <div className="logos-section">
          <h2>These are all the beneficiaries we cater to</h2>
          <div className="logos-container">
            <img src="src/assets/images.jpeg" alt="Beneficiary 1" className="logo" />
            <img src="src/assets/images-2.jpeg" alt="Beneficiary 2" className="logo" />
            <img src="src/assets/MOE-Logo-1.png" alt="Beneficiary 3" className="logo" />
            <img src="src/assets/Bethesda-notag_CMYK.jpg" alt="Beneficiary 4" className="logo" />
            <img src="src/assets/Willing Heart_edited_edited.png.webp" alt="Beneficiary 5" className="logo" />
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default DonorInputPage;