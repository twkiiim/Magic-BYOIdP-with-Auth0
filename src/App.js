import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import WalletPage from "./pages/Wallet";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magic-wallet" element={<WalletPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
