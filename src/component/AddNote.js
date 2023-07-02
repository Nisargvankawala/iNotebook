import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div style={{backgroundColor:"#0E26A0"}}>
            <h1 style={{ textAlign: "center" ,fontSize:"45px",color:"white"}}>Add Notes</h1>
            <div className="container" style={{ width: "33rem" }}>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-light" style={{fontSize:"20px"}}>Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" defaultValue={note.title} onClick={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-light" style={{fontSize:"20px"}}>Description</label>
                    <input type="text" className="form-control" id="description" name='description' defaultValue={note.description} onClick={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label text-light" style={{fontSize:"20px"}} >Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' defaultValue={note.description} onClick={onChange} minLength={5} required/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary btn-lgmy-3" onClick={handleClick}>Add Note</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
