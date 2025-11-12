import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios'; // <-- Import the secure axios hook
import { Helmet } from 'react-helmet-async'; // For dynamic title

const AddIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios(); // <-- Use the hook
  const [category, setCategory] = useState('');

  const handleAddIssue = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    // Convert amount to a number
    const amount = parseInt(form.amount.value, 10);

    // Get data automatically as per requirements
    const email = user.email; [cite_start]// [cite: 81]
    const date = new Date(); [cite_start]// [cite: 80]
    const status = 'ongoing'; [cite_start]// [cite: 79]

    // Check if category is selected
    if (!category) {
      toast.error('Please select a category.');
      return;
    }

    const newIssue = {
      title,
      category,
      location,
      description,
      image,
      amount,
      email,
      date,
      status,
    };

    // --- Send data to the server using Axios ---
    axiosSecure.post('/issues', newIssue)
      .then(res => {
        if (res.data.insertedId) {
          [cite_start]toast.success('Issue reported successfully!'); // [cite: 83]
          form.reset(); // Clear the form
          setCategory(''); // Reset category state
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>CleanCommunity | Add Issue</title>
      </Helmet>
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Report a New Issue
        </h2>
        <form onSubmit={handleAddIssue} className="space-y-6">
          {/* Row 1: Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Issue Title</span>
            </label>
            <input>
              type="text"
              [cite_start]name="title" // [cite: 73]
              placeholder="e.g., Overflowing garbage bin"
              className="input input-bordered"
              required
            </input>
          </div>

          {/* Row 2: Category & Location */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category Dropdown */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select>
                [cite_start]className="select select-bordered" // [cite: 74]
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                <option value="" disabled>Select a category</option>
                <option value="Garbage">Garbage</option>
                <option value="Illegal Construction">Illegal Construction</option>
                <option value="Broken Public Property">Broken Public Property</option>
                <option value="Road Damage">Road Damage</option>
              </select>
            </div>
            {/* Location */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input>
                type="text"
                [cite_start]name="location" // [cite: 75]
                placeholder="e.g., Mohakhali, Dhaka"
                className="input input-bordered"
                required
              </input>
            </div>
          </div>

          {/* Row 3: Image URL & Amount */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image URL */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input>
                type="text"
                [cite_start]name="image" // [cite: 77]
                placeholder="https://"
                className="input input-bordered"
                required
              </input>
            </div>
            {/* Amount */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Suggested Fix Budget</span>
              </label>
              <input>
                type="number"
                [cite_start]name="amount" // [cite: 78]
                placeholder="$200"
                className="input input-bordered"
                required
                </input>
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea>
              [cite_start]name="description" // [cite: 76]
              className="textarea textarea-bordered h-28"
              placeholder="Describe the issue in detail..."
              required
            </textarea>
          </div>

          {/* Row 5: Email (Read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Reporter Email</span>
            </label>
            <input>
              type="email"
              value={user?.email || [cite_start]'Loading...'} // [cite: 81]
              readOnly
              className="input input-bordered bg-base-200"
            </input>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;