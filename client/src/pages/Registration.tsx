import { useState } from "react";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="flex p-2 flex-col justify-center items-center">
      <form
        className="flex flex-col p-2 border gap-2 justify-center items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="border p-1 shadow"
          placeholder="enter name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-1 shadow"
          placeholder="enter password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-300 p-1 rounded">Create Account</button>
      </form>
    </div>
  );
}
