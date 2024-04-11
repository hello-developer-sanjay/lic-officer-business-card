import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarRating = () => {
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem('rating');
    return storedRating ? parseFloat(storedRating) : 0;
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://eduxcel-api3-j9a2.onrender.com/ratings');
        const { data } = response;
        setUsersCount(data.length);
        setAverageRating(
          data.reduce((sum, rating) => sum + rating.rating, 0) / data.length
        );
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchData();
  }, []);

  const handleStarClick = async (starIndex) => {
    const newRating = starIndex === rating ? 0 : starIndex;
    setRating(newRating);
    localStorage.setItem('rating', newRating);

    try {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        const randomUserId = Math.random().toString(36).substring(7);
        localStorage.setItem('currentUser', randomUserId);
      }

      await axios.post('https://eduxcel-api3-j9a2.onrender.com/ratings', {
        userId: localStorage.getItem('currentUser'),
        rating: newRating,
      });

      const response = await axios.get('https://eduxcel-api3-j9a2.onrender.com/ratings');
      const { data } = response;
      setUsersCount(data.length);
      setAverageRating(
        data.reduce((sum, rating) => sum + rating.rating, 0) / data.length
      );
    } catch (error) {
      console.error('Error updating ratings:', error);
    }
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div
      onMouseLeave={handleStarLeave}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
          >
            {starValue <= (hoverRating || rating) ? '★' : '☆'}
          </span>
        );
      })}
      <p>Current Rating: {hoverRating || rating}/5</p>
      <p>Users Count: {usersCount}</p>
      <p>Average Rating: {isNaN(averageRating) ? '0' : averageRating.toFixed(1)}/5</p>
    </div>
  );
};

export default StarRating;
  
