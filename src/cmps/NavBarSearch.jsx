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
        filterBoards: [],
        filterUsers: [],
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
            this.setState({ filterBoards: [], filterLists: [] , filterCards: [], filterUsers: [] })
            return;
        }
        const { boards } = this.props
        const filterBoards = boards.filter(board => board.title.toLowerCase().includes(searchWord.toLowerCase()));
        let filterLists = []
        boards.forEach(board => {
            board.cardLists.forEach(cardList => {
                if (cardList.title.toLowerCase().includes(searchWord.toLowerCase())) {
                    cardList.boardId = board._id;
                    cardList.boardTitle = board.title;
                    filterLists.push(cardList)
                }
            })
        });

        let filterCards = []
        boards.forEach(board => {
            board.cardLists.forEach(cardList => {
                cardList.cards.forEach(card => {
                    if (card.text.toLowerCase().includes(searchWord.toLowerCase())) {
                        card.boardId = board._id;
                        card.boardTitle = board.title;
                        card.cardListId = cardList.id;
                        card.cardListTitle = cardList.title;
                        filterCards.push(card)
                    }
                })
            })
        });
        console.log(filterCards)
        // const filterUsers = boards.filter(board => board.title.toLowerCase().includes(searchWord.toLowerCase()));

        this.setState({ filterBoards, filterLists  /*, filterCards, filterUsers */ })
    }

    render() {
        // const { boards } = this.props
        const { searchWord, filterBoards, filterUsers, filterLists, filterCards, isSearchOpenModal } = this.state

        return (
            <div ref={node => this.node = node} className="nav-search-result-container flex column">
                <input onClick={() => this.openSearchModal()} onSubmit={() => this.onSearch} className="card-search" type="text" value={searchWord} name="keyword" placeholder="Search..." onChange={this.handleChange} />
                {isSearchOpenModal &&
                    <div className="nav-search-result">
                        {Boolean(filterBoards.length) &&
                            <>
                                <div className="result-header">Board results</div>
                                {filterBoards.map(board => (
                                    <div className="result-preview flex">
                                        <div>{board.title}</div>
                                    </div>
                                ))}
                            </>}
                        {Boolean(filterLists.length) &&
                            <>
                                <div className="result-header" >List results</div>
                                {filterLists.map(list => (
                                    <div className="result-preview flex space between">
                                        <div>{list.title} </div>
                                        <div>&nbsp <span style={{color: "red"}} >from</span> {list.boardTitle} board</div>
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
                        {Boolean(filterUsers.length) && <div>user result</div>}
                        {!Boolean(filterBoards.length) && !Boolean(filterLists.length) && !!Boolean(filterCards.length) && !Boolean(filterUsers.length) && <div>search for board task or user</div>}
                    </div>}
            </div>
        )
    }
}


