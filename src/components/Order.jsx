import React from 'react';
import {formatPrice} from "../helpers";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

class Order extends React.Component {
    static propTypes = {
        books: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }

    renderOrder = key => {
        const book = this.props.books[key];
        const count = this.props.order[key];
        const isAvailable = book && book.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };

        // Make sure book is loaded
        if (!book) {
            return null;
        }

        if(!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {book ? book.name : "book"} is no longer available
                    </li>
                </CSSTransition>
            );
        }

        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            ct {book.name}
              {formatPrice(count * book.price)}
              <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
                </li>
            </CSSTransition>
        );
    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const book = this.props.books[key];
            const count = this.props.order[key];
            const isAvailable = book && book.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * book.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                {/*{orderIds}*/}
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;