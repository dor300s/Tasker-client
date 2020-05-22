import React from 'react'

export function IconPreview(props) {

    const {icon, num} = props

    return (
        <div className="icon flex">
            <div className={icon}></div>
            <div className="value">{num}</div>
        </div>
    )
}
