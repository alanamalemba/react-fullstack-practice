import { useEffect, useState } from "react";
import "./App.css";

type PostType = {
  id: string;
  title: string;
  username: string;
  postText: string;
};

function App() {
  const [listOfPosts, setListOfPosts] = useState<PostType[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3001/posts");
        const data = await response.json();
        setListOfPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchPosts();
  }, []);
  return (
    <main className="flex flex-col gap-6 p-4 items-center">
      {listOfPosts.map((item) => (
        <div
          className=" h-[25 0px] w-[300px] border flex flex-col  shadow  rounded bg-blue-500"
          key={item.id}
        >
          <div className="p-2 text-white text-center">{item.title}</div>
          <div className="bg-white grow flex items-center justify-center text-sm ">
            {item.postText}
          </div>
          <div className="p-2 text-white">{item.username}</div>
        </div>
      ))}
    </main>
  );
}

export default App;
