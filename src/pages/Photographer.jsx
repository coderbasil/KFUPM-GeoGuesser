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
              style={{ width: '100%', height: '100%' }}
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
      </div>
    </div>
  );
};

export default PhotographerPage;