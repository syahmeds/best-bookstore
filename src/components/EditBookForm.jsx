import React from 'react';
import {formatPrice} from "../helpers";
import PropTypes from "prop-types";

class EditBookForm extends React.Component {
    static propTypes = {
        book: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        updateBook: PropTypes.func
    }

    handleChange = (event) => {
        // update the book
        // 1. Take a copy of the current book
        const updatedBook = {
            ...this.props.book,
            [event.currentTarget.name]:
                event.currentTarget.name === 'price'
                    ? parseFloat(event.currentTarget.value)
                    : event.currentTarget.value
        };
        this.props.updateBook(this.props.index, updatedBook);
    }

    render() {
        return (
            <div className="book-edit">
                <input name="name" type="text" onChange={this.handleChange} value={this.props.book.name} />
                <input name="price" type="text" onChange={this.handleChange} value={formatPrice(this.props.book.price)} />
                <select name="status" type="text" onChange={this.handleChange} value={this.props.book.status} >
                    <option value="available">Available!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <input name="image" onChange={this.handleChange} type="text" value={this.props.book.image} />
                <button onClick={() => this.props.deleteBook(this.props.index)}>Remove Book</button>
            </div>
        )
    }
}

export default EditBookForm;