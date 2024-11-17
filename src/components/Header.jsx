// src/components/Header.js
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login")
  }
  return (
    <header className=' flex justify-between px-4 items-center h-16'>
      <h1 className='font-extrabold text-3xl'>Auction
        <span className='text-xl font-bold'>.co</span></h1>
      <nav className='flex gap-3 font-bold items-center'>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/my-bids">My bids</Link> */}
        {/* <Link to="/login">Logout</Link> */}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
