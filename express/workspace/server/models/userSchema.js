import { Schema, model } from "mongoose";
import { getCurrentTime } from "../utils/utils.js";

const userSchema = new Schema({
    email: { type: String, required : true, unique : true },
    password: { type: String },
    name: { type: String },
    age : { type : Number, default : 0 },
    phone : { type : String, default : "000-0000-0000"},
    address: { type: String },
    provider : { type : String },
    createdAt: { type: String, default: getCurrentTime },
    updatedAt: { type: String, default: getCurrentTime },
});

// model("객체명", 스키마, "컬렉션(테이블)명");
export default model("User", userSchema, "users");