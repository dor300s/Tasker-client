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
        console.log('searchWord', searchWord)

        if (!searchWord.length) {
            this.setState({ filterBoards: [], filterLists: [], filterCards: [], filterUsers: [] })
            return;
        }
        const { currBoard } = this.props
        // const filterBoards = boards.filter(board => board.title.toLowerCase().includes(searchWord.toLowerCase()));
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

    render() {
        const { searchWord, filterLists, filterCards, isSearchOpenModal } = this.state
        const { currBoard } = this.props

        return (
            <div ref={node => this.node = node} className="nav-search-result-container flex column">

                <input onClick={() => this.openSearchModal()} autocomplete="off" onSubmit={() => this.onSearch} className="card-search" type="text" value={searchWord} name="keyword" placeholder={(currBoard) ? "Search list or card.." : "Search board..."} onChange={this.handleChange} />
                {isSearchOpenModal &&
                    <div className="nav-search-result flex column">
                        {Boolean(filterLists.length) &&
                            <>
                                <div className="result-header" >List results</div>
                                {filterLists.map(list => (
                                    <div className="result-preview flex space between">
                                        <div>{list.title} </div>
                                        <div> <span style={{ color: "red" }} >from</span> {list.boardTitle} board</div>
                                    </div>
                                ))}
                            </>}
                        {Boolean(filterCards.length) &&
                            <>
                                <div className="result-header">card results</div>
                                {filterCards.map(card => (
                                    <div className="result-preview flex space between">
                                        <div>{card.txt}</div>
                                        <div>in {card.cardListTitle} board</div>
                                        <div>from {card.boardTitle} board</div>
                                    </div>
                                ))}
                            </>}
                        {!Boolean(filterLists.length) && !!Boolean(filterCards.length) && <div className='empty-search-massage'>search for board task or user</div>}
                    </div>}
            </div>
        )
    }
}


