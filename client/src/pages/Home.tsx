import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type PostType = {
  id: string;
  title: string;
  username: string;
  postText: string;
};

export default function Home() {
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
    <section className="flex flex-col gap-6 p-4 items-center">
      {listOfPosts.map((item) => (
        <Link
          to={`post/${item.id}`}
          className=" h-[200px] w-[300px] border flex flex-col  shadow  rounded bg-blue-500"
          key={item.id}
        >
          <div className="p-2 text-white text-center">{item.title}</div>
          <div className="bg-white grow flex items-center justify-center text-sm ">
            {item.postText}
          </div>
          <div className="p-2 text-white">{item.username}</div>
        </Link>
      ))}
    </section>
  );
}
