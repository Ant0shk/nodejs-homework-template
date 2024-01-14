import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user", //значить що реверенс на коллекцію Юзер
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleSaveError);
contactsSchema.post("findOneAndUpdate", handleSaveError);
contactsSchema.pre("findOneAndUpdate", preUpdate);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": '"name" must be string"',
  }),
  email: Joi.string().required().messages({
    "string.base": '"email" must be string"',
  }),
  phone: Joi.string().required().messages({
    "string.base": '"phone" must be string"',
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": '"name" must be string"',
  }),
  email: Joi.string().messages({
    "string.base": '"email" must be string"',
  }),
  phone: Joi.string().messages({
    "string.base": '"phone" must be string"',
  }),
  favorite: Joi.boolean(),
});


const Contact = model("contact", contactsSchema);

export default Contact;
