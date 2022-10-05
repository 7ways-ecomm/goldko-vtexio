import React, { useState, useEffect } from "react";
import style from "./styles";

export default function Modal(props) {
    const {
        props: {
            message, success
        }
    } = props;

    console.log(props);

    const [ open, setOpen ] = useState(true);

    useEffect(() => {}, [open]);

    return (
        <>
            <div className={open ? style.modalOverlayOpen : style.modalOverlayClose} onClick={() => setOpen(false)}></div>
            <div className={open ? style.modalOpen : style.modalClose}>
                <span onClick={() => setOpen(false)} className={style.modalButtonClose}></span>
                <p>{message}</p>
            </div>
        </>
    )
}