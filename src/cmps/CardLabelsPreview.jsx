import React from 'react'

export function CardLabelsPreview(props) {

    const {labels} = props;  
    console.log('labels', labels)

    return (
        <div className="labels flex">
            {labels.map((lable, idx) => {
                return(
                    <div key={idx} className="label-style" style={{background: lable.color}}>{lable.txt}</div>
                )
            })}
        </div>
    )
}
