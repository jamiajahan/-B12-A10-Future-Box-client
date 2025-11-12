import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Shared/Spinner';
import toast from 'react-hot-toast';

const MyIssues = () => {
  const { user } = useAuth();
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null); // For editing

  // Fetch issues by email
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/issues-by-email/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setMyIssues(data);
        setLoading(false);
      });
  }, [user.email]);

  // Handle opening the edit modal
  const openEditModal = (issue) => {
    setSelectedIssue(issue);
    document.getElementById('edit_modal').showModal();
  };

  // Handle the update form submission
  const handleUpdateIssue = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      amount: parseInt(form.amount.value, 10),
      description: form.description.value,
      status: form.status.value, // Get status from radio
    };

    // Send PUT request to the server
    fetch(`http://localhost:5000/issues/${selectedIssue._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedIssue),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Issue updated successfully!');
          // Update the UI
          setMyIssues(prevIssues => 
            prevIssues.map(issue => 
              issue._id === selectedIssue._id ? { ...issue, ...updatedIssue } : issue
            )
          );
          document.getElementById('edit_modal').close();
        }
      })
      .catch(err => toast.error(err.message));
  };

  // Handle deleting an issue
  const handleDeleteIssue = (id) => {
    // Show confirmation modal
    if (window.confirm('Are you sure you want to delete this issue?')) {
      fetch(`http://localhost:5000/issues/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            toast.success('Issue deleted successfully!');
            // Remove the issue from the UI
            setMyIssues(prevIssues => prevIssues.filter(issue => issue._id !== id));
          }
        })
        .catch(err => toast.error(err.message));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">My Reported Issues</h2>
      
      {/* Table Format */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myIssues.map((issue) => (
              <tr key={issue._id}>
                <td>
                  <div className="font-bold">{issue.title}</div>
                  <div className="text-sm opacity-50">{issue.location}</div>
                </td>
                <td>{issue.category}</td>
                <td>
                  <span className={`badge ${
                    issue.status === 'ongoing' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {issue.status}
                  </span>
                </td>
                <td>${issue.amount}</td>
                <th className="space-x-2">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => openEditModal(issue)} //
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-error btn-sm"
                    onClick={() => handleDeleteIssue(issue._id)} //
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Edit Modal --- */}
      {selectedIssue && (
        <dialog id="edit_modal" className="modal">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-2xl mb-6">Update Issue</h3>
            <form onSubmit={handleUpdateIssue} className="space-y-4">
              
              <div className="form-control">
                <label className="label"><span className="label-text">Title</span></label>
                <input type="text" name="title" defaultValue={selectedIssue.title} className="input input-bordered" required />
              </div>

              <div className="flex gap-4">
                <div className="form-control flex-1">
                  <label className="label"><span className="label-text">Category</span></label>
                  <select name="category" defaultValue={selectedIssue.category} className="select select-bordered" required>
                    <option value="Garbage">Garbage</option>
                    <option value="Illegal Construction">Illegal Construction</option>
                    <option value="Broken Public Property">Broken Public Property</option>
                    <option value="Road Damage">Road Damage</option>
                  </select>
                </div>
                <div className="form-control flex-1">
                  <label className="label"><span className="label-text">Amount</span></label>
                  <input type="number" name="amount" defaultValue={selectedIssue.amount} className="input input-bordered" required />
                </div>
              </div>

              {/* Status Update */}
              <div className="form-control">
                <label className="label"><span className="label-text">Status</span></label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="status" value="ongoing" defaultChecked={selectedIssue.status === 'ongoing'} className="radio radio-primary" />
                    <span>Ongoing</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="status" value="ended" defaultChecked={selectedIssue.status === 'ended'} className="radio radio-primary" />
                    <span>Ended</span>
                  </label>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Description</span></label>
                <textarea name="description" defaultValue={selectedIssue.description} className="textarea textarea-bordered h-24" required></textarea>
              </div>

              <div className="modal-action mt-6">
                <button type="button" className="btn" onClick={() => document.getElementById('edit_modal').close()}>Close</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyIssues;