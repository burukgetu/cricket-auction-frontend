import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AuctionDetail from "./pages/AuctionDetail";
import LoginPage from "./components/Login";
import BiddersPage from "./pages/BiddersPage";
import BidderAuctionDetail from "./pages/BidderAuctionDetail";
import MyBids from "./pages/MyBids";
import PlayersList from "./pages/PlayersList";
import PlayerDetail from "./pages/PlayerDetail";
// import Home from "./pages/Home";

function App() {
  const isAuthenticated = () => {
    return Boolean(localStorage.getItem('user')); // Adjust key name if needed
  };
  
  const isAdmin = () => {
    const isAdmin = JSON.parse(localStorage.getItem('user'));
    return 'admin' === isAdmin.role; // Adjust key name if needed
  };



  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  
  const ProtectAdmin = ({ children }) => {
    if (!isAdmin()) {
      return <Navigate to="/bidders" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/bidders"/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bidders"
          element={
            <ProtectedRoute>
              <BiddersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bids"
          element={
            <ProtectedRoute>
              <MyBids />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bidder-auction-detail/:auctionId"
          element={
            <ProtectedRoute>
              <BidderAuctionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <ProtectAdmin>
                <AdminDashboard />
              </ProtectAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <ProtectAdmin>
                <PlayersList />
              </ProtectAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-auction"
          element={
            <ProtectedRoute>
              <ProtectAdmin>
                <AuctionDetail />
              </ProtectAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auction/:auctionId"
          element={
            <ProtectedRoute>
              <AuctionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-player"
          element={
            <ProtectedRoute>
              <ProtectAdmin>
                <PlayerDetail />
              </ProtectAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/player/:playerId"
          element={
            <ProtectedRoute>
              <PlayerDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
