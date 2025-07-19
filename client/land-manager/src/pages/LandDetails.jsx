import { useParams, useNavigate, Link } from "react-router-dom";
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

  if (!land) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading land details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Home
      </button>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div>
          <img
            src={
              land.images?.[0]
                ? `http://localhost:5000/${land.images[0]}`
                : "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={land.name}
            className="w-full h-96 object-cover rounded"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">{land.name}</h2>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Area:</strong> {land.area || "N/A"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Price:</strong> KES {land.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">{land.description}</p>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandDetails;
