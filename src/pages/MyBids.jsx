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
      const response = await api.get(`/bid/users/${user.id}`);
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
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">My Bids</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  {/* <th className="py-3 px-4 text-left text-gray-600 font-medium">Player Name</th> */}
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Bidded amount</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Current Bid</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{bid.bidAmount}</td>
                    {/* <td className="py-3 px-4">{bid.playerId}</td> */}
                    <td className="py-3 px-4 text-green-600">{bid.bidStatus}</td>
                    <td className="py-3 px-8">${bid.auctionId.currentBid}</td>
                    <td className="py-3 px-4 flex justify-center">
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
