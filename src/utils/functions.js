export const calculateMeanRating = (reviews) => {
  const ratings = reviews.map((review) => review.rating);
  const meanRating =
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

  return meanRating;
};