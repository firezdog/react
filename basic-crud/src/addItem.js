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
            <form id="create-card" class="card form" onSubmit={this.onSubmit}>
                <h3 className="card-header">Add Product</h3>
                <div className="card-body">
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" ref={nameInput => this.nameInput = nameInput} type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Price</label> 
                        <input className="form-control" ref={priceInput => this.priceInput = priceInput} type="text"/>
                    </div>
                    <button className="btn btn-primary">Add</button>                
                </div>
            </form>
        )
    }
}

export default AddItem;