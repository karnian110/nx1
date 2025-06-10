'server only'
import 'server-only'
import mongoose from "mongoose";
import { accountTypeEnum } from '@/siteStates'

const AccountSchema = new mongoose.Schema(
  {
    accounts: [
      {
        accountName: { type: String, required: true, trim: true },
        balance: { type: Number, required: true }, // negative values allowed
        accountType: {
          type: String,
          required: true,
          enum: accountTypeEnum,
          trim: true,
        },
        reference: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

const Account =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default Account;
