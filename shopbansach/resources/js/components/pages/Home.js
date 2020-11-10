import Axios from "axios";
import { data, extend } from "jquery";
import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      qty: '',
      booklist: [],
      id: '',
    }
    this.qty = this.qty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    Axios.get('http://127.0.0.1:8000/api/books')
      .then(res => {
        this.setState({ booklist: res.data.data });
      });
  }
  qty(id, e) {
    console.log(id);
    this.setState({ qty: e.target.value, id: id });
  }
  handleSubmit(e) {
    e.preventDefault();
    Axios.post('http://127.0.0.1:8000/add', {
      qty: this.state.qty,
      id: this.state.id
    })
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                {this.state.booklist.map(data => {
                  return (
                    <div className="card" key={data.bookId}>
                      <div className="card-header"><h4>{data.name}</h4></div>
                      <div className="card-body">
                        Quantity: <input type="number"
                          min="1"
                          onChange={(e) => this.qty(data.bookId, e)} />
                      </div>
                      <div className="card-footer">
                        <button type="submit" className="btn btn-block btn-info">Thêm vào giỏ</button>
                      </div>
                      <Link to={`${PUBLIC_URL}books/view/${data.bookId}`} className="btn btn-primary mr-2">
                        View
                      </Link>
                    </div>
                  )
                }
                )
                }
              </div>
            </form>
          </div>
        </div>
      </div>

    )
  }
}
