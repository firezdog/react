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
                            <form onSubmit={this.onSubmit}>
                                <h3>Edit {name}</h3>
                                <input type="hidden" ref={idInput => this.idInput = idInput} value={name}/>
                                <div>
                                    <label>Name </label>
                                    <input ref={nameInput => this.nameInput = nameInput} defaultValue={name} type="text" />
                                </div>
                                <div>
                                    <label>Price </label>
                                    <input ref={priceInput => this.priceInput = priceInput} defaultValue={price} type="text" />
                                </div>
                                <button>Edit</button>
                                <hr />
                            </form>
                        )
                        : (
                            <div>
                                <span>{name}</span>
                                {` | `}
                                <span>{price}</span>
                                {` | `}
                                <button onClick={() => this.onEdit()}>Edit</button>
                                {` | `}
                                <button onClick={() => onDelete(name)}>Delete</button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ProductItem;
