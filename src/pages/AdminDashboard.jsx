import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axios';

const AdminDashboard = () => {
  const [auctions, setAuctions] = useState([]);

  const handleDelete = async (id) => {
    const res = await api.delete(`/auction/${id}`);
    setAuctions(auctions.filter((auction) => auction._id !== id));
    alert(res.data.message)
  };

  const getAuctions = async () => {
    try {
      const response = await api.get('/auction'); // Make the GET request
      setAuctions(response.data); // Set auctions data in state
    } catch (error) {
      alert(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  useEffect(() => {
    getAuctions()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Auctions</h2>
          <Link
            to="/create-auction"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Auction
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Player Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => (
                <tr key={auction.id} className="border-t">
                  <td className="px-4 py-2">{auction.playerId.name}</td>
                  <td className="px-4 py-2">{auction.auctionStatus}</td>
                  <td className="px-4 py-2">{auction.auctionEndTime}</td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/auction/${auction._id}`}
                      className="text-blue-500 hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(auction._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;