import { useCloset } from "../context/ClosetContext";
import { CATEGORIES } from "../context/ClosetContext";

function SavedOutfits() {
  const { savedOutfits, deleteSavedOutfit } = useCloset();
  if (savedOutfits.length === 0) return null;

  return (
    <div className="saved-outfits">
      <div className="saved-outfits-inner">
        <h2 className="saved-title">💾 SAVED OUTFITS</h2>
        <div className="saved-grid">
          {savedOutfits.map((outfit) => (
            <div key={outfit.id} className="saved-card">
              <div className="saved-items">
                {CATEGORIES.map((cat) =>
                  outfit.items[cat] ? (
                    <img key={cat} src={outfit.items[cat].image} alt={cat} className="saved-img" />
                  ) : null
                )}
              </div>
              <p className="saved-date">{outfit.savedAt}</p>
              <button className="delete-outfit-btn" onClick={() => deleteSavedOutfit(outfit.id)}>
                ✕ remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedOutfits;