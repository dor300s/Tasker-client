import React, { Component } from 'react'
import { uploadImg } from '../services/cloudinaryService'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class CardAttachments extends Component {

    state = {
        uploadedFiles: this.props.card.attachments,
        isLoading: false
    }

    onUpload = (ev) => {
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
                this.setState(({ uploadedFiles }), this.updateBoardInDB)
            })
    }

    updateBoardInDB() {
        const { board, card } = this.props
        card.attachments = this.state.uploadedFiles
        this.props.saveBoard(board)
            .then(this.setState({ isLoading: false }))
    }

    onDelete = (idx) => {
        const { card } = this.props
        const { uploadedFiles } = this.state
        uploadedFiles.splice(idx, 1)
        this.setState({ uploadedFiles: card.attachments })
        this.updateBoardInDB()
    }

    render() {
        const { card } = this.props // take from props
        const { isLoading } = this.state
        const attachments = card.attachments
        return (
            <div className="card-details-attachments">
                <div className="flex ">
                    <span className="attachments"></span>
                    <h4 className="attachments-header">Attachments</h4>
                </div>
                <div style={{ marginTop: "15px", marginLeft: "55px" }} className="attachments-files-container">
                    {attachments && attachments.map((file, idx) => {
                        console.log(file);

                        return <div style={{ marginBottom: "15px" }} className="flex align-center space-between">
                            {file.url && <img src={file.url} width="80" height="80" />}
                            <div className="attachment-file-name-wrapper flex align-center">
                                <h4 className="attachment-file-name">"{file.fileName}".{file.format}</h4>
                            </div>
                            <button className="attachment-delete-btn" onClick={() => this.onDelete(idx)}>Delete</button>

                        </div>
                    })}
                </div>
                {isLoading && <span style={{ marginLeft: "55px" }} className="loading" />}
                <label style={{ marginLeft: "55px" }}> Add file
                    <input type="file" accept="image/png, image/jpeg" onChange={this.onUpload} hidden multiple />
                </label>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        activeBoard: state.boardApp.currBoard
    }
}

const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardAttachments)