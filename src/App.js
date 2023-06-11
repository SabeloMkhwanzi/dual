import React from "react";
import {
  NavbarHead,
  Home,
  Footer,
  SignUp,
  Meetingroom,
  Streamroom,
  Gamer,
  GamersPage,
  CreateACollection,
  CollectionPage,
} from "./components";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="font-mod flex flex-col relative overflow-x-hidden dark:bg-[#202020] transition-all duration-300 ease-in-out">
        <NavbarHead />
        <div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/meetingroom" element={<Meetingroom />} />
          <Route exact path="/streamroom" element={<Streamroom />} />
          <Route exact path="/gamer_challenger" element={<Gamer />} />
          <Route exact path="/gamer/:address" element={<GamersPage />} />
          <Route
            exact
            path="/collection/create"
            element={<CreateACollection />}
          />
          <Route
            exact
            path="/gamer/collection/:contract"
            element={<CollectionPage />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
