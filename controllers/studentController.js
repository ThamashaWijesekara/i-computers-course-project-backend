import Student from "../models/student.js"

//me liyl thyenne .then use krl parana wdyt
/*export function getAllStudent(req,res){
     Student.find().then(
        (studentProp)=>{   
            res.json(studentProp)
        }
    )
}*/
export async function getAllStudent(req,res){
    try{
        const student = await Student.find()
        console.log(student)
        res.json(student)
    }catch(error){
        console.log(error)
        res.json(
            {
                message: "Internal server error"
            }
        )
    }
}

//me liyl thyenne .then use krl parana wdyt  
/*export function createStudent(req,res){
    console.log(req.body)

    const student = new Student(req.body)

    student.save().then(()=>{
        res.json(
            {
                message: "Student saved successfully!"
            }
        )
    })
}*/

export async function createStudent(req, res){

    const student = new Student(req.body)
    try{
         if(isAdmin(req)){  
            const s = await student.save()
            console.log(student)
            res.json(
                {
                    message: "Student saved successfully!"
                }
            )
        }
        else{
            res.json({
                message: "You are not autherized"
            })
        }
        
    }catch(error){
        console.log(error)
        res.json(error)
    }
}

