import React from 'react'
import "./button.css"
export default function Button(props) {
    const {name, onClick} = props
    return (
        <>
         <button onClick={onClick}>{name}</button>   
        </>
    )
}
