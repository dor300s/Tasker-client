import React, { Component } from 'react'
import { uploadImg } from '../services/cloudinaryService'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class CardAttachments extends Component {

    state = {
        
        isLoading: false
    }

    onUpload = (ev) => {
        const { board, card } = this.props
        this.setState({ isLoading: true })
        let uploadedFiles = []
        uploadImg(ev)
            .then(cdyImgs => {
                cdyImgs.forEach(file => {
                    let data = {
                        fileName: file.original_filename,
                        format: file.format,
                        url: file.url
                    }
                    uploadedFiles.push(data)
                })
                uploadedFiles.map(file => {
                    card.attachments.unshift(file)
                    this.props.saveBoard(board)
                        .then(this.setState({ isLoading: false }))
                })

            })
    }

    onDelete = (idx) => {
        const { card , board} = this.props
        card.attachments.splice(idx,1)
        this.props.saveBoard(board)
    }

    render() {
        const { card, loggedUser } = this.props // take from props
        const { isLoading } = this.state
        const attachments = card.attachments
        return (
            <div className="card-details-attachments">
                <div className="flex ">
                    <span className="photo"></span>
                    <h4 className="attachments-header">Images</h4>
                </div>
                <label style={{ marginLeft: "42px" }}> Add Image
                    <input type="file" accept="image/png, image/jpeg" onChange={this.onUpload} hidden multiple />
                </label>
                <div style={{ marginTop: "15px", marginLeft: "42px" }} className="attachments-files-container flex align-center space-between">
                    {attachments && attachments.map((file, idx) => {
                        return <div key={idx} style={{ marginBottom: "15px" }} className="flex column">
                            {file.url && <img src={file.url} width="150" />}
                            <div className="attachment-file-name-wrapper flex align-center">
                                <h4 className="attachment-file-name">{file.fileName}.{file.format}</h4>
                                {/* <p className="attachment-owner">Uploaded by - {loggedUser.userName}</p> */}
                                <button className="attachment-delete-btn" onClick={() => this.onDelete(idx)}>Delete</button>
                            </div>

                        </div>
                    })}
                </div>
                {isLoading && <span style={{ marginLeft: "55px" }} className="loading" />}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        activeBoard: state.boardApp.currBoard,
        loggedUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardAttachments)