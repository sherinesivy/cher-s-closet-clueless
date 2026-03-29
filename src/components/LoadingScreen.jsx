const HANGERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 95}%`,
  top: `${Math.random() * 90}%`,
  delay: `${Math.random() * 3}s`,
  duration: `${3 + Math.random() * 3}s`,
  size: `${50 + Math.random() * 50}px`,
  rotate: `${Math.random() * 30 - 15}deg`,
}));

function LoadingScreen() {
  return (
    <div className="loading-screen">
      {HANGERS.map((h) => (
        <svg
          key={h.id}
          className="hanger"
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            left: h.left,
            top: h.top,
            animationDelay: h.delay,
            animationDuration: h.duration,
            width: h.size,
            transform: `rotate(${h.rotate})`,
          }}
        >
          <path
            d="M50 10 Q50 3 57 3 Q64 3 64 10 Q64 16 50 24 Q36 16 36 10 Q36 3 43 3 Q50 3 50 10Z"
            stroke="#6fa3ef" strokeWidth="2.5" fill="none" strokeLinecap="round"
          />
          <path
            d="M50 24 L8 66 Q6 70 11 70 L89 70 Q94 70 92 66 Z"
            stroke="#6fa3ef" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      ))}
      <div className="loading-content">
        <p className="loading-title">CHER'S<br />WARDROBE</p>
        <p className="loading-sub">loading your closet...</p>
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;