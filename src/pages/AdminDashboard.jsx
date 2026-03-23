import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, updateStatus } from "../redux/formSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.form);

  const [tab, setTab] = useState("pending");

  useEffect(() => {
    dispatch(fetchForms(tab));
  }, [tab,dispatch]);

  const handleAction = async (id, status) => {
    await dispatch(updateStatus({ id, status }));
    dispatch(fetchForms(tab));
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["pending", "selected", "rejected"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                tab === t
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center mb-3">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Table Container (Scrollable) */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm text-left">
            {/* Head */}
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Whatsapp</th>
                <th className="p-2">Aadhar</th>
                <th className="p-2">Election ID</th>
                <th className="p-2">Panchayat</th>
                <th className="p-2">Address</th>
                <th className="p-2">Pincode</th>
                <th className="p-2">Polling</th>
                <th className="p-2">Laptop</th>
                <th className="p-2">Webcam</th>
                {["pending", "selected", "rejected"].includes(tab) && (
  <th className="p-2">Action</th>
)}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.mobile}</td>
                  <td className="p-2">{item.whatsapp}</td>
                  <td className="p-2">{item.aadhar}</td>
                  <td className="p-2">{item.electionId}</td>
                  <td className="p-2">{item.panchayat}</td>

                  {/* Address handling */}
                  <td className="p-2 max-w-[200px] break-words">
                    {item.address}
                  </td>

                  <td className="p-2">{item.pincode}</td>
                  <td className="p-2">{item.pollingStation}</td>
                  <td className="p-2">{item.laptop}</td>
                  <td className="p-2">{item.webcam}</td>

                  {["pending", "selected", "rejected"].includes(tab) && (
  <td className="p-2">
    <div className="flex gap-2">

      {/* PENDING */}
      {tab === "pending" && (
        <>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
            onClick={() => handleAction(item._id, "selected")}
            disabled={loading}
          >
            Select
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
            onClick={() => handleAction(item._id, "rejected")}
            disabled={loading}
          >
            Reject
          </button>
        </>
      )}

      {/* SELECTED */}
      {tab === "selected" && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
          onClick={() => handleAction(item._id, "rejected")}
          disabled={loading}
        >
          Reject
        </button>
      )}

      {/* REJECTED */}
      {tab === "rejected" && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
          onClick={() => handleAction(item._id, "selected")}
          disabled={loading}
        >
          Select
        </button>
      )}

    </div>
  </td>
)}
                </tr>
              ))}

              {/* No data */}
              {data.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
