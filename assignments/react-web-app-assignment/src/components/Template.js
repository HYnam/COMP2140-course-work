import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

function Template({ title, children, footer }) {
    return (
        <>
            <Header></Header>
            <main>
                <h2>{title}</h2>
                {children}
            </main>
            <Footer>{footer}</Footer>
        </>
    );
}

Template.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Template;