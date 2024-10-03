import { useLocation, useNavigate } from "react-router-dom"
import { NavBar } from "./NavBar"
import { useEffect, useState } from "react"
import "../css/payment.css";
import axios from "axios";

export const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [purchased, setPurchased] = useState([])
    const [refresh, setRefresh] = useState([]);
    const [data, setData] = useState({
        user: "",
        mode: "",
        place: "",
        total: ""
    })
    const [style] = useState({
        color: "white",
        fontSize: "larger"
    })
    useEffect(() => {
        const fetchData = () => {
            const { user, mode, place, total, cartItems } = location.state
            setData({
                user, mode, place, total
            })
            const purchasedData = cartItems.map((e, i) => (
                {
                    _id: e._id,
                    title: e.title,
                    price: e.price,
                    count: e.count,
                }
            ))
            setPurchased([{ user, place, mode, total }, ...purchasedData]);
            setRefresh([...purchasedData])
        }
        fetchData()
    }, [location]);

    useEffect(() => {
        const orderedData = async () => {
            try {
                if (purchased.length > 0) {
                    await axios.post("http://localhost:8081/api/orders", purchased)
                }
            } catch (error) {
                console.log(error);
            }
        }
        orderedData()
    }, [purchased])

    const refreshIt = async () => {
        try {
            await axios.post("http://localhost:8081/api/refresh", refresh)
                .then((res) => {
                    console.log(res.data);
                    navigate("/")
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
            <div className="payment">
                <h2>Dear <span style={style}>{data.user}</span>, your order of <span style={style}>₹{data.total}</span> is processed successfully.</h2>
                <div className="detail">
                    <h3>Amount: ₹{data.total}</h3>
                    <h3>Name: {data.user}</h3>
                    <h3>Location: {data.place}</h3>
                    <h3>Payment Mode: {data.mode}</h3>
                </div>
                <div className="button">
                    <button onClick={() => { refreshIt() }}>Navigate to Home</button>
                </div>
            </div>
        </>
    )
}