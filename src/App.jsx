import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AuctionDetail from "./pages/AuctionDetail";
import LoginPage from "./components/Login";
import BiddersPage from "./pages/BiddersPage";
import BidderAuctionDetail from "./pages/BidderAuctionDetail";
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/bidders" element={<BiddersPage />} />
        <Route path="/bidder-auction-detail/:auctionId" element={<BidderAuctionDetail />} />

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-auction" element={<AuctionDetail />} />
        <Route path="/auction/:auctionId" element={<AuctionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
