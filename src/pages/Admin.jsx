import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages-css/Admin.css';

const API_URL = 'http://localhost:5000/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [photographerRequests, setPhotographerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch photographer requests from the API
  const fetchPhotographerRequests = async () => {
    try {
      setLoading(true);
      // Mock data for testing - replace with actual API call when endpoint is ready
      // const response = await axios.get(`${API_URL}/photographer-requests`);
      // setPhotographerRequests(response.data);
      
      // Mock data for development/testing
      const mockData = [
        {
          _id: '1',
          username: 'photographer1',
          photoUrl: '/api/placeholder/100/75',
          coordinates: { lat: 26.3054, lng: 50.1411 }
        },
        {
          _id: '2',
          username: 'photographer2',
          photoUrl: '/api/placeholder/100/75',
          coordinates: { lat: 26.3089, lng: 50.1452 }
        }
      ];
      
      setPhotographerRequests(mockData);
      setError(null);
    } catch (err) {
      console.error('Error fetching photographer requests:', err);
      setError('Failed to load photographer requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts or when activeTab changes
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'photographers') {
      fetchPhotographerRequests();
    }
  }, [activeTab]);

  const handleLogout = () => {
    // Implement logout functionality
    // For example: clear localStorage, redirect to login page, etc.
    console.log('Logout clicked');
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      // Refresh the users list after deletion
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleApproveRequest = async (id) => {
    try {
      await axios.post(`${API_URL}/photographer-requests/${id}/approve`);
      // Refresh the photographer requests list after approval
      fetchPhotographerRequests();
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request. Please try again.');
    }
  };

  const handleDiscardRequest = async (id) => {
    try {
      await axios.post(`${API_URL}/photographer-requests/${id}/reject`);
      // Refresh the photographer requests list after rejection
      fetchPhotographerRequests();
    } catch (err) {
      console.error('Error discarding request:', err);
      setError('Failed to discard request. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">KFUPM GeoGusser</h1>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </header>
      
      <nav className="admin-nav">
        <button 
          className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users Accounts
        </button>
        <button 
          className={`nav-button ${activeTab === 'photographers' ? 'active' : ''}`}
          onClick={() => setActiveTab('photographers')}
        >
          Photographer requests
        </button>
      </nav>
      
      <main className="admin-main">
        {activeTab === 'users' && (
          <>
            <h2 className="section-title">Users Accounts</h2>
            
            {loading ? (
              <p>Loading users...</p>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchUsers}>Retry</button>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Username</th>
                    <th className="table-header">Type</th>
                    <th className="table-header4">   Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id || user.id}>
                      <td className="table-cell">{user._id || user.id}</td>
                      <td className="table-cell">{user.username}</td>
                      <td className="table-cell">{user.type}</td>
                      <td className="table-cell">
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteUser(user._id || user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        
        {activeTab === 'photographers' && (
          <>
            <h2 className="section-title">Photographer Requests</h2>
            
            {loading ? (
              <p>Loading photographer requests...</p>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchPhotographerRequests}>Retry</button>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Username</th>
                    <th className="table-header">Photo</th>
                    <th className="table-header">Coordinates</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {photographerRequests.map(request => (
                    <tr key={request._id || request.id}>
                      <td className="table-cell">{request._id || request.id}</td>
                      <td className="table-cell">{request.username}</td>
                      <td className="table-cell">
                        <img
                          src={request.photoUrl}
                          alt="Location"
                          className="request-photo"
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </td>
                      <td className="table-cell">
                        {request.coordinates ? 
                          `Lat: ${request.coordinates.lat}, Lng: ${request.coordinates.lng}` : 
                          'No coordinates provided'}
                      </td>
                      <td className="table-cell request-actions">
                        <button 
                          className="approve-button"
                          onClick={() => handleApproveRequest(request._id || request.id)}
                        >
                          Activate
                        </button>
                        <button 
                          className="discard-button"
                          onClick={() => handleDiscardRequest(request._id || request.id)}
                        >
                          Discard
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;