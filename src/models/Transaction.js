import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['credit', 'debit', 'transfer'], required: true },
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
