import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axios'

const BidderAuctionDetail = () => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const date = new Date(auction?.createdAt);
  const newDate = date.toLocaleDateString('en-GB').replace(/\//g, "-");
  
  const [didBid, setDidBid] = useState([]);
  
  // Fetch auction details by ID
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      const response = await api.get(`/auction/${auctionId}`);
      setAuction(response.data);
      console.log(response.data);
    };

    fetchAuctionDetails();
  }, [auctionId]);

  useEffect(() => {
    const fetchBid = async () => {
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const response = await api.get(`/bid/user/${auctionId}/${user.id}`);
        setDidBid(response.data)
        // console.log("there is previous bid", {didBid})
      } catch (error) {
         console.log(error) 
      }
      // console.log(response.data);
    };

    fetchBid();
  }, [auctionId])

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    // Handle bid submission (send bid to the backend)
      const user = JSON.parse(localStorage.getItem('user'))
    try {
      const res = await api.post("/bid", {
        auctionId,
        userId: user.id,
        bidAmount
      })

      window.location.reload();
      alert("You Placed a bid Succesfully");
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
    // console.log(`Placing bid of ${bidAmount} on auction ${auctionId}`);
    // console.log("user info", user.id);
  };

  if (!auction) {
    return <div>Loading auction details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">{auction.name}</h2>

        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-700">Auction Details</h1>
          <p className="text-gray-600 bg-gray-200 px-2 mb-1"><span className='font-extrabold'>Start Date</span>: {newDate}</p>
          <p className="text-gray-600 bg-gray-200 px-2"><span className='font-extrabold'>End Date:</span> {auction.auctionEndTime}</p>
          <h1 className="text-xl font-bold mt-4 mb-2 text-gray-700">Player Details</h1>
          <p className="text-gray-600 font-bold mb-1 bg-gray-200 px-2"><span className='font-extrabold'>Name</span>: {auction.playerId.name}</p>
          <p className="text-gray-600 mb-4 font-bold bg-gray-200 px-2"><span className='font-extrabold'>Role:</span> {auction.playerId.role}</p>
          <p className="text-gray-600"><span className='font-extrabold'>Current Bid:</span>  ${auction.currentBid}</p>
          <h3 className="text-gray-600"><span className='font-extrabold'>Your Previous bid: </span> 
              <span className='font-bold text-red-500'> 
                  ${didBid[0]?.bidAmount}
              </span></h3>
        </div>

        <form onSubmit={handleBidSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Your Bid Amount</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={auction.currentBid + 1}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder={`Enter bid (min $${auction.currentBid + 1})`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
           { didBid.length == 0 ? "Place Bid" : "Renew your bid"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BidderAuctionDetail;
