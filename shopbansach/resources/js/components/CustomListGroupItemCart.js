import React from "react";
import {Row, Col, Button, FormControl, Tooltip, OverlayTrigger} from "react-bootstrap";
import StarRatingComponent from 'react-star-ratings';
import BookView from "./pages/books/BookView";
import { connect } from 'react-redux';
import {editCart} from "../components/shoppingCart";
import { withRouter } from 'react-router-dom';

const tooltip = (
    <Tooltip id="tooltip">
        Remove Item
    </Tooltip>
);

class CustomListGroupItemCart extends React.Component{

    state = {
        quantity: this.props.quantity
    };

    editCart = (quantity) => {
        let updates = {
          quantity
        };
        this.props.dispatch(editCart(this.props.bookID, updates));
    };

    onQuantityChange = (e) => {
        e.stopPropagation();
        let quantity = e.target.value;
        this.setState(() => ({quantity}));
    };

    onQuantityIncrease = (e) => {
        e.stopPropagation();
        if(parseInt(this.state.quantity) < 99){
            this.setState((prevState) => ({quantity: prevState.quantity + 1}));
            this.editCart(parseInt(this.state.quantity) + 1);
        }
    };

    onQuantityDecrease = (e) => {
        e.stopPropagation();
        if(parseInt(this.state.quantity) > 1) {
            this.setState((prevState) => ({quantity: prevState.quantity - 1}));
            this.editCart(parseInt(this.state.quantity) - 1);
        }
    };

    onQuantityBlur = (e) => {
        e.stopPropagation();
        let quantity = e.target.value;
        if(quantity.length > 0 && parseInt(quantity) > 0 && parseInt(quantity) < 100){
            this.setState(() => ({quantity}));
            this.editCart(parseInt(quantity));
        }
        else{
            this.setState(() => ({quantity: 1}));
            this.editCart(1);
        }
    };

    removeFromCart = (e) => {
        e.stopPropagation();
        BookView.removeItemFromCart(this.props.bookID, this.props);
    };

    viewClickHandler = (routeName) => {
        this.props.handleClose();
        this.props.history.push(routeName);
    };

    render() {
        return (
            <li className="list-group-item">
                <div className={"media-left cursor-pointer"} onClick={() => this.viewClickHandler(`/shopbansach/books/${this.props.bookID}`)}>
                    <img className="media-object" src={this.props.image} alt="..." width={64} height={64} />
                </div>
                <div className={"media-body"}>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <h4 className={"media-heading"}>{this.props.name}</h4>
                            <div>
                                {(this.props.ratings && this.props.ratings > 0) ?
                                    <StarRatingComponent
                                        rating={this.props.ratings}
                                        starDimension={"15px"}
                                        starSpacing={"0px"}
                                        starRatedColor={"rgb(247, 202, 37)"}
                                    />
                                    :
                                    ''
                                }
                            </div>
                        </Col>

                        <Col lg={3} md={3} sm={12} xs={12}>
                            <div className={"star-rating-div"}>
                                <span>
                                    <Button onClick={this.onQuantityDecrease}>-</Button>
                                    <FormControl
                                        type="number"
                                        className={"cart-quantity"}
                                        value={this.state.quantity}
                                        onChange={this.onQuantityChange}
                                        onBlur={this.onQuantityBlur}
                                    />
                                    <Button onClick={this.onQuantityIncrease}>+</Button>
                                </span>
                            </div>
                        </Col>

                        <Col md={2} lg={2} sm={12} xs={12}>
                            <div className={"cart-price-div"}>
                              <span className={"cart-price"}>
                                  ${parseFloat(parseFloat(this.props.price) * parseInt(this.state.quantity)).toFixed(2)}
                              </span>
                            </div>
                        </Col>

                        <Col md={1} lg={1} sm={12} xs={12}>
                            <div className={"cart-remove-div"}>
                                <OverlayTrigger placement="top" overlay={tooltip}>
                                    <span onClick={this.removeFromCart}><Glyphicon glyph={"remove"}/></span>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </div>
            </li>
        )
    }
}

export default connect()(withRouter(CustomListGroupItemCart));