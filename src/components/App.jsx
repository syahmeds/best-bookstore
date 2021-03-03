import React from 'react';
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleBooks from '../sample-books';
import Book from "./Book";
import base from "../base";


class App extends React.Component {
    state = {
        books: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        // re-instate local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.storeId}/books`, {
            context: this,
            state: 'books'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addBook = book => {
        // Copy existing state
        const books = {...this.state.books};
        // Add new book to books
        books[`book${Date.now()}`] = book;
        // Set new books object to state
        this.setState({
            books
        });
    }

    updateBook = (key, updatedBook) => {
        // 1. Take a copy of current state of books
        const books = {...this.state.books};
        // 2. Update that state
        books[key] = updatedBook;
        // 3. Set that to state
        this.setState({books});
    }

    deleteBook = key => {
        // 1. take a copy of state
        const books = {...this.state.books};
        // 2. update the state
        books[key] = null;
        // 3.  update state
        this.setState({books});
    }

    loadSampleBooks = () => {
        this.setState({
            books: sampleBooks
        });
    }

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update state object
        this.setState({order});
    }

    removeFromOrder = key => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. remove that itemf from order
        delete order[key];
        // 3. Call setState to update state object
        this.setState({order});
    }

    render() {
        return (
            <div className="best-of-the-best">
                <div className="menu">
                    <Header tagline="Best BookStore"/>
                    <ul className="books">
                        {Object.keys(this.state.books).map(key =>
                            <Book key={key} details={this.state.books[key]} addToOrder={this.addToOrder} index={key} />)}
                    </ul>
                </div>
                <Order books={this.state.books} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory
                    addBook={this.addBook}
                    updateBook={this.updateBook}
                    deleteBook={this.deleteBook}
                    loadSampleBooks={this.loadSampleBooks}
                    books={this.state.books}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;