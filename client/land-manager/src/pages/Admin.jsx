import { useEffect, useState } from "react";
import api from "../../api";

const Admin = () => {
  const [lands, setLands] = useState([]);
  const [form, setForm] = useState({
    name: "",
    size: "",
    description: "",
    price: "",
    area: "",
    status: "Available",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      const res = await api.get("/lands");
      setLands(res.data.lands || res.data);
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    for (let img of images) formData.append("images", img);

    try {
      await api.post("/lands", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", size: "", description: "", price: "", area: "", status: "Available" });
      setImages([]);
      setImagePreviews([]);
      await fetchLands();
    } catch (err) {
      console.error("Error posting land:", err.response?.data || err.message || err);
      alert("Failed to post land: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteLand = async (id) => {
    try {
      await api.delete(`/lands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLands();
    } catch (error) {
      console.error("Error deleting land:", error.response?.data || error.message);
      alert("Failed to delete land");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Admin Panel</h2>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Land Size (e.g. 50x100 or 1 Acre)"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
            required
            className="block w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Area"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full"
          />
          {/* Show image previews */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="preview"
                className="w-full h-24 object-cover rounded border"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Post Land
          </button>
        </form>
      </div>

      {/* Posted Lands */}
      <h3 className="text-xl font-semibold mb-4 text-center">Posted Lands</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {lands.slice(0, visibleCount).map((land) => (
          <div key={land._id} className="bg-white p-4 shadow rounded">
            {land.images && land.images.length > 0 && (
              <img
                src={land.images[0]}
                alt={land.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <h4 className="text-lg font-bold">{land.name}</h4>
            <p className="text-sm text-gray-600">{land.area}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
                land.status === "Available"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {land.status}
            </span>
            <p className="mt-2 text-gray-700">{land.description}</p>
            <p className="text-green-600 font-bold mt-1">KES {land.price}</p>
            <button
              onClick={() => deleteLand(land._id)}
              className="mt-3 text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {visibleCount < lands.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
