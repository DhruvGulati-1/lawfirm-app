import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({ clientName: '', caseType: '', description: '' });
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCases = async () => {
    try {
      const res = await axios.get('https://lawfirm-backend-zxys.onrender.com/api/cases');
      console.log('Fetched response:', res.data); // Debug log
      setCases(res.data.data || []);              // Safely handle response
    } catch (error) {
      console.error('Error fetching cases:', error);
      setCases([]); // Fallback to empty array on error
    }
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
      fetchCases(); // Refresh list
    } catch (err) {
      console.error('Error submitting case:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Submit New Case</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="caseType"
          placeholder="Case Type"
          value={formData.caseType}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <h2>Submitted Cases</h2>
      {Array.isArray(cases) && cases.length > 0 ? (
        cases.map((c, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <strong>{c.clientName}</strong> - {c.caseType}
            <p>{c.description}</p>
          </div>
        ))
      ) : (
        <p>No cases found.</p>
      )}
    </div>
  );
};

export default App;
