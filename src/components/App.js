import { useState } from "react";
import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
// import Hashtags from "./Hashtags.js";
import Login from "./authComponents/login";

function App() {
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={contextValue}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* <Route  path="/" element={<Hashtags />} /> */}
          <Route  path="/" element={<Login  setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
