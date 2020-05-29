import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList';
import { NavMenuFilter } from '../cmps/NavMenuFilter'

export default class NavBarSearch extends React.Component {

    state = {
        users: null,
        searchWord: "",
        filterLists: [],
        filterCards: [],
        isSearchOpenModal: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onCloseSearchModal, false);
        document.addEventListener("keydown", this.onCloseSearchModal, false);
        this.loadUsers()
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onCloseSearchModal, false);
        document.removeEventListener("keydown", this.onCloseSearchModal, false);
    }

    loadUsers = () => {
        //TODO load users light array from the server
    }

    openSearchModal() {
        this.setState({ isSearchOpenModal: true });
    }

    onCloseSearchModal = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            this.setState({ isSearchOpenModal: false });
        }
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ searchWord: value }, () => this.onSearch())
    }

    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
    }

    onSearch = () => {
        const { searchWord } = this.state
        const { currBoard, boards } = this.props

        if (!searchWord.length) {
            this.setState({ filterBoards: [], filterLists: [], filterCards: [], filterUsers: [] })
            return;
        }
        if (boards) {
            let filterBoards = boards.filter(board => board.title.toLowerCase().includes(searchWord.toLowerCase()));
            if (!filterBoards.length) filterBoards = boards;
            this.setState({ filterBoards })
            return
        } else {
            let filterLists = []
            currBoard.cardLists.forEach(cardList => {
                if (cardList.title.toLowerCase().includes(searchWord.toLowerCase())) {
                    cardList.boardId = currBoard._id;
                    cardList.boardTitle = currBoard.title;
                    filterLists.push(cardList)
                }
            });

            let filterCards = []
            currBoard.cardLists.forEach(cardList => {
                cardList.cards.forEach(card => {
                    if (card.text.toLowerCase().includes(searchWord.toLowerCase())) {
                        card.boardId = currBoard._id;
                        card.boardTitle = currBoard.title;
                        card.cardListId = cardList.id;
                        card.cardListTitle = cardList.title;
                        filterCards.push(card)
                    }
                })
            });
            this.setState({ filterLists, filterCards })
        }
    }

    render() {
        const { searchWord, filterLists, filterCards, filterBoards, isSearchOpenModal } = this.state
        const { currBoard, history } = this.props
        let starredBoards
        if (filterBoards) starredBoards = filterBoards.filter(board => board.isStarred)


        return (
            <div ref={node => this.node = node} className=" nav-search-result-container flex column">

                <input onClick={() => this.openSearchModal()} autoComplete="off" onSubmit={() => this.onSearch} className="card-search" type="text" value={searchWord} name="keyword" placeholder={(currBoard) ? "Search a card in this board..." : "Search board..."} onChange={this.handleChange} />
                <div className={`nav-search-result ${(isSearchOpenModal) ? "open-modal" : ""} flex column`}>
                    {filterBoards && Boolean(filterBoards.length) &&

                        <div>
                            <h3 className="result-header">Board result</h3>
                            <div className="search-results">
                                {filterBoards.map(board =>
                                    <div className="result-preview" onClick={() => history.push(`/board/${board._id}`)}>
                                        <div className="board-btn"></div>
                                        <div className="header">{board.title}</div>
                                    </div>
                                )}
                            </div>
                        </div>}
                    {!Boolean(filterLists.length) && !Boolean(filterCards.length) &&
                        <div className='empty-search-massage'>
                            <div className="search"></div>
                            <div>Search a card in this board</div>
                        </div>}

                    {
                        /* filterLists && Boolean(filterLists.length) &&
                        <>
                            <div className="result-header" >List results</div>
                            <div className="search-results">
                                {filterLists.map(list => (
                                    <div className="result-preview">
                                        <div className="list-pic"></div>
                                        <div className="header">{list.title}</div>
                                        <div className="conjunction">(list)</div>
                                        <div className="conjunction">from</div>
                                        <div className="header">{list.boardTitle}</div>
                                        <div className="conjunction">(board)</div>
                                    </div>
                                ))}
                            </div>
                        </> */
                    }
                    {filterCards && Boolean(filterCards.length) &&
                        <>
                            <div className="result-header">{/* Card results */}</div>
                            <div className="search-results">
                                {filterCards.map(card => (
                                    <div className="result-preview" onClick={() => history.push(`/board/${currBoard._id}/${card.id}`)}>
                                        <div className="card result-icon" ></div>
                                        <div className="text-result">
                                            <div className="header">{card.text}</div>
                                            {/* <div className="conjunction">(card)</div> */}
                                            <div className="conjunction">in</div>
                                            <div className="conjunction">{card.cardListTitle}</div>
                                            {/* <div className="conjunction">(list)</div> */}
                                            {/* <div className="conjunction">from</div>
                                            <div className="header">{card.boardTitle}</div>
                                            <div className="conjunction">(board)</div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>}
                </div>
            </div >
        )
    }
}


