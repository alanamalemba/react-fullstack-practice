import { useState } from "react";

export default function CreatePost() {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      console.log("data to be submitted: ", { title, username, postText });

      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, username, postText }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Post successful: ", responseData);
      } else {
        console.log(
          "Error during POST request:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  return (
    <section className="p-2">
      <form
        className="flex flex-col gap-4 border-2 border-blue-500 p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="border p-2">
          <span>title: </span>
          <input
            className="shadow border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter title"
            required
          />
        </label>

        <label className="border p-2">
          <span>username: </span>
          <input
            className="shadow border"
            type="text"
            placeholder="Enter name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="border p-2">
          <span>text: </span>
          <input
            className="shadow border"
            type="text"
            required
            placeholder="Enter post text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </label>

        <button className="bg-blue-300">Submit</button>
      </form>
    </section>
  );
}
