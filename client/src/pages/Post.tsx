import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostType } from "./Home";

export default function Post() {
  const { id } = useParams();
  const [postObject, setPostObject] = useState<PostType>({});

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3001/posts/byId/${id}`);
        const data = await response.json();
        console.log(data);
        setPostObject(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchProduct();
  }, [id]);
  return (
    <div className="p-2 flex gap-2">
      <div className=" h-[200px] grow border flex flex-col  shadow  rounded bg-blue-500">
        <div className="p-2 text-white text-center">{postObject.title}</div>
        <div className="bg-white grow flex items-center justify-center text-sm ">
          {postObject.postText}
        </div>
        <div className="p-2 text-white">{postObject.username}</div>
      </div>

      <div className="flex grow justify-center items-center">
        <p className="text-center">Comment section</p>
      </div>
    </div>
  );
}
