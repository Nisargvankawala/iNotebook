const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require("../models/Note");

// ROUTES 1 :Get All the notes using : GET "/api/notes/getuser" . Login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})


// ROUTES 2 :Add a new note using : POST "/api/notes/addnote" . Login required 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be of 5 character').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        //if there are error, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.json(savedNote);
        // console.log(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})


// ROUTES 3 :Update an existing note using : PUT "/api/notes/updatenote" . Login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    
    try {
        const { title, description, tag } = req.body;
        //Create a newNote object
        const newNote = {};

        //if you change anything , it will be updated
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be update and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})


// ROUTES 4 :Delete an existing note using : DELETE "/api/notes/deletenote" . Login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //allow deletion only if user owns it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "This notes has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})
module.exports = router
