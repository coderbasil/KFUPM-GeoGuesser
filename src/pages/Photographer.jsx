import React from 'react';
import '../pages-css/Photographer.css';

const PhotographerPage = () => {
  return (
    <div className="photographer-page">
      <header className="photographer-header">
        <div></div> 
        
        <div className="header-center">
          <img 
            src="/assets/kfupm-logo.png" 
            alt="KFUPM Logo" 
            className="kfupm-logo"
          />
          <h1 className="welcome-text">Welcome Photographer!</h1>
        </div>

        <button className="logout-button">
          Log Out
        </button>
      </header>

      <div className="photographer-content">
        
        <div className="map-container">
          <h2 className="map-title">Select Photo Location</h2>
          <div className="google-map">
            <iframe
              title="kfupm-map"
              className="map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.491340296218!2d50.1487243150294!3d26.30941598336503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e7d5618e6a61%3A0x2e7a5a5d3d4f2e1e!2sKFUPM!5e0!3m2!1sen!2ssa!4v1629990000000!5m2!1sen!2ssa"
              style={{ width: '100%', height: '100%' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        <div className="upload-section">
          <form className="upload-form">
            <div className="file-upload-group">
              <input 
                type="file" 
                className="file-input"
                accept="image/*"
              />
              <span className="upload-label">
                Click to Upload Photo
              </span>
            </div>

            <div className="form-group">
              <textarea 
                className="description-input"
                placeholder="Enter photo description..."
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Photo
            </button>
          </form>
        </div>

        <div className="photo-table">
          <h2 className="table-title">Photo Submissions</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Difficulty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Main Library</td>
                <td>Medium</td>
                <td className="status-approved">Approved</td>
              </tr>
              <tr>
                <td>002</td>
                <td>Sports Complex</td>
                <td>Easy</td>
                <td className="status-pending">Pending</td>
              </tr>
              <tr>
                <td>003</td>
                <td>Building 24</td>
                <td>Hard</td>
                <td className="status-rejected">Rejected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhotographerPage;