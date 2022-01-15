import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";




export default function EditEvent() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [newCategory, setNewCategory] = useState();
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchEvent();
        getEventCategories();
        getTicketCategories();


    }, []);


    const fetchEvent = () => {
        if (id != null) {


            axios
                .get(
                    `https://localhost:44359/api/Events/?id=${id}`
                )
                .then((res) => {
                    setData(res.data);

                })
                .catch((err) => console.log(err));
        }
    };


    const getEventCategories = () => {
        axios.get(`https://localhost:44359/api/EventCategories`
        )
            .then((res) => {
                setEventCategories(res.data);
            })
            .catch((err) => {
                console.log(err);

            });
    }



    const getTicketCategories = () => {
        axios.get(`https://localhost:44359/api/categories`
        )
            .then((res) => {
                setTicketCategories(res.data);
            })
            .catch((err) => {
                console.log(err);

            });
    }




    const submitHandler = (e) => {
        e.preventDefault();
        var Ticket1 = { Category: { Id: 1, Name: "Normal" }, Price: parseInt(e.target[8].value) };

        var Ticket2 = null;

        if (e.target[10]) {
            Ticket2 = { Category: { Id: 2, Name: "VIP" }, Price: parseInt(e.target[10].value) };
        }

        let Tickets = []
        if (Ticket2 == null) {

            Tickets = [...Tickets, Ticket1]
        }
        else {

            Tickets = [...Tickets, Ticket1, Ticket2]
        }
        let eventcategory;
        if (newCategory == null) {
            eventcategory = data.EventCategory
        }
        else {
            eventcategory = newCategory
        }

        var Pictures=[];
        if(e.target[1].value){
            Pictures=[...Pictures,{Url : "HI"}]
        }


        var event = {
            Title: e.target[0].value,
            Id: data.Id,
            Pictures: Pictures,
            PlaceName: e.target[2].value,
            PlaceAddress: e.target[3].value,
            Description: e.target[4].value,
            DateOfEvent: e.target[5].value,
            AvailableTickets: parseInt(e.target[6].value),
            EventCategory: eventcategory,
            Tickets: Tickets
        }

        console.log(event);
        const headers = {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    
       axios.put("https://localhost:44359/api/events", event, {
               headers: headers
           })
            .then(response => {
                    console.log(response)
                }).then(response=>{
                    alert("Updated Successfully")
                    window.location.reload(true)
                })
                .catch(error => {
                        console.log(error)
                
                    })
    }

    const changeHandler = e => {
        setNewCategory(JSON.parse(e.target.value))

    }

  



    if (data.length == 0) return null;
    return (

        <div key={data.Id}>

            <form onSubmit={submitHandler}>
                <div>


                    <div>
                        <h4>Event Title</h4>
                        <input type="text" name="Title" defaultValue={data.Title} placeholder="Title" />
                        {/* <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/> */}
                        {data.Pictures.map(t => {
                            <span key={t}>{t}</span>
                        }
                        )
                        }
                        <h4>Insert Your Pictures</h4>
                        <input type="file" multiple />

                        <h4>Event happening</h4>

                        <input defaultValue={data.PlaceName} />
                        <h4>Address</h4>

                        <input defaultValue={data.PlaceAddress} />
                        <h4>Description</h4>

                        <input defaultValue={data.Description} />
                        <h4>Date Of Event</h4>

                        <input defaultValue={data.DateOfEvent} type="datetime-local" />

                        <h4>Available Tickets</h4>
                        <input type="number" defaultValue={data.AvailableTickets} name="AvailableTickets" placeholder="Available Tickets"></input>
                    </div>


                    <div>

                        <h4>Change Category</h4>
                        <div>
                            <select onChange={changeHandler}>
                                <option hidden>{data.EventCategory.Name}</option>
                                {eventCategories.map((evc) => (

                                    <option key={evc.Id} value={JSON.stringify(evc)}>{evc.Name}</option>
                                ))}
                            </select>
                        </div>
                        <h4>Tickets</h4>
                        <div>
                            <div>
                                <h6>Category</h6>
                                {data.Tickets.map(p => (

                                    <div key={p.Category.Name}>{p.Category.Name}</div>

                                ))}
                            </div>
                            <div>
                                <h6>Price</h6>
                                {data.Tickets.map(p => (

                                    <input key={p.Category.Name} defaultValue={p.Price} name={p.Price} />

                                ))}
                            </div>
                        </div>

                    </div>

                </div>
                <div>
                    <button>Update</button>
                </div>


            </form>
        </div>
    )
}