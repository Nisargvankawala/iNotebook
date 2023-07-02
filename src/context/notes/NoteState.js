import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // const s1 = {
    //     "name": "nisarg",
    //     "class": "5b"
    // }

    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "vankawala",
    //             "class": "7b"
    //         })
    //     }, 1000);
    // }

    const host = "http://localhost:4000";

    const notesIntial = []

    const [notes, setNotes] = useState(notesIntial)

    //Get all Note
    const getNotes = async () => {

        //Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log(json)
        setNotes(json)
    }


    //Add a Note
    const addNote = async (title, description, tag) => {

        //TODO:Api
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });


        // console.log("Adding a Note")
        const note = await response.json();
        setNotes(notes.concat(note))
    }


    //Delete a Note
    const deleteNote = async (id) => {
        //Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = response.json();
        console.log(json);


        console.log("Deleting a Note " + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }


    //Edit a Note
    const editNote = async (id, title, description, tag) => {

        //Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), 
        });

        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))

        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        // console.log(newNotes);
        setNotes(newNotes)
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;