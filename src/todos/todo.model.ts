import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
