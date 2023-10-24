'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

import { type Review } from '@/api/types';

const useReviewState = (initialReviews: Review[]) =>
	useState<Review[]>(initialReviews);

export const ReviewsContext = createContext<ReturnType<
	typeof useReviewState
> | null>(null);

const ReviewsProvider = ({
	reviews: initialReviews,
	children,
}: {
	reviews: Review[];
	children: ReactNode;
}) => {
	const [reviews, setReviews] = useReviewState(initialReviews);

	return (
		<ReviewsContext.Provider value={[reviews, setReviews]}>
			{children}
		</ReviewsContext.Provider>
	);
};

export default ReviewsProvider;

export const useReviews = () => {
	const reviews = useContext(ReviewsContext);
	if (!reviews) {
		throw new Error('useReview must be used within a ReviewProvider');
	}
	return reviews;
};
