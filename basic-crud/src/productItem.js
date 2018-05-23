import React, { Component } from 'react';

class ProductItem extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            isEdit: false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.onEdit(this.idInput.value, this.nameInput.value, this.priceInput.value);
        this.setState({isEdit: false});
    }

    onEdit() {
        this.setState({isEdit: true})
    }


    render() {
        const { name, price, onDelete } = this.props;
        return (
            <div className="ProductItem">
                <div>
                    {
                        this.state.isEdit
                        ? (
                            <form className="card" onSubmit={this.onSubmit}>
                                <h3 className="card-header">Edit {name}</h3>
                                <div class="card-body">
                                    <input type="hidden" ref={idInput => this.idInput = idInput} value={name}/>
                                    <div className="form-group">
                                        <label>Name </label>
                                        <input className="form-control" ref={nameInput => this.nameInput = nameInput} defaultValue={name} type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Price </label>
                                        <input className="form-control" ref={priceInput => this.priceInput = priceInput} defaultValue={price} type="text" />
                                    </div>
                                    <button className="btn btn-info">Edit</button>
                                </div>
                            </form>
                        )
                        : (
                            <div className="card">    
                                <div className="card-header">{name}</div>
                                <div className="card-body">
                                    <p>${price}</p>
                                    <div className="row">
                                        <div className="col-6"><button className="btn btn-info" onClick={() => this.onEdit()}>Edit</button></div>
                                        <div className="col-6"><button className="btn btn-info" onClick={() => onDelete(name)}>Delete</button></div>
                                    </div>
                                </div>                                
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ProductItem;
