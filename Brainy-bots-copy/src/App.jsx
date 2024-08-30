import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HumanBotForm from "./Form";
import SuccessPage from "./SuccessPage";
import ErrorPage from "./ErrorPage";
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<HumanBotForm />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;