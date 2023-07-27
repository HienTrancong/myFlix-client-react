import { useState } from "react";

export const LoginView = ({ onLoggedin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    // fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/login?Username=${data.Username}&Password=${data.Password}`, {
    fetch("https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(), console.log(data))
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedin(data.user, data.token);
        } else {
          alert("No such user here");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};