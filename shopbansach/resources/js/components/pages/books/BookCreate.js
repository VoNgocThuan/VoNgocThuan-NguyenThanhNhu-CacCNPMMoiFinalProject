import Axios from "axios";
import React from "react";
import { Card, Button, Badge, Spinner, Form, ListGroup } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { storeNewBook } from "../../../services/BookService";
class BookCreate extends React.Component {

  state = {
    isloading: false,
    name: "",
    description: "",
    originalPrice: "",
    price: "",
    quantity: "",
    ratings: "",
    status: "",
    image: "",
    errors: {},
  };

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
      originalPrice: this.state.originalPrice,
      price: this.state.price,
      quantity: this.state.quantity,
      ratings: this.state.ratings,
      status: this.state.status,
      image: this.state.image,
      category_id: this.props.category_id,
    };
    const response = await storeNewBook(postBody);
    if (response.success) {
      this.setState({
        name: "",
        description: "",
        originalPrice: "",
        price: "",
        quantity: "",
        ratings: "",
        status: "",
        image: "",
        isloading: false,
      });
      this.props.onCompleteBookCreate(response.data);
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
            <h2>Sách mới</h2>
            <Form onSubmit={this.submitForm}>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Tên sách</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên sách"
                      value={this.state.name}
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
                      value={this.state.description}
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
                      value={this.state.originalPrice}
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
                      value={this.state.price}
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
                      value={this.state.quantity}
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
                        value={this.state.ratings}
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
                      value={this.state.image}
                      name="image"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="status">
                    <Form.Label>Tình trạng</Form.Label>
                    <Form.Control as="select"
                      value={this.state.status}
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
                    Lưu
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

export default withRouter(BookCreate);

