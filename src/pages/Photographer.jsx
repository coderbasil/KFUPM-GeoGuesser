import React, { useRef, useState, useEffect } from "react";
import "../pages-css/Photographer.css";

const PhotographerPage = () => {
  const campusMap = "/assets/map.png";

  const [showMapModal, setShowMapModal] = useState(false);
  const [formData, setFormData] = useState({
    photo: null,
    difficulty: "Easy",
    locationName: "",
    coordinates: null,
  });

  const handleSubmit = async (e) => {
    console.log("hi");
    e.preventDefault();
    const fd = new FormData();
    fd.append("photo", formData.photo);
    fd.append("difficulty", formData.difficulty);
    fd.append("x", formData.coordinates.x);
    fd.append("y", formData.coordinates.y);

    await fetch("http://16.16.122.240:5000/api/upload/photos", {
      method: "POST",
      body: fd,
    });
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow || "";
    if (showMapModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => (document.body.style.overflow = originalOverflow);
  }, [showMapModal]);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const containerRef = useRef(null);
  const mapImageRef = useRef(null);

  useEffect(() => {
    if (showMapModal) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [showMapModal]);

  useEffect(() => {
    const img = new Image();
    img.src = campusMap;
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = (e) => console.error("Failed to load map image", e);
  }, [campusMap]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((fd) => ({ ...fd, [name]: files ? files[0] : value }));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(3, Math.max(0.5, scale * (1 + delta)));
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left,
      my = e.clientY - rect.top;
    const newX = mx - (mx - offset.x) * (newScale / scale);
    const newY = my - (my - offset.y) * (newScale / scale);
    setScale(newScale);
    setOffset({ x: newX, y: newY });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setDragMoved(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragMoved(true);
    setOffset((o) => ({ x: o.x + e.movementX, y: o.y + e.movementY }));
  };

  const handleMouseUp = () => setDragging(false);

  const handleMapClick = (e) => {
    if (dragMoved) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left - offset.x) / scale;
    const rawY = (e.clientY - rect.top - offset.y) / scale;
    setFormData((fd) => ({ ...fd, coordinates: { x: rawX, y: rawY } }));
  };

  const handleConfirmLocation = () => {
    setShowMapModal(false);
  };

  return (
    <div className="photographer-page">
      <header className="photographer-header">
        <div className="header-center">
          <img
            src="/assets/kfupm-logo.png"
            alt="KFUPM Logo"
            className="kfupm-logo"
          />
          <h1 className="welcome-text">Welcome Photographer!</h1>
        </div>
        <button className="logout-button">Log Out</button>
      </header>

      <div className="photographer-content">
        <div className="upload-container">
          <h2 className="section-title">Upload New Photo</h2>
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="file-upload-group">
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="file-input"
                onChange={handleInputChange}
              />
              <span className="upload-label">
                {formData.photo?.name || "Click to Upload Photo"}
              </span>
            </div>

            <div className="form-group">
              <label className="input-label">Difficulty</label>
              <select
                name="difficulty"
                className="form-input"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Location Name</label>
              <input
                type="text"
                name="locationName"
                className="form-input"
                value={formData.locationName}
                onChange={handleInputChange}
                placeholder="Enter location name"
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                className="map-button"
                onClick={() => setShowMapModal(true)}
              >
                Select Map Location
              </button>
              {formData.coordinates && (
                <div className="coordinates-display">
                  Coordinates: X {Math.round(formData.coordinates.x)}, Y{" "}
                  {Math.round(formData.coordinates.y)}
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">
              Submit Photo
            </button>
          </form>
        </div>

        <div className="submissions-container">
          <h2 className="section-title">Photo Submissions</h2>
          <div className="photo-table">
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

      {showMapModal && (
        <div className="map-modal">
          <div className="map-modal-content">
            <h2>Select Location on Map</h2>
            <div className="map-container-wrapper">
              <div
                className="map-container"
                ref={containerRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={campusMap}
                  alt="Campus Map"
                  ref={mapImageRef}
                  className="map-image"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: "top left",
                    width: imageDimensions.width,
                    height: imageDimensions.height,
                  }}
                  draggable={false}
                />

                <div
                  className="map-click-layer"
                  onClick={handleMapClick}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    cursor: isDragging ? "grabbing" : "grab",
                  }}
                />

                {formData.coordinates && (
                  <div
                    className="marker"
                    style={{
                      left: formData.coordinates.x * scale + offset.x,
                      top: formData.coordinates.y * scale + offset.y,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="map-modal-actions">
              <button className="confirm-btn" onClick={handleConfirmLocation}>
                Confirm Location
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowMapModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerPage;
