import React from 'react'

export default function ImgModal(props) {
    const {url} = props
    return (
        <div className="img-screen flex align-center justify-center">
            <img src={url} width="400px" />
        </div>
    )
}
