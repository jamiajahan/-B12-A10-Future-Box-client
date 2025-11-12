import { useEffect, useState } from "react";
import Spinner from "../Shared/Spinner";

const CommunityStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle error
  }, []);

  if (loading) return <Spinner />;
  if (!stats) return null; // Don't render if stats fail to load

  return (
    <section className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        Community at a Glance
      </h2>
      <div className="stats shadow-xl w-full">
        {/* Total registered users */}
        <div className="stat place-items-center">
          <div className="stat-title">Registered Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>

        {/* total issues resolved */}
        <div className="stat place-items-center">
          <div className="stat-title">Issues Resolved</div>
          <div className="stat-value text-success">{stats.resolvedIssues}</div>
        </div>

        {/* total issues pending */}
        <div className="stat place-items-center">
          <div className="stat-title">Issues Pending</div>
          <div className="stat-value text-warning">{stats.pendingIssues}</div>
        </div>
          
        <div className="stat place-items-center">
          <div className="stat-title">Total Reports</div>
          <div className="stat-value">{stats.totalIssues}</div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;