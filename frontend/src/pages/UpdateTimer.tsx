import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate }from "react-router-dom"

export const UpdateTimer = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate date
  const isValidDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Convert inputs to numbers for validation
    const day = parseInt(date, 10);
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (!day || !monthNumber || !yearNumber || isNaN(day) || isNaN(monthNumber) || isNaN(yearNumber)) {
      alert('Please enter valid numbers for date, month, and year.');
      return;
    }

    if (monthNumber < 1 || monthNumber > 12 || day < 1 || day > 31 || yearNumber < 1900 || yearNumber > 2100) {
      alert('Date, month, or year is out of range.');
      return;
    }

    if (!isValidDate(day, monthNumber, yearNumber)) {
      alert('Invalid date. Please check the day and month.');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true); // Show loader

    try {
      await axios.post('http://localhost:3000/api/v1/update', {
        date: day.toString(),
        month: monthNumber.toString(),
        year: yearNumber.toString(),
        description,
      });

      navigate('/'); // Redirect to '/'
    } catch (error) {
      alert('Please try again'); // Show alert on error
    } finally {
      setIsSubmitting(false);
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input
              type="number"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DD"
              required
            />
          </div>
          <div>
            <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Month</label>
            <input
              type="number"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="MM"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="YYYY"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description (optional)</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
