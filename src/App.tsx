import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SingleRow from "./components/SingleRow/SingleRow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";

interface Person {
  name: string;
  height: string;
  skin_color: string;
  films: string[];
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={groupedPeople.map((group, index) => (
              <SingleRow key={index} group={group} />
            ))}
          />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
