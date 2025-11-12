import { useEffect, useState } from 'react';
import { useParams }D 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Shared/Spinner';
import toast from 'react-hot-toast';

const IssueDetails = () => {
  const { id } = useParams(); // Get issue ID from the URL
  const { user } = useAuth();
  
  const [issue, setIssue] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Issue Details
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/issues/${id}`)
      .then(res => res.json())
      .then(data => {
        setIssue(data);
        setLoading(false);
      });
  }, [id]);

  // Fetch Contributors for this issue
  useEffect(() => {
    fetch(`http://localhost:5000/contributions/${id}`)
      .then(res => res.json())
      .then(data => {
        setContributors(data);
      });
  }, [id]); // Re-fetch if the ID changes

  const handleContributionSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const amount = parseInt(form.amount.value, 10);
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const additionalInfo = form.additionalInfo.value;

    const newContribution = {
      issueId: id, // Link to this issue
      issueTitle: issue.title,
      category: issue.category,
      amount,
      name,
      email: user.email, // Logged in user email
      phone,
      address,
      date: new Date(),
      additionalInfo,
      contributorImage: user.photoURL, // Add user's image for the table
    };

    // Post the new contribution to the server
    fetch('http://localhost:5000/contributions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContribution),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success('Contribution successful!');
          // Add new contribution to the list to update UI
          setContributors([...contributors, newContribution]);
          document.getElementById('contribution_modal').close(); // Close modal
          form.reset();
        }
      })
      .catch(err => toast.error(err.message));
  };

  if (loading || !issue) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-lg shadow-xl">
        
        {/* --- Issue Details Section --- */}
        <img src={issue.image} alt={issue.title} className="w-full h-96 object-cover rounded-lg mb-6" />
        <h2 className="text-4xl font-bold mb-4">{issue.title}</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-lg">
          <span className="font-semibold">Category: {issue.category}</span>
          <span className="text-gray-600">Location: {issue.location}</span>
          <span className="text-gray-600">Date: {new Date(issue.date).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 text-lg mb-6">{issue.description}</p>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="text-2xl font-bold text-primary">
            Suggested Budget: ${issue.amount}
          </span>
          {/* Pay Button opens the modal */}
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => document.getElementById('contribution_modal').showModal()}
          >
            Pay Clean-Up Contribution
          </button>
        </div>

        {/* --- Contributors Table Section --- */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            Recent Contributors
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((con, index) => (
                  <tr key={index}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={con.contributorImage || "https://i.ibb.co/Jq0x2Nq/user.png"} alt="Contributor" />
                        </div>
                      </div>
                    </td>
                    <td>{con.name}</td>
                    <td>${con.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Contribution Modal --- */}
      <dialog id="contribution_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-2xl mb-6">Make a Contribution</h3>
          <form onSubmit={handleContributionSubmit} className="space-y-4">
            
            <div className="form-control">
              <label className="label"><span className="label-text">Issue</span></label>
              <input type="text" value={issue.title} readOnly className="input input-bordered bg-base-200" />
            </div>

            <div className="flex gap-4">
              <div className="form-control flex-1">
                <label className="label"><span className="label-text">Amount</span></label>
                <input type="number" name="amount" placeholder="$" className="input input-bordered" required />
              </div>
              <div className="form-control flex-1">
                <label className="label"><span className="label-text">Your Name</span></label>
                <input type="text" name="name" defaultValue={user.displayName} className="input input-bordered" required />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="form-control flex-1">
                <label className="label"><span className="label-text">Email</span></label>
                <input type="email" value={user.email} readOnly className="input input-bordered bg-base-200" />
              </div>
              <div className="form-control flex-1">
                <label className="label"><span className="label-text">Phone Number</span></label>
                <input type="tel" name="phone" placeholder="017..." className="input input-bordered" required />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text">Address</span></label>
              <input type="text" name="address" placeholder="Your full address" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Additional Info (Optional)</span></label>
              <textarea name="additionalInfo" className="textarea textarea-bordered" placeholder="Any extra info..."></textarea>
            </div>

            <div className="modal-action mt-6">
              <button type="button" className="btn" onClick={() => document.getElementById('contribution_modal').close()}>Close</button>
              <button type="submit" className="btn btn-primary">Submit Contribution</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default IssueDetails;