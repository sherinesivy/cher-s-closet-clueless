import { useCloset } from "../context/ClosetContext";
import { CATEGORIES } from "../context/ClosetContext";

function OutfitPreview({ onBack, onSave }) {
  const { getSelectedItem } = useCloset();

  return (
    <div className="outfit-preview">
      <h2 className="outfit-title">✨ TODAY'S OUTFIT ✨</h2>
      <div className="outfit-grid">
        {CATEGORIES.map((cat) => {
          const item = getSelectedItem(cat);
          return item ? (
            <div key={cat} className="outfit-item">
              <img src={item.image} alt={cat} className="outfit-img" />
              <p>{cat.toUpperCase()}</p>
            </div>
          ) : null;
        })}
      </div>
      <div className="outfit-actions">A3
    <button className="retro-btn" onClick={() => { onSave(); onBack(); }}>
  💾 SAVE OUTFIT
</button>
        <button className="retro-btn" onClick={onBack}>◀ BACK</button>
      </div>
    </div>
  );
}

export default OutfitPreview;