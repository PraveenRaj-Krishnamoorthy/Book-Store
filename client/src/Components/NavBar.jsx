import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const [show, setShow] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    const handleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("http://localhost:8081/api/allbooks")
                    .then((res) => {
                        const countFiltered = res.data.filter((e, i) => {
                            return e.count > 0
                        })
                        setCartItem([...countFiltered])
                    }).catch((err) => {
                        console.log(err.message);
                    })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [cartItem, cartCount])

    useEffect(() => {
        const count = cartItem.reduce((acc, book) => {
            return acc + book.count
        }, 0)
        setCartCount(count)
    }, [cartItem])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600) {
                setShow(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <header>
                <div className="logo">
                    <img src="/img/books.png" alt="Logo" />
                    <h3>Online Book Store</h3>
                </div>
                <div className="hamburger" onClick={handleShow}>
                    <ul>
                        <li><span></span></li>
                        <li><span></span></li>
                        <li><span></span></li>
                    </ul>
                </div>
                {show && (
                    <div className="show-nav">
                        <ul className="nav-links">
                            <li>
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link to={"/bookdetails"}>Book Details</Link>
                            </li>
                            <li>
                                <Link to={"/shoppingcart"} className="shopping-cart">
                                    <img src="/img/shopping-cart.png" alt="" /><span>{cartCount}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
                <nav id="desktop-nav" className="nav-bar">
                    <ul className="nav-links">
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/bookdetails"}>Book Details</Link>
                        </li>
                        <li>
                            <Link to={"/shoppingcart"} className="shopping-cart">
                                <img src="/img/shopping-cart.png" alt="" /><span>{cartCount}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};