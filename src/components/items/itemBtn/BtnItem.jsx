import React from 'react'

const BtnItem = ({ title, onClick, classCss }) => {
    return (
        <button onClick={onClick} className={classCss} >{title}</button>
    )
}

export default BtnItem
