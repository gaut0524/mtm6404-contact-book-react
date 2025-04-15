import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db";
import { useParams, useNavigate } from "react-router-dom";
//import './EditContactForm.css';

const EditContactForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
    company: "",
    birthday: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setFormData(snapshot.data());
      }
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, formData);

      setStatusMessage("Contact updated successfully!");
      setTimeout(() => {
        navigate(`/contact/${id}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating contact:", error);
      setStatusMessage("Error updating contact.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-container">
      <div className="contact-form-card shadow-lg rounded-lg p-4">
        <h2 className="text-center mb-4 text-white contact-heading">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label text-white">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label text-white">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control custom-input"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
            </div>
          </div>

          <button type="submit" className="custom-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              statusMessage || "Update Contact"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContactForm;
