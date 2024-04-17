import React, { useRef, useContext, useEffect, useState } from "react";
import { saveCartNotes } from "../../Hooks/api/saveOrderNotes";

const CartNotes = ({
    initNotes, onSubmit, onCancel
}) => {
    const [notes, setNotes] = useState(initNotes);
    const saveNotesMutation = saveCartNotes(notes);
    const saveNotesHandle = () => {
        saveNotesMutation.mutate();
    }
    useEffect(() => {
        if (saveNotesMutation.isSuccess) {
            onSubmit();
        }
    }, [saveNotesMutation.isSuccess])
    useEffect(() => {
        setNotes(initNotes);
    }, [initNotes])
    return (<>
        <textarea className="textarea textarea-bordered w-full" value={notes} onChange={(e) => setNotes(e.target.value)} name="" id="" rows="3"></textarea>
        <button className="btn btn-primary mr-4" onClick={saveNotesHandle}>Save</button>
        <button className="btn" onClick={onCancel}>Cancel</button>
    </>
    )
}
export default CartNotes;