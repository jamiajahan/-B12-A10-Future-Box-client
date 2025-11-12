import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IssueCard from '../components/Shared/IssueCard';
import Spinner from '../components/Shared/Spinner';

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get location to read query params from homepage category click
  const location = useLocation();
  const initialCategory = new URLSearchParams(location.search).get('category') || '';

  // State for filters 
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [statusFilter, setStatusFilter] = useState(''); // 'ongoing' or 'ended'

  // Fetch data when component mounts or filters change
  useEffect(() => {
    setLoading(true);
    
    // Build the query string based on active filters
    const params = new URLSearchParams();
    if (categoryFilter) {
      params.append('category', categoryFilter);
    }
    if (statusFilter) {
      params.append('status', statusFilter);
    }
    const queryString = params.toString();

    fetch(`http://localhost:5000/issues?${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      });
  }, [categoryFilter, statusFilter]); // Re-fetch when filters change

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">All Reported Issues</h2>

      {/* --- Filter Section --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-base-200 rounded-lg">
        {/* Category Filter */}
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text font-semibold">Filter by Category</span>
          </label>
          <select
            className="select select-bordered"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Garbage">Garbage</option>
            <option value="Illegal Construction">Illegal Construction</option>
            <option value="Broken Public Property">Broken Public Property</option>
            <option value="Road Damage">Road Damage</option>
          </select>
        </div>

        {/* Status Filter  */}
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text font-semibold">Filter by Status</span>
          </label>
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="ongoing">Ongoing</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      {/* --- Issues Grid --- */}
      {issues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Use the 3-column grid layout [cite: 86] */}
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No issues found matching your filters.
        </p>
      )}
    </div>
  );
};

export default AllIssues;