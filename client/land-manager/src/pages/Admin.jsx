import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [lands, setLands] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    const res = await axios.get("http://localhost:5000/api/lands");
    setLands(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    for (let img of images) formData.append("images", img);

    await axios.post("http://localhost:5000/api/lands", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchLands();
  };

  const deleteLand = async (id) => {
    await axios.delete(`http://localhost:5000/api/lands/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchLands();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required /><br />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} required /><br />
        <input type="number" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} required /><br />
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} /><br />
        <button type="submit">Post Land</button>
      </form>

      <h3>Posted Lands</h3>
      <ul>
        {lands.map((land) => (
          <li key={land._id}>
            <strong>{land.name}</strong>: {land.description} - ${land.price}
            <button onClick={() => deleteLand(land._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
