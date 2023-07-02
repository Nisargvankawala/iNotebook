import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props;

    const handleClick = () => {
        deleteNote(note._id)
    }
    const handleEdit = () => {
        updateNote(note)
    }
    return (
        // <div className='col-md-4 '>
        //     <div className="card my-3" >
        //         <div className="card-body">
        //             <div className="d-flex align-items-center">
        //                 <h5 className="card-title">{note.title}</h5>
        //                 <i className="fa-solid fa-trash-can mx-2" onClick={handleClick}></i>
        //                 <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit}></i>
        //             </div>
        //             <p className="card-text">{note.description}</p>

        //         </div>
        //     </div>
        // </div>
        <div className="container bootstrap snippets bootdey col-md-4">
            <div  className='row'>
                <ul className="notes">
                    <li>
                        <div className="rotate-1 lazur-bg">
                            <h3>{note.title}</h3>
                            <p>{note.description}</p>
                            <i className="fa-solid fa-pen-to-square mx-2 text-success pull-right" onClick={handleEdit}></i>
                            <i className="fa-solid fa-trash-can text-danger pull-right" onClick={handleClick}></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default Noteitem
