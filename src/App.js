import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Display from "./components/Display";
import { apiConnector } from "./services/apiconnector";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users,setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");
  const handleGroupByChange = (group) => {
    setGroupBy(group);
  };

  const handleOrderByChange = (sort) => {
    setOrderBy(sort);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await apiConnector(
          "GET",
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        console.log("data", response);
        setUsers(response.data.users);
        setTickets(response.data.tickets);
      } catch (err) {
        console.log("error", err);
      }
    })();
  }, []);
  return (
    <div className="App">
      <Navbar
        groupBy={groupBy}
        orderBy={orderBy}
        onGroupByChange={handleGroupByChange}
        onOrderByChange={handleOrderByChange}
      />
      <Display tickets={tickets} users={users} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
}

export default App;
