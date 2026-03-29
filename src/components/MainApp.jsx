import { useState } from "react";
import { useCloset } from "../context/ClosetContext";
import CategoryBar from "./CategoryBar";
import ClothingPanel from "./ClothingPanel";
import OutfitPreview from "./OutfitPreview";
import SavedOutfits from "./SavedOutfits";
import CategoryPage from "./CategoryPage";

function MainApp() {
  const { showOutfit, setShowOutfit, dressMe, saveOutfit, showMismatch } = useCloset();
  const [categoryPage, setCategoryPage] = useState(null); // null = main, "tops" = category page

  if (categoryPage) {
    return (
      <div className="monitor">
        <div className="title-bar">
          <span>IVY'S WARDROBE</span>
          <span className="fall-fashions">IVY'S FASHION</span>
        </div>
        <CategoryPage category={categoryPage} onBack={() => setCategoryPage(null)} />
        <CategoryBar onCategoryClick={setCategoryPage} activeCategory={categoryPage} />
      </div>
    );
  }

  return (
    <div>
      <div className="monitor">
        <div className="title-bar">
          <span>IVY'S WARDROBE</span>
          <span className="fall-fashions">IVY'S FASHION</span>
        </div>

        <div className="main-content">
          <div className="side-panel">
            <button className="side-btn" onClick={saveOutfit}>SAVE{"\n"}OUTFIT</button>
          </div>

          <div className="center-panel">
            {showOutfit ? (
              <OutfitPreview onBack={() => setShowOutfit(false)} onSave={saveOutfit} />
            ) : (
              <ClothingPanel showMismatch={showMismatch} />
            )}
          </div>

          <div className="side-panel">
            <button className="side-btn" onClick={dressMe}>DRESS{"\n"}ME</button>
          </div>
        </div>

        <CategoryBar onCategoryClick={setCategoryPage} activeCategory={null} />
      </div>

      <SavedOutfits />
    </div>
  );
}

export default MainApp;