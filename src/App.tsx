import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SingleRow from "./components/SingleRow/SingleRow";

function App() {
  const [people, setPeople] = useState([]);
  const fetchLink = "https://swapi.dev/api/people/";

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const { data } = await axios.get(fetchLink);
      setPeople(data.results);
    } catch (err) {
      console.error("Failed to fetch people", err);
    }
  };

  const groupedPeople = [];
  for (let i = 0; i < people.length; i += 5) {
    groupedPeople.push(people.slice(i, i + 5));
  }

  return (
    <div className="table_container">
      {groupedPeople.map((group, index) => (
        <SingleRow key={index} group={group} />
      ))}
    </div>
  );
}

export default App;
