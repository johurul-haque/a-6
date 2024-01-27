import { env } from '@/config';
import { hash } from 'bcrypt';
import { Schema, model } from 'mongoose';
import { User } from './user.interface';

const userModelSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, { __v, _id, password, ...rest }) => rest,
    },
  }
);

userModelSchema.pre('save', async function (next) {
  this.password = await hash(this.password, env.saltRounds);

  next();
});

export const UserModel = model('user', userModelSchema);
