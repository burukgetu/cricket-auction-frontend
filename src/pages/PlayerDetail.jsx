import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axios';

const roles = [
    "OpeningBatsman",
    "MiddleOrderBatsman",
    "LowerOrderBatsman",
    "FastBowler",
    "MediumPaceBowler",
    "OffSpinner",
    "LegSpinner",
    "AllRounder",
    "Wicketkeeper",
    "SlipFielder",
    "CloseInFielder",
    "BoundaryFielder",
  ];

const PlayerDetail = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [playerRole, setPlayerRole] = useState("")

  const [error, setError] = useState(null);

  useEffect(() => {
    if (playerId) {
      // Fetch the auction data from your API or mock data if editing
      const getPlayer = async () => {
        const res = await api.get(`/players/${playerId}`)
        setPlayer(res.data);
        setPlayerName(res.data[0].name);
        setPlayerRole(res.data[0].role);
        // console.log(res.data);
      }

      getPlayer()
    }
  }, [playerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log({playerName, playerRole})
    if (!playerName || !playerRole) {
      return alert('Please fill in all required fields.');
    }

    if (!playerId) {
      try {
        // Send the auction data to the backend
        const response = await api.post('/players', {
          name: playerName,
          role: playerRole,
        });
        alert('Player created successfully!');
        navigate('/players');
        // console.log(response.data); // Optionally log the response
      } catch (error) {
        console.error('Error creating auction:', error);
        setError(error.response?.data?.message || 'Something went wrong!');
      }
  } else {
    try {
      // Send the auction data to the backend
      const response = await api.put(`/players/${playerId}`, {
        name: playerName,
        role: playerRole,
      });
      alert('Player Edited successfully!');
      navigate('/players');
    //   console.log(response.data); // Optionally log the response
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
          {playerId ? 'Edit Auction' : 'Create Auction'}
        </h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Player Name</label>
              <input
                type='text'
                name="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
        </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <select
                value={playerRole}
                onChange={(e) => setPlayerRole(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
                <option value="" disabled>
                Choose a role...
                </option>
                {roles.map((role) => (
                <option key={role} value={role}>
                    {role.replace(/([A-Z])/g, " $1").trim()}
                </option>
                ))}
            </select>

            {playerRole && (
                <div className="mt-4">
                <p className="text-lg">
                    Selected Role: <strong>{playerRole.replace(/([A-Z])/g, " $1").trim()}</strong>
                </p>
                </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            {playerId ? 'Update Auction' : 'Create Auction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerDetail;
