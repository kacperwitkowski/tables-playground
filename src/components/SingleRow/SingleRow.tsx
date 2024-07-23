import React, { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
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
  const [columnWidths, setColumnWidths] = useState<{
    name: number;
    height: number;
    skinColor: number;
    details: number;
  }>({
    name: 150,
    height: 100,
    skinColor: 100,
    details: 100,
  });

  const navigate = useNavigate();

  const handleRowClick = (index: number) => {
    setSelectedRowIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const showDetails = (person: PeopleProps) => {
    navigate("/details", { state: { person } });
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
                <button onClick={() => showDetails(person)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleRow;
