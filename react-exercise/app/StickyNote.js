/* StickyNote.js */

'use strict';

var React = require('react');

var StickyNote = React.createClass({
    getInitialState : function() {
        return {

        };
    },
    moveNote: function(){
    	//雙擊可撕起
        alert("撕起");
    },
    editNote: function(){
        //點擊進行編輯
        alert("編輯");
    },
    render : function() {
        var d = new Date(),
            noteID = d.getTime();

        return ( 
            <div className='post' id={noteID} ondbClick={this.handledbClick} >
                <span id='edit' onClick={this.editNote} >E</span>
                <span id='move' onClick={this.moveNote} >M</span>
            </div>
        );
    }
});

module.exports = StickyNote;