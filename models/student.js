import mongoose from "mongoose";

//methana thmai schema ek hdenne
const studentSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        city: String

    }
)

//dn hdnne model ek.. ar adala collection ek controll krn remote ek
const Student = mongoose.model("Student", studentSchema)

export default  Student
