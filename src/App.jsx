import { useState, useEffect } from "react";
import { ClosetProvider } from "./context/ClosetContext";
import LoadingScreen from "./components/LoadingScreen";
import MainApp from "./components/MainApp";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  // loading screen shows for 3 seconds then reveals the app
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ClosetProvider>
      {loading ? <LoadingScreen /> : <MainApp />}
    </ClosetProvider>
  );
}

export default App;   