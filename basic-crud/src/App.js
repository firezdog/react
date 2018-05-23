import React, { Component } from 'react';
import './App.css';
import ProductItem from './productItem'
import AddItem from './addItem'

const products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name: 'iPhone',
    price: 650
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    }
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onAdd(name,price){
     let products = this.state.products;
     products.push({name:name, price:price});
     this.setState({products});
  }

  onEdit = (id, newName, newPrice) => {
    const productIndex = this.state.products.findIndex(product => product.name === id);
    let products = this.state.products;
    products[productIndex] = {name: newName, price: newPrice};
    this.setState({products});
  };

  getProducts() {
    return this.state.products;
  }

  onDelete(name) {
    const products = this.state.products.filter(
      product => 
      {return product.name !== name;}
    );
    this.setState({products: products});
  }

  componentWillMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
        <AddItem
          onAdd={this.onAdd}/>
        <h3>Products</h3>
        <div class="row">
        {
          this.state.products.map(product => {
            return (
              <div className="product col-3">
                <ProductItem 
                  key={product.name} 
                  {...product}
                  onDelete={this.onDelete}
                  onEdit = {this.onEdit}/>
              </div>
            );
          })
        }
        </div>
      </div>
    )
  }
}

export default App;
