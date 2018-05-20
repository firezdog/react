var ChildComponent = React.createClass({
    render: function() {
      return (
        <div>
          <div className="prompt">Add a click handler to this button so that when clicked, performMagic is called in the parent component.</div>
          <button onClick={this.props.function}>Do Magic</button>
        </div>
        );
    }
});
  
var ParentComponent = React.createClass({
    performMagic: function() {
      alert('TAADAH!');
    },
  
    render: function() {
      return (
        <div>
          <ChildComponent function={this.performMagic}/>
        </div>
        );
    }
});
  
ReactDOM.render(
    <ParentComponent />,
    document.getElementById('container')
);