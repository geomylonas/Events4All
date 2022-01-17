import { useEffect, useState } from "react";
import axios from "axios";




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
        <div>
            {data.map(p=>{

                return(

                    <div className="purchase" key={p.TicketCodes[0]}>
                        <h2>Purchase Details</h2>
                        <h4>Title</h4>
                        {p.EventTitle}
                        <h4>Address</h4>
                        {p.EventAddress}
                        <h4>Purchase</h4>
                        {p.PurchaseDate}
                        <h4>Ticket Quantity</h4>
                        {p.TicketQuantity}
                </div>
                    )
                })
            }
        </div>
    )
}   