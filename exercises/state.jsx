var Board = React.createClass({
    render: function () {
        var className = "board";
        if (this.props.selected) {
            className += " selected";
        }
        return (
            <div className={className}>
                {this.props.index + 1}
            </div>
        );
    }
});

var BoardSwitcher = React.createClass({
    
    getInitialState: function() {
        return {
            currentSelection: 0
        }
    },

    onToggle: function(e) {
        this.setState({
            currentSelection: (this.state.currentSelection + 1) % this.props.numBoards
        });
    },

    render: function () {
        var boards = [];
        for (var ii = 0; ii < this.props.numBoards; ii++) {
            var isSelected = ii === this.state.currentSelection;
            boards.push(
                <Board index={ii} selected={isSelected} key={ii} />
            );
        }

        return (
            <div>
                <div className="boards">{boards}</div>
                <button onClick={this.onToggle}>Toggle</button>
            </div>
        );
    }

});

ReactDOM.render(
    <BoardSwitcher numBoards={3} />,
    document.getElementById('container')
);