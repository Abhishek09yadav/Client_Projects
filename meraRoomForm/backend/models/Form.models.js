import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    studentName: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    guardianName: { type: String, required: true, trim: true },
    guardianPhone: { type: String, required: true, trim: true },
    guardianRelation: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },

    // Second form details
    hostelName: { type: String, required: true, trim: true },
    hostelType: { 
        type: String, 
        enum: [ "Boys Hostel", "Girls Hostel"], 
       
        required: true
    },
    idProofType: { 
        type: String, 
        // enum: [ "Aadhar", "PAN", "Driving License", "Passport"], 
      
        required: true
    },
    idProof: { type: String, required: true, trim: true },
    roomNo: { type: String, required: true, trim: true },
    BookingDate: { type: Date, default: Date.now}
});

const Form = mongoose.model('HostelBooking', formSchema);
export default Form;
