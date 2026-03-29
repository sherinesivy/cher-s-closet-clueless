import { CATEGORIES } from "../context/ClosetContext";

function CategoryBar({ onCategoryClick, activeCategory }) {
  const categoryEmojis = {
    tops: "👚",
    bottoms: "👖",
    shoes: "👠",
    jackets: "🧥",
    accessories: "💍",
  };

  return (
    <div className="category-bar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${activeCategory === cat ? "active" : ""}`}
          onClick={() => onCategoryClick(cat)}
        >
          {categoryEmojis[cat]} {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;