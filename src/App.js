import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    console.log(user);
    // POST user to server
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="App">
      <br />
      <br />
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="enter name" />
        <br />
        <input type="email" name="email" placeholder="enter email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <h2>Users List</h2>
      <br />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}, email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
