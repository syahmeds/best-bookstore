import React from 'react';
import PropTypes from "prop-types";

class AddBookForm extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    authorRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addBook: PropTypes.func
    }

    createBook = (event) => {
        // 1.  stop the form from submitting
        event.preventDefault();
        const book = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value), // 10.54 - 1054 cents
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            author: this.authorRef.current.value,
            image: this.imageRef.current.value
        }
        this.props.addBook(book);
        // refresh the form
        event.currentTarget.reset();
    }

    render() {
        return (
            <form className="book-edit" onSubmit={this.createBook}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
                <select name="status" ref={this.statusRef}>
                    <option value="available">Available!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
                <textarea name="author" ref={this.authorRef} placeholder="Author"></textarea>
                <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
                <button type="submit">+ Add Book</button>
            </form>
        )
    }
}

export default AddBookForm;