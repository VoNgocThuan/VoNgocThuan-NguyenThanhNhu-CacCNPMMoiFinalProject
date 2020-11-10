import React, { Component } from 'react'
import { Card, Badge, Spinner, Image, Container, Row, Col, FormLabel, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import StarRatingComponent from 'react-star-ratings';
import { image } from "../../image";
import Axios from 'axios';

export default class BookView extends Component {
    constructor() {
        super();
        this.state = {
            book: {},
            qty: 1,
            img: '',
            id: '',
            isloading: false,
            productNotFound: false,
            snackbarMessage: "",
            autoHideDuration: 3000,
            snackbarOpen: false,
            numberOfRatings: 239,
            autoHideDuration: 3000,
        };
        this.qty = this.qty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            let bookID = nextProps.match.params.id;
            this.getBookDetails(bookID);
        }
    }

    componentDidMount() {
        let bookID = this.props.match.params.id;
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

    qty(id, e) {
        console.log(id);
        this.setState({ qty: e.target.value, id: id });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        Axios.post('http://127.0.0.1:8000/add', {
            qty: this.state.qty,
            id: this.state.id
        })
            .then(res => {
                console.log(res.data);
            });
        history.replace('/cart');
    }

    onQuantityBlur = () => {
        if (this.state.qty.length === 0 || (this.state.qty.length > 0 && parseInt(this.state.qty) < 1)) {
            this.setState(() => ({ qty: 1 }))
        }
    };

    render() {
        return (
            <>
                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col lg={4} md={4}>
                                <div className={"margin-div-five"}>
                                    <ReactImageZoom {...{
                                        width: 200,
                                        height: 250,
                                        zoomWidth: 500,
                                        img: this.state.book.image ? this.state.book.image : image,
                                        zoomStyle: 'z-index: 999;',
                                    }} />
                                </div>
                                <p className={"margin-div-five"}>Scroll over the image to zoom</p>
                            </Col>

                            <Col lg={6} md={6}>
                                <div className={"margin-div-five"}>
                                    <h2>{this.state.book.name}</h2>
                                    <div className={"product-info-star-rating"}>
                                        {(this.state.book.ratings && this.state.book.ratings > 0) ?
                                            <div>
                                                <StarRatingComponent
                                                    rating={this.state.book.ratings}
                                                    starDimension={"20px"}
                                                    starSpacing={"0px"}
                                                    starRatedColor={"rgb(247, 202, 37)"}
                                                />
                                                {this.state.book.numberOfRatings &&
                                                    <span className={"product-info-number-of-ratings"}>
                                                        {this.state.book.numberOfRatings} ratings
                                            </span>
                                                }
                                            </div>
                                            :
                                            <span className={"not-enough-ratings-span"}>Not enough ratings</span>
                                        }
                                    </div>
                                    <hr />
                                </div>

                                <div className={"product-info-price"}>
                                    {this.state.book.originalPrice &&
                                        <span className={"product-deal-price-st"}>${this.state.book.originalPrice} </span>}
                                    <span className={"product-deal-price"}>${this.state.book.price}</span>
                                    {this.state.book.originalPrice &&
                                        <p className={"product-info-savings"}>
                                            You save - ${(this.state.book.originalPrice - this.state.book.price).toFixed(2)}
                                        </p>
                                    }
                                </div>

                                <div className={"product-info-left-margin"}>
                                    <FormGroup controlId="formQuantitySelect" className={"quantity-select"}>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl
                                            type="number"
                                            name="quantity"
                                            value={this.state.qty}
                                            onChange={(e) => this.qty(this.props.match.params.id, e)}
                                            onBlur={this.onQuantityBlur}
                                        />
                                    </FormGroup>
                                </div>
                                <div className={"product-info-left-margin"}>
                                    <span>
                                        <Button
                                            type="submit"
                                            bsstyle={"primary"}
                                            className={"btn add-to-cart-product"}
                                        >Add to Cart
                                        </Button>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col lgoffset={12} mdoffset={12} lg={12} md={12}>
                                <div className={"product-info-left-margin"}>
                                    <h2 className={"product-description-heading"}>Product Description:</h2>
                                    <hr />
                                    <p className={"product-description"}>{this.state.book.description}</p>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </>
        );
    }
}
