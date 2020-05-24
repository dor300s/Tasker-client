import React from 'react';
import { connect } from 'react-redux';
import { saveBoard, removeBoard } from '../store/actions/boardActions.js';
import { uploadImg } from '../services/cloudinaryService.js';

class BoardMenu extends React.Component {

    state = {
        title: '',
        editTitleMode: false,
        isImgLoading: false
    }

    componentWillMount() {
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
        let { board } = this.props
        board.title = this.state.title;
        this.props.saveBoard(board);
        this.setState({ editTitleMode: false })
        this.props.closeMenu();
    }

    onRemoveBoard = (e) => {
        e.stopPropagation();
        const { board, removeBoard } = this.props;
        removeBoard(board._id);
    }

    onUploadImg = (ev) => {
        this.setState({ isImgLoading: true })
        let { board } = this.props
        uploadImg(ev)
            .then(res => {
                console.log(res);

                board.background.content = res
                this.props.saveBoard(board)
                this.setState({ isImgLoading: false })
                this.props.closeMenu();
            })
            .catch(() => this.setState({ isImgLoading: false }))
    }

    render() {
        const { editTitleMode, title, isImgLoading } = this.state

        return (
            <div ref={node => this.node = node} className="board-menu-container flex column space-around">
                {isImgLoading ? <div className="loading">Loading...</div> :
                    <>
                        {!editTitleMode ? <div onClick={this.activeEditMode}>Edit title</div> :
                            <form onSubmit={this.handleSubmit}>
                                <input value={title} onChange={this.handleChange} onBlur={this.handleSubmit} onClick={(e) => e.stopPropagation()} autoFocus />
                            </form>}

                        <label>
                            <div onClick={(e) => e.stopPropagation()}>Update cover
                        <input onChange={this.onUploadImg} type="file" hidden />
                            </div>
                        </label>
                        <div onClick={this.onRemoveBoard}>Delete board</div>
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