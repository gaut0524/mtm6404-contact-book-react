import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../db";
import { useNavigate } from "react-router-dom";
import './AddContactForm.css';
import '../App.css';

const AddContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    
    // Validate form before submission
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Add the new contact to Firestore
      await addDoc(collection(db, "contacts"), formData);
      setStatusMessage("Contact added successfully!");

      // Reset the form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

      // Navigate back to home after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error adding contact:", error);
      setStatusMessage("Error adding contact.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-container">
      <div className="contact-form-card shadow-lg rounded-lg p-4">
        <h2 className="text-center mb-4 contact-heading-newcontact">Add New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control custom-input"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control custom-input"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control custom-input"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
          <button
            type="submit"
            className="custom-btn "
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              statusMessage || "Add Contact"
            )}
          </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddContactForm;
