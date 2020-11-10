import Axios from "axios";
import React from "react";
import { Card, Button, Badge, Spinner, Form, ListGroup } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { updateBook } from "../../../services/BookService";

class BookEdit extends React.Component {

  state = {
    book: {},
    name: '',
    description: '',
    status: '',
    price: '',
    image: '',
    originalPrice: '',
    ratings: '',
    quantity: '',
    category_id: '',
    isloading: false,
    errors: {},
  };


  componentDidMount() {
    this.getBookDetails();
  };

  getBookDetails = () => {
    this.setState({ isloading: true });
    Axios.get(`http://127.0.0.1:8000/api/books/${this.props.match.params.id}`
    ).then((res) => {
      this.setState({
        book: res.data.data,
        isloading: false,
      });
    });
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ isloading: true })
    const postBody = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      price: this.state.price,
      image: this.state.image,
      originalPrice: this.state.originalPrice,
      ratings: this.state.ratings,
      quantity: this.state.quantity,
      category_id: this.state.book.category_id,
    };
    // Axios.put('http://127.0.0.1:8000/api/books/'+this.props.match.params.id, postBody)
    // .then(res => {
    //     this.setState({ alert: "success" })
    // }).catch(error => {
    //     this.setState({ alert: "error" });
    // })

    const response = await updateBook(this.state.book.bookId, postBody);
    console.log("response", response);
    if (response.success) {
      this.setState({
        name: "",
        description: "",
        status: "",
        price: "",
        image: "",
        originalPrice: "",
        ratings: "",
        quantity: "",
        isloading: false,
      });
      // history.push(`${PUBLIC_URL}categories/view/${this.state.book.category_id}`);
    } else {
      this.setState({
        errors: response.errors,
        isloading: false,
      });
    }
  };

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <h2>Cập nhật sách</h2>
            <Form onSubmit={this.submitForm}>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Tên sách</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên sách"
                      defaultValue={this.state.book.name}
                      name="name"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                </div>
                <div className="col-6">
                  <Form.Group controlId="description">
                    <Form.Label>Mô tả sách</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mô tả sách"
                      as="textarea"
                      rows="3"
                      defaultValue={this.state.book.description}
                      name="description"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="originalPrice">
                    <Form.Label>Giá tiền gốc sách</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập giá tiền gốc sách"
                      defaultValue={this.state.book.originalPrice}
                      name="originalPrice"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                </div>
                <div className="col-6">
                  <Form.Group controlId="price">
                    <Form.Label>Giá tiền sách</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập giá tiền sách"
                      defaultValue={this.state.book.price}
                      name="price"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập số lượng sách"
                      defaultValue={this.state.book.quantity}
                      name="quantity"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                  <div className="col-6">
                    <Form.Group controlId="ratings">
                      <Form.Label>Ratings</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nhập số sao sách"
                        defaultValue={this.state.book.ratings}
                        name="ratings"
                        onChange={(e) => this.changeInput(e)}
                      />
                    </Form.Group>
                    {this.state.errors && this.state.errors.name && (
                      <p className="text-danger">{this.state.errors.name[0]}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="image">
                    <Form.Label>Hình sách</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link hình ảnh"
                      defaultValue={this.state.book.image}
                      name="image"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="status">
                    <Form.Label>Tình trạng</Form.Label>
                    <Form.Control as="select"
                      defaultValue={this.state.book.status}
                      name="status"
                      onChange={(e) => this.changeInput(e)}
                    >
                      <option>Chọn</option>
                      <option value="1">Hiện có</option>
                      <option value="0">Hết hàng</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>

              {this.state.errors && this.state.errors.description && (
                <p className="text-danger">{this.state.errors.description[0]}</p>
              )}
              {
                this.state.isloading && (
                  <Button variant="primary" type="button" disabled>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    Saving...
                  </Button>
                )
              }
              {
                !this.state.isloading && (
                  <Button variant="primary" type="submit">
                    Cập nhật
                  </Button>
                )
              }
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default withRouter(BookEdit);