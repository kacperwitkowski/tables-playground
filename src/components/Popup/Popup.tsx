import "./Popup.css";

export const Popup = ({
  closePopup,
  films,
}: {
  closePopup: () => void;
  films: string[];
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={closePopup}>
          ×
        </button>
        <h2>Film appearances</h2>
        <ul>
          {films.map((film, index) => (
            <li key={index}>{film}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
