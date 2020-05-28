import React from 'react'

export function IconPreview(props) {

    const { icon, num, color, isDone } = props;

    return (
        <div className="icon flex space-between">
            <div className={icon}></div>
            <div style={{ color: color }}>{(isDone || isDone === 0) && (isDone + '/')}{num}</div>
        </div>
    )
}
