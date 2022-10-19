import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Hashtags from "./Hashtags.js";
import {useState} from "react";

function App() {
  const [hashtags, setHashtags] = useState([]);

  const contextValue = {
    hashtags, setHashtags
  };

  return (
    <UserContext.Provider value={contextValue}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Hashtags />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
