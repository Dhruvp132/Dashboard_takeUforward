import React, { useState } from 'react';
import { Timer } from "../components/Timer";

export const Dashboard = () => {
  const [showTimer, setShowTimer] = useState(true); // Manage the visibility of the Timer component

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTimer(event.target.checked); // Update the state based on the checkbox
  };

  return (
    <div>
      <div className=" p-4 flex items-center space-x-2">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={showTimer}
          onChange={handleToggleChange}
        />
        <div
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${showTimer ? 'bg-red-500' : 'bg-gray-200'}`}
          onClick={() => setShowTimer(!showTimer)} // Toggle visibility on click
          style={{
            backgroundColor: showTimer ? '#ef4444' : '#e5e7eb', // Use inline styles to ensure the color changes
            transition: 'background-color 0.3s ease' // Smooth color transition
          }}
        >
          <div
            className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${showTimer ? 'translate-x-full' : ''}`}
          ></div>
        </div>
        <span className='ml-2'>
          {showTimer ? 'Click here to hide the banner' : 'Click here to show the banner'}
        </span>
      </div>

      <div className='mt-5'>
        {showTimer && <Timer />} 
      </div>
    </div>
  );
};
