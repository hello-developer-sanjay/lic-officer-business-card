import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled form components
const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top : 2rem;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Styled review list components
const ReviewsWrapper = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

const ReviewItem = styled.li`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false); // State to track submission status

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://eduxcel-api3-j9a2.onrender.com/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !comment || submitting) return; // Prevent submission while already submitting
    try {
      setSubmitting(true); // Set submitting to true when starting the submission
      const response = await axios.post('https://eduxcel-api3-j9a2.onrender.com/reviews', {
        username,
        comment,
      });
      setReviews([...reviews, response.data]);
      setUsername('');
      setComment('');
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setSubmitting(false); // Set submitting back to false when submission is complete
    }
  };

  return (
    <div>
      <FormWrapper>
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <Label>
            Username:
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
          <Label>
            Comment:
            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Label>
          <Button type="submit">{submitting ? 'Submitting Review...' : 'Submit Review'}</Button>
        </form>
      </FormWrapper>
      
      <ReviewsWrapper>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <ReviewItem key={review._id}>
              <strong>{review.username}:</strong> {review.comment}
            </ReviewItem>
          ))}
        </ul>
      </ReviewsWrapper>
    </div>
  );
};

export default Review;
