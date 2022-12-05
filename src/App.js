import "./App.css";
import Details from "./components/Details";
import Issues from "./components/Issues";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Issues />} />
          <Route path="/issues/:id" element={<Details />} />
          <Route path="*" element={<h1>Error 404: Page not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
