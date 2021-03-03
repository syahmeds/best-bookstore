import React from 'react';
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";
import PropTypes from 'prop-types';
import Login from "./Login";
import firebase from 'firebase';
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
    static propTypes = {
        books: PropTypes.object,
        updateBook: PropTypes.func,
        deleteBook: PropTypes.func,
        loadSampleBooks: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        // Lookup current store in firebase db
        const store = await base.fetch(this.props.storeId, {context: this});
        // CLaim it if there isn't any owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // Set state of inventory to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({uid: null})
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        // 1. Check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }

        // 2. Check if they are the store owner
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner for this store  </p>
                    {logout}
                </div>
            )
        } else {
            // They must be the owner
            return (
                <div className="inventory">
                    <h2>Inventory!!</h2>
                    {logout}
                    {Object.keys(this.props.books).map(key => <EditBookForm key={key} index={key}
                                                                            book={this.props.books[key]}
                                                                            updateBook={this.props.updateBook}
                                                                            deleteBook={this.props.deleteBook}/>)}
                    <AddBookForm addBook={this.props.addBook}/>
                    <button onClick={this.props.loadSampleBooks}>Load Sample Books</button>
                </div>
            )
        }
    }
}

export default Inventory;