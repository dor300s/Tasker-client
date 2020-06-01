import React from 'react'

export function CardLabelsPreview(props) {

    const { labels , card } = props;


    return (
        <div className="card-labels flex">
            {labels.map((lable, idx) => {
                return (
                    <div key={idx} className="card-label-style" 
                    style={{ background: lable.color , marginTop:`${(card.attachments.length > 0)?"0px" : "5px"}`}} />
                )
            })}
        </div>
    )
}
