import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { submitForm } from "../redux/formSlice";
import { Link } from "react-router-dom";

export default function FormPage() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.form);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    panchayat: "",
    address: "",
    pincode: "",
    pollingStation: "",
    laptop: "",
    webcam: "",
    aadhar: "",
      electionId: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await dispatch(submitForm(form));

  if (res.meta.requestStatus === "fulfilled") {
    alert("Submitted successfully!");

    setForm({
      name: "",
      mobile: "",
      whatsapp: "",
      aadhar: "",
      electionId: "",
      panchayat: "",
      address: "",
      pincode: "",
      pollingStation: "",
      laptop: "",
      webcam: "",
    });
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center p-4 max-w-5xl mx-auto">
        <h1 className="text-white text-lg sm:text-xl font-semibold">
          Akshaya Portal
        </h1>

        <Link to="/admin">
          <button className="bg-white text-blue-600 px-4 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
            Admin Login
          </button>
        </Link>
      </div>

      {/* 🔹 Form */}
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-5">
            Registration Form
          </h2>

          {/* Name */}
          <label className="font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />

          {/* Mobile */}
          <label className="font-medium">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          {/* Aadhaar */}
<label className="font-medium">
  Aadhaar Number <span className="text-red-500">*</span>
</label>
<input
  type="text"
  name="aadhar"
  value={form.aadhar}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded mb-3"
/>

{/* Election ID */}
<label className="font-medium">
  Election ID <span className="text-red-500">*</span>
</label>
<input
  type="text"
  name="electionId"
  value={form.electionId}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded mb-3"
/>

          {/* Whatsapp */}
          <label className="font-medium">
            Whatsapp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />

          {/* Panchayat */}
          <label className="font-medium">
            Panchayat <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="panchayat"
            value={form.panchayat}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />

          {/* Address */}
          <label className="font-medium">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-2 border rounded mb-3"
          />

          {/* Pincode */}
          <label className="font-medium">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />

          {/* Polling */}
          <label className="font-medium">
            Polling Station <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pollingStation"
            value={form.pollingStation}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />

          {/* Laptop */}
          <label className="font-medium">
            Do you have Laptop <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mb-3 mt-1">
            <label>
              <input
                type="radio"
                name="laptop"
                value="Yes"
                checked={form.laptop === "Yes"}
                onChange={handleChange}
                required
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="laptop"
                value="No"
                checked={form.laptop === "No"}
                onChange={handleChange}
                required
              />{" "}
              No
            </label>
          </div>

          {/* Webcam */}
          <label className="font-medium">
            Do you have Web Cam <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mb-4 mt-1">
            <label>
              <input
                type="radio"
                name="webcam"
                value="Yes"
                checked={form.webcam === "Yes"}
                onChange={handleChange}
                required
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="webcam"
                value="No"
                checked={form.webcam === "No"}
                onChange={handleChange}
                required
              />{" "}
              No
            </label>
          </div>
          {error && (
  <p className="text-red-500 text-sm mb-3">
    {error}
  </p>
)}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}