import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";

class Book extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string,
            author: PropTypes.string
        }),
        addToOrder: PropTypes.func
    }

    render() {
        const { image, name, price, desc, status, author } = this.props.details;
        const isAvailable = status === 'available';
        return (
            <li className="menu-book">
                <img src={image} alt={name} />
                <h3 className="book-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <p>-{author}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                    {isAvailable ? "Add to Order" : "Sold Out!"}
                </button>
            </li>
        )
    }
}

export default Book;