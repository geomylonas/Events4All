import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Purchases.css";



export default function Purchases(){

    const [data,setData] = useState([]);
    useEffect(() => {
        getPurchases();
    }, []);



    function getPurchases(){
        axios
        .get(
            `https://localhost:44359/api/PurchaseDTO`,{
                headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
            }
        )
        .then((res) => {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }

    

    return(
        <>
        <div id="title">
            <h2>Tickets</h2>
        </div>
        <div id="tickets">
            {data.map(p=>{

                return(

                    <div className="purchase" key={p.TicketCodes[0]}>
                        <h4>Title</h4>
                        {p.EventTitle}
                        <h4>Address</h4>
                        {p.EventAddress}
                        <h4>Date Of Purchase</h4>
                        {p.PurchaseDate.slice(0,10)}
                        <h4>Ticket Quantity</h4>
                        {p.TicketQuantity}
                        <Link to={`/events/info/${p.EventId}`}>
                        <button className="toEvent">Check Event</button>
                        </Link>
                    </div>
                    )
                })
            }
        </div>
        </>
    )
}   