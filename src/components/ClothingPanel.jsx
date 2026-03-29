import { useCloset } from "../context/ClosetContext";

function ClothingPanel({ showMismatch }) {
  const { wardrobe, navigate, getSelectedItem, deleteItem } = useCloset();

  const topItem = getSelectedItem("tops");
  const bottomItem = getSelectedItem("bottoms");
  const topItems = wardrobe["tops"];
  const bottomItems = wardrobe["bottoms"];

  return (
    <div className="clothing-panel">

      {/* TOP panel */}
      <div className="item-panel">
        {topItem ? (
          <div className="item-wrapper">
            <img src={topItem.image} alt="top" className="clothing-img" />
            <button
              className="delete-item-btn"
              onClick={() => deleteItem("tops", topItem.id)}
            >✕</button>
          </div>
        ) : (
          <div className="empty-panel">
            <span>no tops yet!</span>
            <span>click TOPS below to add</span>
          </div>
        )}
      </div>

      {/* TOPS arrows - right under tops */}
      <div className="arrows-row">
        <button className="nav-arrow" onClick={() => navigate("tops", "prev")}>◀◀</button>
        <span className="counter">
          {topItems.length > 0 ? `${topItems.indexOf(topItem) + 1}/${topItems.length}` : "0/0"}
        </span>
        <button className="nav-arrow" onClick={() => navigate("tops", "next")}>▶▶</button>
      </div>

      {/* BOTTOM panel */}
      <div className="item-panel">
        {bottomItem ? (
          <div className="item-wrapper">
            <img src={bottomItem.image} alt="bottom" className="clothing-img" />
            <button
              className="delete-item-btn"
              onClick={() => deleteItem("bottoms", bottomItem.id)}
            >✕</button>
          </div>
        ) : (
          <div className="empty-panel">
            <span>no bottoms yet!</span>
            <span>click BOTTOMS below to add</span>
          </div>
        )}
      </div>

      {/* BOTTOMS arrows - right under bottoms */}
      <div className="arrows-row">
        <button className="nav-arrow" onClick={() => navigate("bottoms", "prev")}>◀◀</button>
        <span className="counter">
          {bottomItems.length > 0 ? `${bottomItems.indexOf(bottomItem) + 1}/${bottomItems.length}` : "0/0"}
        </span>
        <button className="nav-arrow" onClick={() => navigate("bottoms", "next")}>▶▶</button>
      </div>

      {showMismatch && (
        <div className="mismatch-banner">MIS-MATCH!</div>
      )}

    </div>
  );
}

export default ClothingPanel;