import React from 'react';
import {getStores} from "../helpers";
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    }

    goToStore = (event) => {
        // 1. Stop form from submitting
        event.preventDefault();
        // 2. get text from that input
        const storeName = this.myInput.current.value;
        // 3. change the page to /store/whatever-they-enter
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        const stores = getStores();

        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Select a Store</h2>
                <select ref={this.myInput} required defaultValue={stores[0]}>
                    {stores.map(store => <option key={store}>{store}</option>)}
                </select>
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

export default StorePicker;