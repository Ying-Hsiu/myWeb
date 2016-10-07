/* TrashCan.js */

'use strict';

var React = require('react');

var TrashCan = React.createClass({
    handleClick: function(){
        alert("If you want to delete note on board,just take it to me!");
    },
    render : function() {
        return (
            /* jshint ignore: start*/
            <div id='TrashCan' onClick={this.handleClick} >FEED ME!</div>
            /* jshint ignore: end*/
        );
    }
});

module.exports = TrashCan;