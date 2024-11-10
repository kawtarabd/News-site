// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import News from './pages/News';
import AddNews from './pages/AddNews';
import PrivateRoute from './components/routing/PrivateRoute';
import AddFriend from './pages/AddFriend'; // Assurez-vous d'importer le composant AddFriend

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
  path="/add-friend"
  element={
    <PrivateRoute>
      <AddFriend />
    </PrivateRoute>
  }
/>

              <Route
                path="/news"
                element={
                  <PrivateRoute>
                    <News />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-news"
                element={
                  <PrivateRoute>
                    <AddNews />
                  </PrivateRoute>
                }
              />
            </Routes>
            <ToastContainer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
