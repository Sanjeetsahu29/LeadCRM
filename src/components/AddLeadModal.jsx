import React, { useState } from "react";
import initialLeads from "../utils/LeadListData.js";
import dropdownOptions from "../utils/constant.js";
import { X } from "lucide-react";

// Add Lead Modal Component
const AddLeadModal = ({ isOpen, onClose, onLeadAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    altPhone: "",
    email: "",
    altEmail: "",
    status: "New",
    qualification: "High School",
    interest: "Web Development",
    source: "Website",
    assignedTo: "John Doe",
    jobInterest: "",
    state: "",
    city: "",
    passoutYear: "",
    heardFrom: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contact.trim()) newErrors.contact = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    function formatDate(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12

      return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
    }
    if (validateForm()) {
      // Create new lead object with all required fields
      const newLead = {
        id: initialLeads.length + 1, // Simple ID generation
        name: formData.name,
        contact: formData.contact,
        altPhone: formData.altPhone,
        email: formData.email,
        altEmail: formData.altEmail,
        status: formData.status,
        qualification: formData.qualification,
        interest: formData.interest,
        source: formData.source,
        assignedTo: formData.assignedTo,
        jobInterest: formData.jobInterest,
        state: formData.state,
        city: formData.city,
        passoutYear: formData.passoutYear,
        heardFrom: formData.heardFrom,
        updatedAt: formatDate(new Date()),
      };

      // Add to leads array
      initialLeads.push(newLead);

      // Call callback to update parent component if provided
      if (onLeadAdded) {
        onLeadAdded(newLead);
      }

      // Reset form
      setFormData({
        name: "",
        contact: "",
        altPhone: "",
        email: "",
        altEmail: "",
        status: "New",
        qualification: "High School",
        interest: "Web Development",
        source: "Website",
        assignedTo: "John Doe",
        jobInterest: "",
        state: "",
        city: "",
        passoutYear: "",
        heardFrom: "",
      });
      setErrors({});

      // Close modal after successful submission
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Lead</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Alt Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt. Phone
              </label>
              <input
                type="tel"
                value={formData.altPhone}
                onChange={(e) => handleChange("altPhone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter alternate phone"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Alt Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt. Email
              </label>
              <input
                type="email"
                value={formData.altEmail}
                onChange={(e) => handleChange("altEmail", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter alternate email"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dropdownOptions.status.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification *
              </label>
              <select
                value={formData.qualification}
                onChange={(e) => handleChange("qualification", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dropdownOptions.qualification.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Interest Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Field *
              </label>
              <select
                value={formData.interest}
                onChange={(e) => handleChange("interest", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dropdownOptions.interest.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source *
              </label>
              <select
                value={formData.source}
                onChange={(e) => handleChange("source", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dropdownOptions.source.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To *
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dropdownOptions.assignedTo.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Interest */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Interest
              </label>
              <select
                value={formData.jobInterest}
                onChange={(e) => handleChange("jobInterest", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select job interest</option>
                {dropdownOptions.jobInterest.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter state"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
              />
            </div>

            {/* Passout Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passout Year
              </label>
              <input
                type="number"
                value={formData.passoutYear}
                onChange={(e) => handleChange("passoutYear", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter graduation year"
              />
            </div>

            {/* Heard From */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heard From
              </label>
              <input
                type="text"
                value={formData.heardFrom}
                onChange={(e) => handleChange("heardFrom", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How did you hear about us?"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
