const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    createdRecipes: [{
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    }],
    shoppingList: [{
      name: {
        type: String,
      },
      amount: {
        type: Number,
      },
      unit: {
          type: String,
      },
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
