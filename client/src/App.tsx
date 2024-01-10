import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <main className=" py-2 px-2">
      <nav className="flex justify-evenly bg-blue-300 p-1 ">
        <Link className=" " to={`/`}>
          Home
        </Link>
        <Link className=" " to={`/create-post`}>
          Create Post
        </Link>
        <Link className=" " to={`/login`}>
          Login
        </Link>
        <Link className=" " to={`/registration`}>
          Registration
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </main>
  );
}

export default App;
