import { useState } from "react";
import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext.js";
import Timeline from "./Timeline.js";
import UserPage from "./UserPage.js";
import Login from "./authComponents/login";
import SearchContext from "../contexts/SearchContext.js";
import HashtagPage from "./HashtagPage.js";
import PrivatePage from "./PrivatePage.js";

function App() {

  const [postID, setPostID] = useState(0);
  const [count, setCount] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagPosts, setHashtagPosts] = useState([]);
  const [hashtagName, setHashtagName] = useState('');
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [follow, setFollow] = useState('Follow');
  const [searchResult, setSearchResult] = useState(null);

  const userToken = localStorage.getItem('linkr-token');
  const userId = localStorage.getItem('linkr-userId');
  const userPicture = localStorage.getItem('linkr-pictureUrl');
  
  const URL_BASE = process.env.REACT_APP_API_BASE_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    },
  };
  const contextValue = {
    count, setCount, postID, setPostID, hashtags, setHashtags, hashtagPosts, setHashtagPosts, hashtagName, setHashtagName, userToken, config, userId, userPicture, url, setUrl, comment, setComment, loading, setLoading, posts, setPosts, follow, setFollow, URL_BASE
  };

  return (
    <UserContext.Provider value={contextValue}>
      <SearchContext.Provider value={{ searchResult, setSearchResult }}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivatePage />}>
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
