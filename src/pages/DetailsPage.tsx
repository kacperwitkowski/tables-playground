import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Person {
  name: string;
  height: string;
  skin_color: string;
  films: string[];
}

const DetailsPage: React.FC = () => {
  const location = useLocation();
  const { person } = location.state as { person: Person };
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmPromises = person.films.map((url) => axios.get(url));
        const filmResponses = await Promise.all(filmPromises);
        const filmTitles = filmResponses.map((response) => response.data.title);
        setFilms(filmTitles);
      } catch (err) {
        throw new Error("Failed to fetch film details");
      }
    };

    fetchFilms();
  }, [person.films]);

  return (
    <div>
      <h1>Details</h1>
      <p>
        <strong>Name:</strong> {person.name}
      </p>
      <p>
        <strong>Height:</strong> {person.height}
      </p>
      <p>
        <strong>Skin Color:</strong> {person.skin_color}
      </p>
      <h2>Films</h2>
      <ul>
        {films.map((film, index) => (
          <li key={index}>{film}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsPage;
