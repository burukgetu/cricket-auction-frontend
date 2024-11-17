import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axios';

const AuctionDetail = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState("")
  const [playerId, setPlayerId] = useState("")
  const [auctionEndTime, setAuctionEndTime] = useState("")
  const [startingBid, setStartingBid] = useState("");

  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const res = await api.get('/players')
      // console.log(res.data)
      setPlayers(res.data);
      if (!auctionId) setPlayerId(res.data[0]._id);
    }

    getPlayers()
  }, [])

  useEffect(() => {
    if (auctionId) {
      // Fetch the auction data from your API or mock data if editing
      const getAuction = async () => {
        const res = await api.get(`/auction/${auctionId}`)
        setAuction(res.data);
        setPlayerId(res.data.playerId._id);
        setAuctionEndTime(res.data.auctionEndTime);
        setStartingBid(res.data.currentBid)
        // console.log(res.data);
      }

      getAuction()
      // setAuction({
      //   name: `Auction ${auctionId}`,
      //   date: '2024-11-17',
      //   status: 'Active',
      // });
    }
  }, [auctionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log({playerId, startingBid, auctionEndTime})
    if (!playerId || !auctionEndTime) {
      return alert('Please fill in all required fields.');
    }

    if (!auctionId) {
      try {
        // Send the auction data to the backend
        const response = await api.post('/auction/add', {
          playerId,
          auctionEndTime,
          startingBid: startingBid || 0, // Default starting bid to 0 if not provided
        });
        alert('Auction created successfully!');
        navigate('/admin-dashboard');
        console.log(response.data); // Optionally log the response
      } catch (error) {
        console.error('Error creating auction:', error);
        setError(error.response?.data?.message || 'Something went wrong!');
      }
  } else {
    try {
      // Send the auction data to the backend
      const response = await api.put(`/auction/${auctionId}`, {
        playerId,
        auctionEndTime,
        startingBid: startingBid || 0, // Default starting bid to 0 if not provided
      });
      alert('Auction Edited successfully!');
      navigate('/admin-dashboard');
      console.log(response.data); // Optionally log the response
    } catch (error) {
      console.error('Error creating auction:', error);
      setError(error.response?.data?.message || 'Something went wrong!');
    }
  }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {auctionId ? 'Edit Auction' : 'Create Auction'}
        </h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Player Name</label>
          { !auctionId ? (
            <>
              <select
                name="name"
                value={playerId }
                onChange={(e) => setPlayerId(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {/* Map the array to select options */}
                {players.map((player, index) => (
                  <option key={index} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </select> 
          </>
          ) : (
            <h1 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
              {auction?.playerId?.name}
            </h1>
          )
          }
        </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={auctionEndTime}
              onChange={(e) => setAuctionEndTime(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bid starts at</label>
            <input
              type="number"
              name="startin-bid"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            {auctionId ? 'Update Auction' : 'Create Auction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctionDetail;
