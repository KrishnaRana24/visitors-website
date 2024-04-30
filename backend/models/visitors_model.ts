import { Schema, model, Document } from "mongoose";
import moment from "moment";

interface VisitorDocument extends Document {
  name: string;
  add: string;
  email: string;
  phone: Number;
  purpose: string;
  types: string;
  toMeet: string;
  meetPersonemail: string;
  date: Date;
}

const VisitorSignupSchema = new Schema<VisitorDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  add: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  purpose: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    required: true,
  },
  toMeet: {
    type: String,
    required: true,
  },
  meetPersonemail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

VisitorSignupSchema.pre<VisitorDocument>("save", function (next) {
  // Format date to "dd/mm/yyyy"
  this.date = moment(this.date).toDate();
  next();
});

const Visitor = model<VisitorDocument>("visitor", VisitorSignupSchema);

export default Visitor;
