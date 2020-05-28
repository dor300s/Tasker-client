import React from 'react';
import { connect } from 'react-redux';
import { saveBoard, removeBoard } from '../store/actions/boardActions.js';
import { uploadImg } from '../services/cloudinaryService.js';

class BoardMenu extends React.Component {

    state = {
        title: '',
        editTitleMode: false,
        isImgLoading: false,
        updateCoverMode: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.closeBoardMenu, false);
        document.addEventListener("keydown", this.closeBoardMenu, false);
        const { board } = this.props;
        this.setState({ title: board.title })
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.closeBoardMenu, false);
        document.removeEventListener("keydown", this.closeBoardMenu, false);
    }

    closeBoardMenu = (e) => {
        const { closeMenu } = this.props;
        if (!this.node.contains(e.target) || e.keyCode === 27) {
            closeMenu();
        }
    }

    activeEditMode = (e) => {
        e.stopPropagation()
        this.setState({ editTitleMode: true })
    }

    handleChange = (e) => {
        e.stopPropagation()
        this.setState({ title: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { saveBoard, closeMenu, clearCurrBoard } = this.props;
        let { board } = this.props
        board.title = this.state.title;
        saveBoard(board)
            .then(() => clearCurrBoard())
        this.setState({ editTitleMode: false })
        closeMenu();
    }

    onRemoveBoard = (e) => {
        e.stopPropagation();
        const { board, removeBoard } = this.props;
        removeBoard(board._id);
    }

    openCoverMode = () => {
        this.setState({ coverMode: true })
    }

    closeCoverMode = () => {
        this.setState({ coverMode: false })
    }

    onUploadImg = (ev) => {
        const { saveBoard, closeMenu, clearCurrBoard } = this.props;
        this.setState({ isImgLoading: true })
        let { board } = this.props
        uploadImg(ev)
            .then(res => {
                board.background.content = res[0].url
                saveBoard(board)
                    .then(() => clearCurrBoard())
                this.setState({ isImgLoading: false })
                closeMenu();
            })
            .catch(() => this.setState({ isImgLoading: false }))
    }

    onChangeColor = (color) => {
        const { saveBoard, closeMenu, clearCurrBoard } = this.props;
        let { board } = this.props
        board.background.color = color
        board.background.content = '';
        saveBoard(board)
            .then(() => clearCurrBoard())
        closeMenu();
    }

    render() {
        const { editTitleMode, title, isImgLoading, coverMode } = this.state

        return (
            <div ref={node => this.node = node} className={`board-menu-container flex column space-between ${isImgLoading && 'box-shadow-off'}`}>
                {isImgLoading ? <div className="loading"></div> :
                    <>
                        {!editTitleMode ? <>
                            <div onClick={this.activeEditMode}>Edit Title</div>
                            <div className="update-cover-btn" onClick={(e) => e.stopPropagation()} onMouseOver={this.openCoverMode} onMouseLeave={this.closeCoverMode}>Update cover
                            {coverMode && <div className="change-cover-wrap flex column">
                                    <div className="color-palette flex">
                                        <div onClick={() => this.onChangeColor('#e74c3c')}>⬤</div>
                                        <div onClick={() => this.onChangeColor('#e67e22')}>⬤</div>
                                        <div onClick={() => this.onChangeColor('#f1c40f')}>⬤</div>
                                        <div onClick={() => this.onChangeColor('#27ae60')}>⬤</div>
                                        <div onClick={() => this.onChangeColor('#2980b9')}>⬤</div>
                                        <div onClick={() => this.onChangeColor('#8e44ad')}>⬤</div>
                                    </div>
                                    <label>
                                        <div className="upload-pic-btn">Upload Image
                                         <input onChange={this.onUploadImg} type="file" hidden accept="image/png, image/jpeg" />
                                        </div>
                                    </label>
                                </div>}
                            </div>
                            <div className="delete-btn" onClick={this.onRemoveBoard}>Delete Board</div>
                        </> :
                            <form className="flex" onSubmit={this.handleSubmit}>
                                <input value={title} onChange={this.handleChange} onBlur={this.handleSubmit} onClick={(e) => e.stopPropagation()} autoFocus spellCheck="false" />
                            </form>}
                    </>}
            </div>
        )
    }
}


const mapDispatchToProps = {
    saveBoard,
    removeBoard
}

export default connect(null, mapDispatchToProps)(BoardMenu)