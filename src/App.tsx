import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Users {
  id: number;
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<Users[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setLoading(false);
        setError(err.message);
      });
    return () => controller.abort();
  }, []);
  return (
    <>
      {loading && <div className="spinner-border"></div>}
      {error && <h1>{error}</h1>}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user.id}>
            <h3>{user.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
