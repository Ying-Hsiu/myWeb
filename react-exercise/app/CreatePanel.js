/* CreatePanel.js */

'use strict';

var React = require('react');
var StickyNote = require('./StickyNote');

var CreatePanel = React.createClass({
    getInitialState: function(){
        return {
            selectbg : '#ffcc33'      
        };
    },
    handleChange: function(event){
        this.setState({selectbg : event.target.value}); 
    },
    handleClick: function(){
        React.render(<StickyNote/>,document.getElementById('Notes'));
    }, 
    render: function() {
        
        var importance = [
                            {'text':'黃','bgColor':'#ffcc33'},
                            {'text':'紅','bgColor':'#c33'},
                            {'text':'藍','bgColor':'#99ccff'}
                        ];
        var optionList = importance.map(function(key){
            return (
                <option value={key.bgColor} > {key.text} </option>
                );
        });
        var inputStyle = "form-control";

        return (
            /* jshint ignore: start*/
            <div className="modal fade" id="test" tabindex="-1" role="dialog">
              <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <h3>Create Sticky Post</h3>
                        <label>到期日</label>
                        <input type='date'className={inputStyle} />
                        <label>內容</label>
                        <textarea className='note_content' ></textarea>  
                        <label>便利貼色彩</label>
                        <select className={inputStyle} onChange={this.handleChange} style={{background:this.state.selectbg}} >{optionList}</select>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-success' onClick={this.handleClick} >POST!</button>
                    </div>
                </div>
              </div>
            </div>
            /* jshint ignore: end*/
        );
    }
});

module.exports = CreatePanel;