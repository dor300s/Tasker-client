import React from 'react'

export default function NavBarSearch() {
    return (
        <div className="nav-search-result-container flex column">
            <input className="card-search" type="text" placeholder="Find cards, users or boards" />
            <div className="nav-search-result">
                <div>list result</div>
                <div>cards result</div>
                <div>user result</div>
                <div>board result</div>
            </div>
        </div>
    )
}
