import { useEffect, useState } from "react"
import { NavBar } from "./NavBar"
import axios from "axios"
import { Footer } from "./Footer"

export const Home = () => {
    const [allBooks, setAllBooks] = useState([])
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
                        console.log(err);
                    })
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks()
    }, [])
    return (
        <>
            <NavBar />
            <div className="home">
                {allBooks.map((e, i) => (
                    <div className="showBooks" key={e._id}>
                        <h2>{e.title}</h2>
                        <img src={`http://localhost:8081/images/${e.image}`} alt="" />
                        <h3>{e.description}</h3>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}