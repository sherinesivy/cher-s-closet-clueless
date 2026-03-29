import { useCloset } from "../context/ClosetContext";

function CategoryPage({ category, onBack }) {
  const { wardrobe, uploadItem, deleteItem } = useCloset();
  const items = wardrobe[category];

const handleUpload = (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => uploadItem(category, file));
};

  return (
    <div className="category-page">
      <div className="category-page-content">
        <div className="side-panel">
          <button className="back-btn" onClick={onBack}>← BACK</button>
        </div>

        <div className="category-main">
          <p className="category-page-title">
            {category.toUpperCase()}
          </p>

          <div className="category-grid">
            {items.map((item) => (
              <div key={item.id} className="category-grid-item">
                <img src={item.image} alt={category} />
                <button
                  className="delete-item-btn"
                  onClick={() => deleteItem(category, item.id)}
                >✕</button>
              </div>
            ))}

            {/* upload tile */}
            <label className="upload-area">
              <span style={{ fontSize: "2rem" }}>+</span>
              <span>ADD {category.toUpperCase()}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        <div className="side-panel" />
      </div>
    </div>
  );
}

export default CategoryPage;