import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../axios';
import { PanelLeftClose, PanelRightClose, Trash2, UserPen } from 'lucide-react';
// import Sidebar from '../components/Sidebar';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [secondButton, setSecondButton] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login")
  }

  const handleDelete = async (id) => {
    const res = await api.delete(`/players/${id}`);
    setPlayers(players.filter((auction) => auction._id !== id));
    alert(res.data.message)
  };

  const getPLayers = async () => {
    try {
      const response = await api.get('/players'); // Make the GET request
        setPlayers(response.data); // Set auctions data in state
        // console.log(response.data); // Set auctions data in state
    } catch (error) {
      alert(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  useEffect(() => {
    getPLayers()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1020) {
        setIsOpen(false);
        setSecondButton(true);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
       <div className="flex h-screen">
      {/* Sidebar */}
      
      { isOpen && <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static z-50`}
      >
        <div className="mt-8 flex justify-center items-center">
          <div className='flex gap-3'>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            { secondButton && <button onClick={toggleSidebar}>
                  {isOpen ? <PanelLeftClose /> : <PanelRightClose />}
            </button>}
          </div>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4 flex flex-col justify-center items-center">
            <li>
              <a href="/admin-dashboard" className="block px-4 py-2 hover:bg-gray-700">
                Auctions
              </a>
            </li>
            <li>
              <a href="/players" className="block px-4 py-2 hover:bg-gray-700">
                Players
              </a>
            </li>
          </ul>
          <button onClick={handleLogout} className='absolute bottom-0 pb-8 self-center w-full'>
            Logout
          </button>
        </nav>
      </div>}
      <div className="min-h-screen w-full bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div className='flex gap-3'>
              <button onClick={toggleSidebar}>
                {isOpen ? <PanelLeftClose /> : <PanelRightClose />}
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Players</h2>
            </div>
            <Link
              to="/create-player"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Create Player
            </Link>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 w-full">
                <tr className='w-full border-2'>
                  <th className="px-4 py-2 text-left">Player Name</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id} className="border-t">
                    <td className="px-4 py-2">{player.name}</td>
                    <td className="px-4 py-2">{player.role}</td>
                    <td className="px-4 py-2 flex gap-3 justify-center text-center">
                      <Link
                        to={`/player/${player._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        <UserPen className='w-8' width={20}/>
                      </Link>
                      <button
                        onClick={() => handleDelete(player._id)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default PlayersList;