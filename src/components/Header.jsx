// src/components/Header.js
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className=' flex justify-between px-4 items-center h-16'>
      <h1 className='font-extrabold text-3xl'>Auction
        <span className='text-xl font-bold'>.co</span></h1>
      <nav className='flex gap-3 font-bold items-center'>
        <Link to="/">Home</Link>
        <Link to="/my-bids">My bids</Link>
        <Link to="/login">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
