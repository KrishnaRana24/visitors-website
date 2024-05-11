import { Schema, model, Document } from "mongoose";

interface Review extends Document {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

const VisitorReviewSchema = new Schema<Review>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: String,
});

const VisitorReview = model<Review>("visitorReview", VisitorReviewSchema);

export default VisitorReview;
