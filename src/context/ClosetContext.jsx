import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ClosetContext = createContext();

export const CATEGORIES = ["tops", "bottoms", "shoes", "jackets", "accessories"];

// mismatch rules — fashion crimes 😭
const MISMATCH_RULES = [
  { top: "stripes", bottom: "plaid" },
  { top: "plaid", bottom: "stripes" },
  { top: "floral", bottom: "floral" },
  { top: "animal print", bottom: "animal print" },
];

export function ClosetProvider({ children }) {
  // wardrobe holds arrays of items per category
  const [wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem("chers-wardrobe");
    if (saved) return JSON.parse(saved);
    return Object.fromEntries(CATEGORIES.map((cat) => [cat, []]));
  });

  // tracks which item index is selected per category
  const [selectedIndex, setSelectedIndex] = useState(
    Object.fromEntries(CATEGORIES.map((cat) => [cat, 0]))
  );

  // which category the panel is currently showing
  const [activeCategory, setActiveCategory] = useState("tops");

  // controls DRESS ME screen
  const [showOutfit, setShowOutfit] = useState(false);

  // mismatch warning
  const [showMismatch, setShowMismatch] = useState(false);

  // saved outfits
  const [savedOutfits, setSavedOutfits] = useState(() => {
    const saved = localStorage.getItem("chers-saved-outfits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chers-wardrobe", JSON.stringify(wardrobe));
  }, [wardrobe]);

  useEffect(() => {
    localStorage.setItem("chers-saved-outfits", JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  // UPLOAD item to a category
  const uploadItem = (category, file, tags = []) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newItem = {
        id: uuidv4(),
        image: reader.result,
        tags,
        name: file.name.split(".")[0], // use filename as default name
      };
      setWardrobe((prev) => ({
        ...prev,
        [category]: [...prev[category], newItem],
      }));
    };
    reader.readAsDataURL(file);
  };

  // DELETE item
  const deleteItem = (category, id) => {
    setWardrobe((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  };

  // NAVIGATE arrows
  const navigate = (category, direction) => {
    const items = wardrobe[category];
    if (items.length === 0) return;
    setSelectedIndex((prev) => {
      const current = prev[category];
      if (direction === "next") {
        return { ...prev, [category]: (current + 1) % items.length };
      } else {
        return { ...prev, [category]: (current - 1 + items.length) % items.length };
      }
    });
  };

  // get the currently selected item for a category
  const getSelectedItem = (category) => {
    const items = wardrobe[category];
    if (items.length === 0) return null;
    return items[selectedIndex[category]] || items[0];
  };

  // check for mismatch when DRESS ME is clicked
  const checkMismatch = () => {
    const top = getSelectedItem("tops");
    const bottom = getSelectedItem("bottoms");
    if (!top || !bottom) return false;
    return MISMATCH_RULES.some(
      (rule) =>
        top.tags.includes(rule.top) && bottom.tags.includes(rule.bottom)
    );
  };

  // DRESS ME button handler
const dressMe = () => {
  const top = getSelectedItem("tops");
  const bottom = getSelectedItem("bottoms");

  // mismatch = trying to dress me with no top AND no bottom
  if (!top && !bottom) {
    setShowMismatch(true);
    setTimeout(() => setShowMismatch(false), 3000);
    return; // don't open outfit preview
  }

  setShowOutfit(true);
};

  // SAVE current outfit
 const saveOutfit = () => {
  const items = Object.fromEntries(
    CATEGORIES.map((cat) => [cat, getSelectedItem(cat)])
  );

  // don't save if there's nothing selected at all
  const hasItems = Object.values(items).some((item) => item !== null);
  if (!hasItems) return;

  const newSaved = {
    id: uuidv4(),
    items,
    savedAt: new Date().toLocaleDateString(),
  };
  setSavedOutfits((prev) => [newSaved, ...prev]);
};

  // DELETE saved outfit
  const deleteSavedOutfit = (id) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <ClosetContext.Provider value={{
      wardrobe,
      selectedIndex,
      activeCategory, setActiveCategory,
      showOutfit, setShowOutfit,
      showMismatch,
      savedOutfits,
      uploadItem,
      deleteItem,
      navigate,
      getSelectedItem,
      dressMe,
      saveOutfit,
      deleteSavedOutfit,
    }}>
      {children}
    </ClosetContext.Provider>
  );
}

export function useCloset() {
  return useContext(ClosetContext);
}