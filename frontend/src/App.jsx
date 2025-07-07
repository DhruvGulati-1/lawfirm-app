import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({ clientName: '', caseType: '', description: '' });
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCases = async () => {
  try {
    const res = await axios.get('https://lawfirm-backend-zxys.onrender.com/api/cases');
    setCases(res.data.data); // <- FIXED LINE
  } catch (error) {
    console.error('Error fetching cases:', error);
  }
};

  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lawfirm-backend-zxys.onrender.com/api/cases', formData);
      setFormData({ clientName: '', caseType: '', description: '' });
      fetchCases(); // Refresh dashboard
    } catch (err) {
      console.error('Error submitting case:', err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Law Firm Case Portal</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Client Name:</label>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Case Type:</label>
          <input type="text" name="caseType" value={formData.caseType} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Case</button>
      </form>

      {/* Dashboard Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Submitted Cases</h2>
        {loading ? (
          <p>Loading...</p>
        ) : cases.length === 0 ? (
          <p>No cases submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {cases.map((c) => (
              <li key={c._id} className="bg-gray-100 p-3 rounded shadow">
                <p><strong>Client:</strong> {c.clientName}</p>
                <p><strong>Type:</strong> {c.caseType}</p>
                <p><strong>Description:</strong> {c.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
