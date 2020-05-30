import React from 'react'

export default function waveLoader() {
    return (
        <div className="wave-fill" style={{width: "400px" , height: "400px"}}>
            <div className="water">
                <span className="wave"></span>
                <span className="deep-water"></span>
            </div>
        </div>
    )
}
