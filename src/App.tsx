import './App.css';
import Card from './Card';

function App() {
  return (
    <div className="container">
      {/* Left Panel with Profile and Filter Sections */}
      <div className="leftPanel">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-icon">
            {/* Profile Icon (use an actual image or icon component) */}
            <img src="/path/to/profile-icon.png" alt="Profile Icon" className="profile-image" />
          </div>
          <div className="profile-text">
            <p>My Profile</p>
            <p>Log Out</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h2>Filter by your needs</h2>
          {/* Example filter buttons */}
          <button className="filter-button">Option 1</button>
          <button className="filter-button">Option 2</button>
          <button className="filter-button">Option 3</button>
        </div>
      </div>

      {/* Right Panel with Cards */}
      <div className="rightPanel">
        <div className="card-row">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="card-row">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="results-count">
          6 results
        </div>
      </div>
    </div>
  );
}

export default App;
