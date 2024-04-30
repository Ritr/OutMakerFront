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
    return (<div className="">
        <div className="w-full">
            <div>
                <textarea className="textarea textarea-bordered w-full" value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={() => {
                    setTimeout(() => {
                        window.scrollTo(0, 0)
                    }, 0);
                }} name="" id="" rows="3"></textarea>
            </div>
            <div className="mt-4">
                <button className={`btn btn-primary mr-4 ${saveNotesMutation.isLoading?"loading":""}`} onClick={saveNotesHandle}>Save</button>
                <button className="btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
    )
}
export default CartNotes;