import React from 'react'
import image from './pee.png'; // with import

export default function PeeActivity(props) {
    return (
        <img src={image} height={props.height || "50px"} width={props.width || "50px"} alt="Pee Activity"/>
    )
}
