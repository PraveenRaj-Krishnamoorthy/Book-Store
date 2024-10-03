import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";

export const BookDetails = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [style] = useState({
        color: "white",
    })
    const [overlay] = useState({
        color: "red"
    })

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                await axios.get("http://localhost:8081/api/allbooks")
                    .then((res) => {
                        let featuredData = res.data.filter((e, i) => {
                            return e.featured === true
                        })
                        setAllBooks([...featuredData])
                    }).catch((err) => {
                        console.log(err.message);
                    })
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllBooks();
    }, [allBooks, selectedBook]);

    const handleBookClick = (book, event) => {
        setSelectedBook(book);
    };

    const closeModal = () => {
        setSelectedBook(null);
    };

    const addIt = async (id) => {
        try {
            await axios.post(`http://localhost:8081/api/countplus/${id}`)
                .then((res) => {
                    console.log(res.data.message);
                    setSelectedBook({ ...selectedBook, count: selectedBook.count + 1 });
                }).catch((err) => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error);
        }
    }
    const removeIt = async (id) => {
        try {
            await axios.post(`http://localhost:8081/api/countminus/${id}`)
                .then((res) => {
                    console.log(res.data.message);
                    setSelectedBook((prevState) => ({
                        ...prevState,
                        count: prevState.count - 1
                    }))
                }).catch((err) => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar />
            <div className="book-details home">
                {allBooks.map((book) => (
                    <div className="showBooks" id="showBooks" key={book._id} onClick={(event) => handleBookClick(book, event)}>
                        <h2>{book.title}</h2>
                        <img src={`http://localhost:8081/images/${book.image}`} alt={book.title} />
                        <h3><span style={style}>Author: </span> {book.author}</h3>
                        <h4><span style={style}>Price: {book.price}.00 / 1 Book</span></h4>
                        <span style={style}>Cart Count: {book.count}</span>
                        <button>Show More</button>
                    </div>
                ))}
            </div>
            {selectedBook && (
                <>
                    <div className="overlay" >
                        <div className="left">
                            <h2>{selectedBook.title}</h2>
                            <img src={`http://localhost:8081/images/${selectedBook.image}`} alt={selectedBook.title} />
                        </div>
                        <div className="right">
                            <img src="/img/close.png" alt="" className="img" onClick={closeModal} />
                            <h3>
                                <span style={{ fontSize: "xx-large" }}>Detailed: </span> <br />
                                <span style={overlay}>Author: </span> {selectedBook.author} <br /> <br />
                                <span style={overlay}>Title: </span>{selectedBook.title} <br /> <br />
                                <span style={overlay}>Description: </span>
                                {selectedBook.description} <br /> <br />
                                <span style={overlay}>Price: </span> {selectedBook.price}
                            </h3>
                            <br /> <br />
                            <div className="act">
                                <button className="removeIt" onClick={() => { removeIt(selectedBook._id) }}>remove</button>
                                &nbsp;
                                <h1>{selectedBook.count}</h1>
                                &nbsp;
                                <button className="addIt" onClick={() => { addIt(selectedBook._id) }}>add</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};