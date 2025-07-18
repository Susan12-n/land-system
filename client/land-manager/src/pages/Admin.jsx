import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [lands, setLands] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", area: "",status: "Available",  });
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    const res = await axios.get("http://localhost:5000/api/lands");
    setLands(res.data.lands || res.data); // supports both paginated and non-paginated
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("area", form.area);
    formData.append("status", form.status);
    for (let img of images) {
      formData.append("images", img);
    }

    await axios.post("http://localhost:5000/api/lands", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setForm({ name: "", description: "", price: "", area: "" }); // Reset form
    fetchLands();
  };

  const deleteLand = async (id) => {
    await axios.delete(`http://localhost:5000/api/lands/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchLands();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Land Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="block w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="block w-full p-2 border rounded"
        />
        <input
  type="text"
  placeholder="Area"
  value={form.area}
  onChange={(e) => setForm({ ...form, area: e.target.value })}
  className="block w-full mb-3 p-2 border rounded"
/>

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="block w-full"
        />

        <select
  value={form.status}
  onChange={(e) => setForm({ ...form, status: e.target.value })}
  className="block w-full mb-3 p-2 border rounded"
>
  <option value="Available">Available</option>
  <option value="Sold">Sold</option>
</select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Post Land
        </button>
      </form>

      {/* Posted Lands List */}
      <h3 className="text-xl font-semibold mb-2">Posted Lands</h3>
      <ul className="space-y-4">
        {lands.map((land) => (
          <li key={land._id} className="bg-white p-4 shadow rounded">
            <strong>{land.name}</strong> - {land.area} <br />

            <span
  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
    land.status === "Available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
  }`}
>
  {land.status}
</span>
            {land.description}<br />
            <span className="text-green-600 font-semibold">${land.price}</span>
            <div>
              <button
                onClick={() => deleteLand(land._id)}
                className="mt-2 text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
