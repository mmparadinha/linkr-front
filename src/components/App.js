import GlobalStyles from "../assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Hashtags from "./Hashtags.js";
import Header from "./commons/Header.js";

function App() {
  const contextValue = {

  };

  return (
    <UserContext.Provider value={contextValue}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Hashtags />} />
          <Route  path="/header" element={<Header />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
