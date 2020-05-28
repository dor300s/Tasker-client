import React from 'react'

export function CardLabelsPreview(props) {

    const { labels } = props;


    return (
        <div className="card-labels flex">
            {labels.map((lable, idx) => {
                return (
                    <div key={idx} className="card-label-style" style={{ background: lable.color }} />
                )
            })}
        </div>
    )
}
