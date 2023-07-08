import dogimg from "./assests/dog.webp"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() {
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/logout',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Connection: 'close',
          },
        }
      );
      if (response.status === 200 || response.status === 401 ) {
        window.location.href = '/';
      } 
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Router>
      <NavBar handleLogout={handleLogout} />
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-5">
                  <Login />
                </div>
                <div className="col-md-7 my-auto">
                  <img className="img-fluid w-100" src={dogimg} alt="" />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/complete" element={<NavBar />} />
      </Routes>
    </Router>
  );
}

export default App;

