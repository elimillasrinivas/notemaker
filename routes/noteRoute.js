const {createNote,updateNote,deleteNote,getAllNotes,getNote, deleteAll}=require("../controllers/noteController")
const {auth}=require("../authentication/auth")

const express=require("express")
const router=express.Router()

router.post("/create",createNote)
router.get("/:noteID",getNote)
router.put("/:noteID",updateNote)
router.delete("/:noteID",deleteNote)
router.delete("/deleteall",deleteAll)
router.get("/allnotes",getAllNotes)

module.exports=router
