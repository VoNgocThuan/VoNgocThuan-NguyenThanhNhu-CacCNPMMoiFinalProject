import React, { useState } from "react";
import { Container, Button, FormControl, Form, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";
const Header = (props) => {
    const logout = () => {
        localStorage.removeItem("loginData");
        window.location.href = PUBLIC_URL + "login";
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Link to={`${PUBLIC_URL}`}>
                    <Navbar.Brand href="#home">
                        ShopBanSach
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={`${PUBLIC_URL}`}>
                            <Nav.Item className="text-white mr-2">Trang chủ</Nav.Item>
                        </Link>
                        {props.authData.isLoggedIn && (
                            <Link to={`${PUBLIC_URL}categories`}>
                                <Nav.Item className="text-white mr-2">Thể loại sách</Nav.Item>
                            </Link>
                        )}
                        <Link to={`${PUBLIC_URL}about`}>
                            <Nav.Item className="text-white mr-2">Về chúng tôi</Nav.Item>
                        </Link>
                        <Link to={`${PUBLIC_URL}contact`}>
                            <Nav.Item className="text-white mr-2">Liên hệ</Nav.Item>
                        </Link>
                        {!props.authData.isLoggedIn && (
                            <>
                                <Link to={`${PUBLIC_URL}login`}>
                                    <Nav.Item className="text-white mr-2 ">Đăng nhập</Nav.Item>
                                </Link>
                                <Link to={`${PUBLIC_URL}register`}>
                                    <Nav.Item className="text-white mr-2 ">Đăng ký</Nav.Item>
                                </Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="ml-auto">
                        {props.authData.isLoggedIn && (
                            <>
                                <Nav.Link>Xin chào {props.authData.user.name}</Nav.Link>
                                <Nav.Link onClick={() => logout()}>
                                    <Nav.Item className="text-white mr-2 ">Đăng xuất</Nav.Item>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;