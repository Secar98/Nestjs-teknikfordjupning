import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export interface Todo {
  _id: string;
  content: string;
  user: Array<string>;
}
