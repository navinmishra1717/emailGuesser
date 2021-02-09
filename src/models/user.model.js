// user schema

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  emailPattern: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});

// write methods here
User.methods.create = function() {
  return new Promise((resolve, reject) => {
    this.save(function(err, user) {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

User.statics.patternCount = function(pattern) {
  return new Promise((resolve, reject) => {
    this.find(
      { emailPattern: new RegExp(pattern, "i"), isDeleted: false },
      function(err, result) {
        if (err) {
          reject(err);
        }
        resolve(result.length);
      }
    );
  });
};

module.exports = mongoose.model("User", User);
