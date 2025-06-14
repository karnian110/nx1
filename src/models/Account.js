import mongoose from 'mongoose';
import { accountTypeEnum } from '@/lib/siteStates';
const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountName: { type: String, required: true },
  accountType: { type: String, enum: accountTypeEnum, default: "General" },
  balance: { type: Number, default: 0 }
}, { timestamps: true });

// Index for performance
AccountSchema.index({ userId: 1 });

const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema);
export default Account;
