/* StickyNote.js */

'use strict';

var React = require('react');

var StickyNote = React.createClass({
    getInitialState : function() {
        return {

        };
    },
    handleClick: function(){
    	//雙擊可撕起
    },
    render : function() {
        return (
            /* jshint ignore: start*/
            <div className='post'></div>
            /* jshint ignore: end*/
        );
    }
});

module.exports = StickyNote;