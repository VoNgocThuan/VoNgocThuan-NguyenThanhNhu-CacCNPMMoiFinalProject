import React from 'react'
import { Card, Button, Badge, Spinner, Image } from 'react-bootstrap';
import { updateBook, deleteBook } from "../../../services/BookService";

import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import BookEdit from "../books/BookEdit";
class BookList extends React.Component {
    state = {
        book: {},
        isloading: false,
        category_id: this.props.category_id,
        toggleEditBook: false,
    };

    toggleCompleteStatus = async (item) => {
        if (item.status === 0) {
            item.status = 1;
        } else {
            item.status = 0;
        }
        await updateBook(item.bookId, item);
        this.props.onEditBook();
    };

    updateBook = async (id) => {
        const response = await updateBook(id);
        if (response.success) {
            this.props.onEditBook();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
    };

    deleteBook = async (id) => {
        const response = await deleteBook(id);
        if (response.success) {
            this.props.onEditBook();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
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

    toggleEditBook = () => {
        this.setState({
            toggleEditBook: !this.state.toggleEditBook,
        });
    };

    onCompleteBookEdit = () => {
        this.getBookDetails();
        this.toggleEditBook();
    }

    render() {
        return (
            <>
                {this.props.bookList.map((book, index) => (
                    <Card key={index} className="mt-1 mb-1">
                        <Card.Body>
                            <div>
                                <div className="float-left">
                                    <p>
                                        {book.status === 0 && (
                                            <del className="text-success">
                                                <strong>
                                                    {book.name}{" "}
                                                    <Badge variant="primary">{book.books_count}</Badge>
                                                </strong>
                                            </del>
                                        )}
                                    </p>
                                    <p>
                                        {book.status === 1 && (
                                            <span>
                                                Tên sách: {book.name}{" "}
                                                <Badge variant="primary">{book.books_count}</Badge>
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="float-right">
                                    <button
                                        className={`btn btn-outline-${book.status === 1 ? "info" : "success"
                                            } btn-sm`}
                                        onClick={() => this.toggleCompleteStatus(book)}
                                    >
                                        {book.status === 1 && <span> ✓ Hiện có</span>}
                                        {book.status === 0 && <span> Hết hàng</span>}
                                    </button>
                                    {/* <Button
                                        className="btn btn-success mr-2"
                                        onClick={() => this.toggleEditBook()}
                                    >
                                        {!this.state.toggleEditBook && <span>Edit</span>}
                                        {this.state.toggleEditBook && <span>Cancel Editing</span>}
                                    </Button> */}

                                    <Link
                                        to={`${PUBLIC_URL}books/view/${book.bookId}`}
                                        className="btn btn-outline-success btn-sm ml-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`${PUBLIC_URL}books/update/${book.bookId}`}
                                        className="btn btn-outline-primary btn-sm ml-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-outline-danger btn-sm ml-2"
                                        onClick={() => this.deleteBook(book.bookId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            {this.props.isDetailsView && (
                                <Card.Text>
                                    Giá tiền: {book.price} VNĐ
                                </Card.Text>
                            )}
                            {/* {this.state.toggleEditBook && (
                                <BookEdit
                                    
                                />
                            )} */}
                        </Card.Body>
                    </Card>
                ))}
            </>
        );
    }
}

export default BookList;