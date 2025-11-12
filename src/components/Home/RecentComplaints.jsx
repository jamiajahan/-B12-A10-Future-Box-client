import { useEffect, useState } from "react";
import IssueCard from "../Shared/IssueCard"; // We will create this next
import Spinner from "../Shared/Spinner";

const RecentComplaints = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch data from your server's new endpoint
    fetch('http://localhost:5000/issues/recent')
      .then(res => res.json())
      .then(data => {
        setIssues(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        Recent Complaints
      </h2>
      
      {/* Grid for the cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map(issue => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </section>
  );
};

export default RecentComplaints;