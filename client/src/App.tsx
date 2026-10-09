import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-amber-900">{message}</h1>
    </div>
  );
}

export default App;
