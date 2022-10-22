import { useState } from "react";
import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Hashtags from "./Hashtags.js";
import Login from "./authComponents/login";
import SearchContext from "../contexts/SearchContext";
import Header from "./commons/header/Header.js";
import Timeline from "./Timeline.js";

function App() {
  const [token, setToken] = useState('');
  const [hashtags, setHashtags] = useState([]);

  const contextValue = {
    hashtags, setHashtags
  };
  const [searchResult, setSearchResult] = useState(null);

  return (
    <UserContext.Provider value={contextValue}>
    <SearchContext.Provider value={[searchResult, setSearchResult]}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Login  setToken={setToken}/>} />
          <Route  path="/hashtags" element={<Hashtags />} />
          <Route path="/" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
