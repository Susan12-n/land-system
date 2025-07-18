import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [land, setLand] = useState(null);

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/lands/${id}`);
        setLand(res.data);
      } catch (err) {
        console.error("Error fetching land details:", err);
      }
    };

    fetchLand();
  }, [id]);

  if (!land) return <div className="text-center mt-10 text-lg text-gray-600">Loading land details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back to Home
      </button>

      <h2 className="text-3xl font-bold text-green-700 mb-4">{land.name}</h2>

      <img
        src={land.images?.[0] ? `http://localhost:5000/${land.images[0]}` : "https://via.placeholder.com/800x400?text=No+Image"}
        alt={land.name}
        className="w-full h-80 object-cover rounded mb-6"
      />

      <div className="mb-4">
        <p className="text-lg text-gray-700 mb-1"><strong>Area:</strong> {land.area || "N/A"}</p>
        <p className="text-lg text-gray-700"><strong>Price:</strong> KES {land.price.toLocaleString()}</p>
      </div>

      <p className="text-gray-600 leading-relaxed">{land.description}</p>
    </div>
  );
};

export default LandDetails;
