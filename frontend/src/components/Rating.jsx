import  { useState, useEffect } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem('rating');
    return storedRating ? parseFloat(storedRating) : 0;
  }); // Initial rating state
  const [hoverRating, setHoverRating] = useState(0); // Initial hover rating state
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    return storedUsers || {};
  }); // Initial users state
  const [averageRating, setAverageRating] = useState(0); // Initial average rating state

  useEffect(() => {
    const storedRating = localStorage.getItem('rating');
    if (storedRating) {
      setRating(parseFloat(storedRating));
    }

    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []); // Runs on component mount only

  useEffect(() => {
    const usersCount = Object.keys(users).length;

    // Calculate average rating
    const ratingsSum = Object.values(users).reduce((acc, curr) => acc + curr, 0);
    const average = usersCount > 0 ? ratingsSum / usersCount : 0;
    setAverageRating(average);
  }, [users]); // Runs whenever users state changes

  // Function to handle when a star is clicked
  const handleStarClick = (starIndex) => {
    // If the star is already selected, deselect it
    // Otherwise, set the rating to the index of the clicked star
    const newRating = starIndex === rating ? 0 : starIndex;
    setRating(newRating);
    localStorage.setItem('rating', newRating);

    // Set the current user rating
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      const randomUserId = Math.random().toString(36).substring(7);
      localStorage.setItem('currentUser', randomUserId);
    }

    // Update users rating
    const updatedUsers = { ...users };
    updatedUsers[localStorage.getItem('currentUser')] = newRating;
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Function to handle when mouse enters a star
  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  // Function to handle when mouse leaves the star container
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
      <p>Users Count: {Object.keys(users).length}</p>
      <p>Average Rating: {averageRating.toFixed(1)}/5</p>
    </div>
  );
};

export default StarRating;
