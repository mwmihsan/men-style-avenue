
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, User } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Kasun Silva',
      rating: 5,
      comment: 'Excellent quality! Perfect fit and great material. Highly recommended.',
      date: '2024-06-10'
    },
    {
      id: '2',
      userName: 'Nimal Perera',
      rating: 4,
      comment: 'Good product, delivery was fast. Size was accurate according to the chart.',
      date: '2024-06-08'
    }
  ]);

  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const [showAddReview, setShowAddReview] = useState(false);

  const handleSubmitReview = () => {
    if (!newReview.userName.trim() || !newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ userName: '', rating: 5, comment: '' });
    setShowAddReview(false);
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-brand-gold' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="bg-brand-gray border-brand-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-4">
            <span>Customer Reviews</span>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-brand-gold">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Add Review Button */}
      <div className="text-center">
        <Button 
          onClick={() => setShowAddReview(!showAddReview)}
          className="btn-gold"
        >
          {showAddReview ? 'Cancel' : 'Write a Review'}
        </Button>
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <Card className="bg-brand-gray border-brand-gold/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-white font-semibold">Write Your Review</h3>
            
            <div>
              <label className="text-white text-sm mb-2 block">Your Name</label>
              <Input
                value={newReview.userName}
                onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                placeholder="Enter your name"
                className="bg-brand-dark border-brand-gold/30 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Rating</label>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview({ ...newReview, rating })
              )}
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this product..."
                className="w-full p-3 bg-brand-dark border border-brand-gold/30 text-white rounded-md resize-none h-24"
              />
            </div>

            <Button onClick={handleSubmitReview} className="btn-gold w-full">
              Submit Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-brand-gray border-brand-gold/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-gold/20 p-2 rounded-full">
                    <User className="h-4 w-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{review.userName}</p>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-300 leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
