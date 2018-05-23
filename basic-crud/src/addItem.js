import React, { Component } from 'react';

class AddItem extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onAdd(this.nameInput.value, this.priceInput.value);
        this.nameInput.value = "";
        this.priceInput.value = "";
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Product</h3>
                <div>
                    <label>Name </label>
                    <input ref={nameInput => this.nameInput = nameInput} type="text"/>
                </div>
                <div>
                    <label>Price </label> 
                    <input ref={priceInput => this.priceInput = priceInput} type="text"/>
                </div>
                <button>Add</button>
                <hr/>
            </form>
        )
    }
}

export default AddItem;