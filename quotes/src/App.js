import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      totalPages: 0,
      pageLength: 10,
      selectedQuotes: [],
      theme: "all",
      search: "",
      quotes: [],
      quoteSource: "https://gist.githubusercontent.com/anonymous/8f61a8733ed7fa41c4ea/raw/1e90fd2741bb6310582e3822f59927eb535f6c73/quotes.json",
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    let that = this;
    $.get(this.state.quoteSource, function(data){
      data = JSON.parse(data);
      let quotes = that.state.quotes;
      data.map(item => quotes.push(item));
      that.setState({ quotes: quotes, selectedQuotes: quotes, totalPages: Math.ceil(quotes.length / that.state.pageLength)})
    });
  }

  filter(search, theme){
    let selectedQuotes = theme !== "all" ? this.state.quotes.filter(quote => quote.theme === theme) : this.state.quotes;
    selectedQuotes = selectedQuotes.filter(quote => quote.quote.toLowerCase().includes(search.toLowerCase()));
    this.setState({ selectedQuotes: selectedQuotes, totalPages: Math.ceil(selectedQuotes.length / this.state.pageLength), page: 0 })
  }

  themeFilter = (event) => {
    let search = this.state.search; 
    let theme = event.target.value;
    this.filter(search,theme);
    
  }

  searchFilter = (event) => {
    let search = event.target.value;
    let theme = this.state.theme;
    this.filter(search,theme);
  }

  changePage = (forward) => {
    let page = this.state.page;
    forward ? page++ : page--;
    this.setState({page: page});
  }

  setCurrentPage = (page, pageLength) => {
    pageLength = parseInt(pageLength, 10);
    let selectedQuotes = this.state.selectedQuotes;
    return selectedQuotes.slice(page * pageLength, (page * pageLength + pageLength));
  }

  render() {
    let currentPage = this.setCurrentPage(this.state.page, this.state.pageLength);
    return (
      <div className="App">
        <div className="text-center">
          <h2>Quotes</h2>
          <small>(Page {this.state.page + 1} of {this.state.totalPages ? this.state.totalPages : 1})</small>
          <div className="container-fluid row">
            <div className="col-4"></div>
            <div className="col-2" id="search">
              <div><label>Search Text</label></div>
              <input
                onKeyDown={(event) => {
                  if(event.keyCode === 13){
                    event.target.value = "";
                    this.setState({search: ""});
                    this.filter("", this.state.theme);
                  }
                }} 
                onChange={(event) => {
                  this.setState({search: event.target.value});
                  this.searchFilter(event,event.keyCode)
                }
              }
              type="text"
              />
              <div>
                <small>(enter clears search)</small>
              </div>
            </div>
            <div className="col-2" id="pageLength">
              <div><label>Quotes Per Page</label></div>
              <input 
                type="number" defaultValue="10" min="1" max="15"
                onKeyPress={(event) => event.preventDefault()}
                onChange={
                  (event) => {
                    this.setState({page: 0, pageLength: event.target.value, totalPages: Math.ceil(this.state.selectedQuotes.length / event.target.value)})
                  }
                }/>
            </div>
            <div className="col-4"></div>
          </div>
          <button 
            className="btn btn-info"
            disabled={this.state.page === 0} 
            onClick={()=>this.changePage(false)}>
            &laquo;</button>
          <button
            className="btn btn-info"
            disabled={this.state.page + 1 >= this.state.totalPages} 
            onClick={()=>this.changePage(true)}>
            &raquo;</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Quote</th>
              <th>Speaker</th>
              <th>Context</th>
              <th>
                <select className="custom-select" 
                  onChange={(event) => 
                    { this.setState({theme: event.target.value}); 
                      this.themeFilter(event)
                    }
                }>
                  <option value="all">All</option>
                  <option value="movies">Movies</option>
                  <option value="games">Games</option> 
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
        {
          currentPage.map((quote,index) => {return (
            <tr key={index}>
              <td id="quote">{quote.quote}</td>
              <td>{quote.source}</td>
              <td>{quote.context}</td> 
              <td>{quote.theme}</td>
            </tr>
          )})
        }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
