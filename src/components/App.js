import { useState } from "react";
import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Hashtags from "./Hashtags.js";
import Timeline from "./Timeline.js";
import UserPage from "./UserPage.js";
import Login from "./authComponents/login";
import SearchContext from "../contexts/SearchContext";
import Header from "./commons/header/Header.js";
import HashtagPage from "./HashtagPage.js";

function App() {
  const [hashtags, setHashtags] = useState([]);
  const [hashtagPosts, setHashtagPosts] = useState([]);
  const [hashtagName, setHashtagName] = useState('');

  const contextValue = {
    hashtags, setHashtags, hashtagPosts, setHashtagPosts, hashtagName, setHashtagName
  };
  const [searchResult, setSearchResult] = useState(null);

  return (
    <UserContext.Provider value={contextValue}>
    <SearchContext.Provider value={{ searchResult, setSearchResult }}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route  path="/hashtag/:hashtag" element={<HashtagPage />} />
          <Route  path="/header" element={<Header />} />
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
