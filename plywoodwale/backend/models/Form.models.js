import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    whatsapp: {type: String, required: true, trim: true},
    company: {type: String, trim: true},
    address: {type: String, trim: true},
    reference: {type: String, trim: true},
    youAre: {
        type: String,
        enum: ["End User", "Architect/Interior Designer", "Contractor"],
        required: true,
    },
    Date: {type: Date, default: Date.now}
});

const Form = mongoose.model('PlyWoodWale', formSchema);
export default Form;
