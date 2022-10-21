import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import SearchContext from "../contexts/SearchContext";
import Hashtags from "./Hashtags.js";
import Header from "./commons/header/Header.js";
import Timeline from "./Timeline.js";

function App() {
  const [hashtags, setHashtags] = useState([]);

  const contextValue = {
    hashtags, setHashtags
  };
  const [search, setSearch] = useState(null);

  return (
    <UserContext.Provider value={contextValue}>
    <SearchContext.Provider value={[search, setSearch]}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route  path="/hashtags" element={<Hashtags />} />
          <Route  path="/header" element={<Header />} />
          <Route path="/" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
