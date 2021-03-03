import React from 'react'
import image from './poop.png';

export default function PoopActivity(props) {
    return (
        <img src={image} height={props.height || "50px"} width={props.width || "50px"} alt="Poop Activity"/>
    )
}
