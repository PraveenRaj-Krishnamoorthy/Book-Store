import { useEffect } from "react"
import "../css/cart.css"
import { useState } from "react"
import axios from "axios"
import { NavBar } from "./NavBar"
import { useNavigate } from "react-router-dom"

export const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([])
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState({
        user: "",
        place: "",
        mode: ""
    })
    const [style] = useState({
        color: "red",
    })
    useEffect(() => {
        const ferchCartItems = async () => {
            try {

                await axios.get("http://localhost:8081/api/allbooks")
                    .then((res) => {
                        const filteredData = res.data.filter((e, i) => {
                            return e.count > 0
                        })
                        const tCount = res.data.reduce((acc, book) => {
                            return acc + book.count
                        }, 0)
                        const totalPrice = res.data.reduce((acc, book) => {
                            return acc + book.price * book.count
                        }, 0)
                        setCartItems([...filteredData])
                        setCount(tCount)
                        setTotal(totalPrice)
                    }).catch((err) => {
                        console.log(err.message);
                    })
            } catch (error) {
                console.log(error);
            }
        }
        ferchCartItems()
    }, [cartItems])

    const handleChange = (event) => {
        const { name, value } = event.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const paymentData = {
            user: data.user,
            mode: data.mode,
            place: data.place,
            total: total,
            cartItems
        }
        if (count !== 0) {
            navigate("/paymentpage", { state: paymentData })
        } else {
            alert("select products for purchase!")
        }
    }

    const removeIt = async (id) => {
        try {
            await axios.post(`http://localhost:8081/api/countminus/${id}`)
                .then((res) => {
                    console.log(res.data.message);
                }).catch((err) => {
                    console.log(err.message);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const addIt = async (id) => {
        try {
            await axios.post(`http://localhost:8081/api/countplus/${id}`)
                .then((res) => {
                    console.log(res.data.message);
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
            <div className="cartPage">
                {cartItems.length > 0 && <div className="ordered">
                    <table className="c-table">
                        <thead className="c-thead">
                            <tr className="c-tr">
                                <th className="c-th">S.No</th>
                                <th className="c-th" >Title</th>
                                <th className="c-th" >Author</th>
                                <th className="c-th" >Price/1</th>
                                <th className="c-th" >Count</th>
                                <th className="c-th" >Price</th>
                                <th className="c-th" >Action</th>
                            </tr>
                        </thead>
                        <tbody className="c-tbody">
                            {cartItems.map((e, i) => (
                                <tr className="c-tr" key={e._id}>
                                    <td className="c-td" >{i + 1}</td>
                                    <td className="c-td" >{e.title}</td>
                                    <td className="c-td" >{e.author}</td>
                                    <td className="c-td" >{e.price}</td>
                                    <td className="c-td" >{e.count}</td>
                                    <td className="c-td" >{e.price * e.count}</td>
                                    <td className="c-td" ><button className="minus" onClick={() => { removeIt(e._id) }}>-</button> <button className="plus" onClick={() => { addIt(e._id) }}>+</button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="tf" colSpan={4}>Total: </td>
                                <td className="tf">{count}</td>
                                <td className="tf" colSpan={2}>{total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>}
                {cartItems.length === 0 && <span><h1 style={style}>your cart is empty!</h1></span>}
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="label">User name..</td>
                                    <td><input type="text" name="user" id="" placeholder="enter name.." required onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className="label">Location..</td>
                                    <td><input type="text" name="place" placeholder="enter location.." required onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className="label">Payment Mode..</td>
                                    <td>
                                        <input type="radio" name="mode" value={"Cash"} onChange={handleChange} /> Cash &nbsp;
                                        <input type="radio" name="mode" value={"Online"} onChange={handleChange} /> Online
                                    </td>
                                </tr>
                                <tr>
                                    <td><span></span></td>
                                    <td className="butt-tr">
                                        <button className="butt">Confirm Purchase</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}