import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <main className=" py-2 px-2">
      <Link className="bg-blue-400 p-1 mr-2 rounded " to={`/`}>
        Home
      </Link>
      <Link className="bg-blue-400 p-1 rounded " to={`/create-post`}>
        Create Post
      </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  );
}

export default App;
