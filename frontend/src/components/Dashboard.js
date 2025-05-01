import React, { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    // Redirect to http://localhost:5000/
    window.location.replace("http://localhost:5000/");
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}

export default Dashboard;
