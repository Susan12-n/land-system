import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
  const [lands, setLands] = useState([]);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 6;

  const fetchLands = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/lands`, {
        params: { area, page, limit: LIMIT },
      });
      setLands(res.data.lands);
      setTotalPages(Math.ceil(res.data.total / LIMIT));
    } catch (err) {
      console.error("Error fetching lands", err);
    }
  };

  useEffect(() => {
    fetchLands();
  }, [page, area]);

  const handleSearch = (e) => {
    e.preventDefault();
    setArea(search);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setArea("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Available Lands</h2>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search by area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-64 rounded border border-gray-300"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Search
        </button>
        {area && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Clear
          </button>
        )}
      </form>

      {/* Lands Grid */}
      {lands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lands.map((land) => (
            <Link to={`/lands/${land._id}`}>
  <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
    <img
  src={land.images[0]}
  alt={land.name}
  className="w-full h-48 object-cover rounded mb-2"
/>

    <h3 className="text-lg font-semibold">{land.name}</h3>
    <p className="text-sm text-gray-500">Size: <strong>{land.size}</strong></p>
    <p className="text-sm text-gray-600">{land.description.slice(0, 50)}...</p>
    <p className="text-sm text-gray-500">Area: <strong>{land.area}</strong></p>
    <p className="text-green-600 font-bold mt-1">${land.price}</p>
  </div>
</Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">No lands found in this area.</p>
      )}

      {/* Pagination */}
      {lands.length > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
