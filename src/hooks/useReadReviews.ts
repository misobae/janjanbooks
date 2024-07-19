import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { bookReviewState } from '../recoil/review';

export const useReadReviews = () => {
  const bookReviews = useRecoilValue(bookReviewState);
  const readReviews = useMemo(() => bookReviews.filter(review => review.cat === "read"), [bookReviews]);

  return { readReviews };
};