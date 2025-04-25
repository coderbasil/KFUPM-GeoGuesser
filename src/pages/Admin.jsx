import React, { useState } from 'react';
import '../pages-css/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', type: 'admin' },
    { id: 2, username: 'AlouLab', type: 'player' },
    { id: 3, username: 'Ahmed', type: 'Photographer' }
  ]);

  const handleLogout = () => {
    
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
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
        <button 
          className={`nav-button ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos storage
        </button>
      </nav>
      
      <main className="admin-main">
        {activeTab === 'users' && (
          <>
            <h2 className="section-title">Users Accounts</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="table-header">ID</th>
                  <th className="table-header">Username</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="table-cell">{user.id}</td>
                    <td className="table-cell">{user.username}</td>
                    <td className="table-cell">{user.type}</td>
                    <td className="table-cell">
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        

      </main>
    </div>
  );
};

export default Admin;