const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');

const UserSchema = new mongoose.Schema({
  // ── Basic Info ────────────────────────────────────
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false   // never return password in queries
  },

  // ── Unique Client ID (auto-generated) ─────────────
  clientId: {
    type: String,
    unique: true
  },

  // ── Password Reset ────────────────────────────────
  resetPasswordToken:   String,
  resetPasswordExpire:  Date,

  // ── Timestamps ────────────────────────────────────
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ── Generate unique Client ID before saving ────────────────────
UserSchema.pre('save', async function (next) {
  // Hash password only when it's new or modified
  if (this.isModified('password')) {
    const salt    = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Generate clientId only on first save
  if (this.isNew && !this.clientId) {
    this.clientId = 'CL-' + Date.now().toString(36).toUpperCase() +
                    '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  next();
});

// ── Compare entered password with hashed ──────────────────────
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ── Generate password reset token ─────────────────────────────
UserSchema.methods.getResetPasswordToken = function () {
  // Generate raw token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash and store in DB
  this.resetPasswordToken  = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken; // return raw token (sent in email)
};

module.exports = mongoose.model('User', UserSchema);
