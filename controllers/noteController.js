const Note=require("../models/noteModel")


const createNote=async(req,res)=>{
    try {
        const note=await new Note({...req.body})
        note.date=Date().slice(4,25)
        // note.noteID=req.result._id
        note.save().then((data)=>{
            res.json({
                message:"Note created",
                result:data
            })
        })


    } catch (error) {
        console.log(error);
    }
}

const getNote=async(req,res)=>{
    await Note.find({noteID:req.body._id}).then((data)=>{
        res.json({
            message:"specific note",
            result:data
        })
    })
}

const updateNote=async(req,res)=>{
    await Note.findByIdAndUpdate(req.params.noteID,req.body).then((data)=>{
        res.json({
            message:"updated note",
            result:data
        })
    })
}

const deleteNote=async(req,res)=>{
    await Note.findByIdAndDelete(req.params.noteID).then((data)=>{
        res.json({
            message:"note deleted",
            result:data
        })
    })
}
const deleteAll=async(req,res)=>{
        await Note.deleteMany({},(err)=>{
            if(err) res.json({message:"Error"})
            else console.log("All Notes Deleted");
        })
}

const getAllNotes=async(req,res)=>{
    await Note.find().then((data)=>{
        res.json({
            message:"All notes",
            result:data
        })
    })
}

module.exports={createNote,updateNote,deleteNote,getAllNotes,getNote,deleteAll}