/* main.js */

'use strict';

var React = require('react');
var PostBoard = require('./PostBoard');


var Main = React.createClass({
    render : function() {
        return (
            <PostBoard />
        );
    }
});

React.render(<Main />, document.body);