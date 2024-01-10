import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostType } from "./Home";

type CommentType = {
  commentBody: string;
};

export default function Post() {
  const { id } = useParams();
  const [postObject, setPostObject] = useState<PostType | null>(null);
  const [commentsObject, setCommentsObject] = useState<CommentType[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3001/posts/byId/${id}`);
        const data = await response.json();
        setPostObject(data);

        const res = await fetch(`http://localhost:3001/comments/${id}`);
        const comments = await res.json();
        setCommentsObject(comments);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchProduct();
  }, [id]);

  async function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accessToken: sessionStorage.getItem("accessToken") as string,
        },
        body: JSON.stringify({ commentBody: comment, PostId: id }),
      });

      console.log("response ", response);

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        return;
      }

      console.log("Comment added: ", data);
      setCommentsObject((comments) => [...comments, data]);
      setComment("");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="p-2 flex gap-2">
      <div className=" h-[200px] grow border flex flex-col  shadow  rounded bg-blue-500">
        <div className="p-2 text-white text-center">{postObject?.title}</div>
        <div className="bg-white grow flex items-center justify-center text-sm ">
          {postObject?.postText}
        </div>
        <div className="p-2 text-white">{postObject?.username}</div>
      </div>

      <div className="flex flex-col gap-2 grow justify-center items-center">
        <form className="flex flex-col gap-2" onSubmit={(e) => addComment(e)}>
          <input
            className="border shadow"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            type="text"
          />
          <button className="bg-blue-300 rounded">Add comment</button>
        </form>

        <div className="flex flex-col gap-1">
          {commentsObject.map((comment, index) => (
            <div
              className="rounded rounded-tl-none p-1 bg-blue-300"
              key={index}
            >
              {comment.commentBody}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
