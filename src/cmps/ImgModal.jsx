import React from 'react'

export default function ImgModal(props) {
    const {url} = props
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
      });
      
    return (
        <div className="img-screen flex align-center justify-center">
            <img src={url} width="100%" />
            <span className="img-modal-close-btn" onClick={()=> props.onCloseImgModal()}/>
        </div>
    )
}
