import { Schema, model, Document } from "mongoose";

interface VisitorDocument extends Document {
  name: string;
  address: string;
  email: string;
  phone: Number;
  purpose: string;
  types: string;
  tomeet: string;
  meetPersonEmail: string;
  date: Date;
}

const VisitorSignupSchema = new Schema<VisitorDocument>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },
  purpose: {
    type: String,
    required: true,
  },
  tomeet: {
    type: String,
    required: true,
  },
  meetPersonEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Visitor = model<VisitorDocument>("visitor", VisitorSignupSchema);

export default Visitor;
