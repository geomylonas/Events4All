import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Purchases.css";
import Qr from "./Qrcode";


export default function Purchases(props){

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
                let TicketCode={EventTitle: p.EventTitle, 
                    Name:localStorage.getItem("username"), 
                    TicketCodes:p.TicketCodes}
                return(
                    
                    <div className="purchase" key={p.TicketCodes[0]}>
                        <Qr code={TicketCode}></Qr>
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