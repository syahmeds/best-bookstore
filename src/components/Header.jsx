import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
    <header className="top">
        <h1>Best
            <span className="ofThe">
                        <span className="of">Of</span>
                        <span className="the">The</span>
                        </span>
            Best</h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;