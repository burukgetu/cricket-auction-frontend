import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axios'
import Header from '../components/Header';

const MyBids = () => {
  const [bids, setBids] = useState([]);

  // Fetch active auctions from backend or hardcoded data
  useEffect(() => {
    // Sample data, replace this with an API call to fetch active auctions
    const fetchActiveAuctions = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
      const response = await api.get(`/bid/${user.id}`);
      setBids(response.data);
      console.log(response.data);
    };

    fetchActiveAuctions();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Active Auctions</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Player Name</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Player role</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Current Bid</th>
                  <th className="py-3 px-4 text-left flex justify-center text-gray-600 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((auction) => (
                  <tr key={auction._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{auction.playerId.name}</td>
                    <td className="py-3 px-4">{auction.playerId.role}</td>
                    <td className="py-3 px-4 text-green-600">{auction.auctionStatus}</td>
                    <td className="py-3 px-8">${auction.currentBid}</td>
                    <td className="py-3 px-4 flex justify-center">
                      <Link
                        to={`/bidder-auction-detail/${auction._id}`}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBids;
