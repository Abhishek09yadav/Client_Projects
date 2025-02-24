import mongoose from "mongoose";
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    services: String,
    pickup_date: String,
    pickup_time: String,
    Date: { type: Date, default: Date.now }

});
const Form = mongoose.model('DhobiForm', formSchema);
export default Form;