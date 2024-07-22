import React, { useState, MouseEvent } from "react";
import { Popup } from "../Popup/Popup";
import axios from "axios";
import "./SingleRow.css";

interface PeopleProps {
  name: string;
  height: string;
  skin_color: string;
  films: string[];
}

interface SingleRowProps {
  group: PeopleProps[];
}

const SingleRow: React.FC<SingleRowProps> = ({ group }) => {
  const [selectedRowIndices, setSelectedRowIndices] = useState<number[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [films, setFilms] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<{
    name: number;
    height: number;
    skinColor: number;
    details: number;
  }>({
    name: 100,
    height: 100,
    skinColor: 100,
    details: 100,
  });

  const handleRowClick = (index: number) => {
    setSelectedRowIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const showDetails = async (filmsUrl: string[]) => {
    try {
      const filmPromises = filmsUrl.map((url) => axios.get(url));
      const filmResponses = await Promise.all(filmPromises);
      const filmTitles = filmResponses.map((response) => response.data.title);
      setFilms(filmTitles);
      setPopupVisible(true);
    } catch (err) {
      console.error("Failed to fetch film details", err);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    column: keyof typeof columnWidths
  ) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = columnWidths[column];

    const onMouseMove = (e: any) => {
      const newWidth = startWidth + (e.pageX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [column]: Math.max(newWidth, 50),
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="table_group">
      <table className="connected_table">
        <thead>
          <tr>
            <th>
              Name
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "name")}
              />
            </th>
            <th>
              Height
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "height")}
              />
            </th>
            <th>
              Skin color
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "skinColor")}
              />
            </th>
            <th>
              Details
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "details")}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {group.map((person, index) => (
            <tr key={index}>
              <td
                style={{
                  color: selectedRowIndices.includes(index) ? "red" : "",
                  width: columnWidths.name,
                }}
                onClick={() => handleRowClick(index)}
              >
                {person.name || ""}
              </td>
              <td style={{ width: columnWidths.height }}>
                {person.height || ""}
              </td>
              <td style={{ width: columnWidths.skinColor }}>
                {person.skin_color || ""}
              </td>
              <td style={{ width: columnWidths.details }}>
                <button onClick={() => showDetails(person.films)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popupVisible && <Popup closePopup={closePopup} films={films} />}
    </div>
  );
};

export default SingleRow;
