/* PostBoard.js */

'use strict';

var React = require('react');
var CreatePanel = require('./CreatePanel');
var TrashCan = require('./TrashCan');

var PostBoard = React.createClass({
	getInitialState : function() {
    	return { showModal: false };
	},
	close : function() {
	  	this.setState({ showModal: false });
	},
	open : function() {
	  	this.setState({ showModal: true });
	},
	createNote : function(){
		alert('create new sticky note!');
	},
    render : function() {
        return (
            /* jshint ignore: start*/
            <div id='PostBoard'>
              <div id='Notes'></div>
            	<button className="CreateNote tool" data-toggle="modal" data-target="#test" onClick={this.changeModalState} >ADD+</button>
            	<button className="ClearAll tool" onClick={this.changeModalState} >CLEAR</button>
            	<CreatePanel />
            	<TrashCan />
            </div>
            /* jshint ignore: end*/
        );
    }
});

module.exports = PostBoard;