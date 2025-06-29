import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['income', 'expense', 'transfer'], required: true },
  amount: { type: Number, required: true },
  category: { type: String }, // Optional: 'salary', 'bills', etc.
  description: { type: String },
  relatedAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' } // For 'transfer' type
}, { timestamps: true });

// Indexes for faster querying
TransactionSchema.index({ accountId: 1, createdAt: -1 });
TransactionSchema.index({ type: 1 });

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;
