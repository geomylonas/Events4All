import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./EditEvent.css";




export default function EditEvent() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [newCategory, setNewCategory] = useState();
    const [Pictures, setPictures] = useState([]);

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
                    setPictures(res.data.Pictures);
                    
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
        if(e.target[1].files.length != 0){

            var files = e.target[1].files;
            let filesArr=[]
            const url = "https://localhost:44359/api/pictures/upload";
            
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            let Picture;
            Array.from(files).forEach(file=>{
                Picture = {Url: file.name}
                filesArr=[...filesArr, Picture];
                const formData = new FormData();
                formData.append('body', file);
                axios.post(url, formData, config)
                .then(response => {
                    console.log(response);
                }).then(response => {
                    alert("Uploaded Successfully")
                })
                .catch(error => {
                    console.log(error)
                    alert("Something Went Wrong");
                    window.location.reload(true);
                })
            });
        }
        
       


        var event = {
            Title: e.target[0].value,
            Id: data.Id,
            Pictures: Pictures,
            PlaceName: data.PlaceName,
            PlaceAddress: data.PlaceAddress,
            Description: data.Description,
            DateOfEvent: data.DateOfEvent,
            AvailableTickets: data.AvailableTickets,
            EventCategory: data.EventCategory,
            Tickets: data.Tickets
        }

        console.log(event);
        const headers = {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }

        axios.put("https://localhost:44359/api/events", event, {
            headers: headers
        })
            .then(response => {
                console.log(response)
            }).then(response => {
                alert("Updated Successfully")
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error)

            })
    }

    const changeHandler = e => {
        setNewCategory(JSON.parse(e.target.value))

    }

    const setFile = e => {
        var files = e.target.files;
        let filesArr=[]
        console.log(files);
        let Picture;
        Array.from(files).forEach(file=>{
        Picture = {Url: file.name}
        filesArr=[...filesArr, Picture];
        });
        setPictures(filesArr);
    }





    if (data.length == 0) return null;
    return (

        <div key={data.Id}>

            <form onSubmit={submitHandler}>
                <div className="forma" >
                    <div className="Event">
                        <h4>Event Title</h4>
                        <input type="text" name="Title" defaultValue={data.Title} placeholder="Title" />
                        {/* <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/> */}
                        {data.Pictures.map(t => {
                            <span key={t}>{t}</span>
                        }
                        )
                        }
                        <h4>Insert Your Pictures</h4>
                        <input type="file" onChange={setFile} multiple />

                        <h4>Event happening</h4>

                        <input defaultValue={data.PlaceName} disabled />
                        <h4>Address</h4>

                        <input defaultValue={data.PlaceAddress} disabled/>
                        <h4>Description</h4>

                        <textarea style={{ maxHeight: "100px" }} defaultValue={data.Description} disabled/>
                        <h4>Date Of Event</h4>

                        <input defaultValue={data.DateOfEvent} type="datetime-local" disabled/>

                        <h4>Available Tickets</h4>
                        <input type="number" defaultValue={data.AvailableTickets} name="AvailableTickets" placeholder="Available Tickets" disabled></input>
                    </div>


                    <div className="Ticket">
                        <h4>Change Category</h4>

                        <select onChange={changeHandler} disabled> 
                            <option hidden>{data.EventCategory.Name}</option>
                            {eventCategories.map((evc) => (

                                <option key={evc.Id} value={JSON.stringify(evc)}>{evc.Name}</option>
                            ))}
                        </select>

                        <h4>Tickets</h4>
                        <div className="Prices">
                            <div className="Headers">
                                <h6>Category</h6>
                                <h6>Price</h6>
                            </div>
                            {data.Tickets.map(p => (

                                <div className="Categories" key={p.Category.Name}>
                                    {p.Category.Name}
                                    <input key={p.Category.Name} defaultValue={p.Price} name={p.Price} disabled/>
                                </div>

                            ))}
                        </div>
                    </div>

                    <button>Update</button>
                </div>
                <div>
                </div>


            </form>
        </div>
    )
}