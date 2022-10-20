import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Hashtags from "./Hashtags.js";
import Timeline from "./Timeline.js";

function App() {
  const contextValue = {

  };

  return (
    <UserContext.Provider value={contextValue}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
