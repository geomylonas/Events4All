import React from 'react';
import classes from './CreateNewEvent.module.css';
import axios from 'axios';
import QueryString from 'qs';
import { Popover, OverlayTrigger } from "react-bootstrap";



class CreateNewEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            eventcategories: [],
            ticketcategories: [],
            EventCategory: 0,
            Tickets: [],
            Price: 0,
            TicketCategory: '',
            checkboxToggle: true,
            Pictures:[]
        };
    };

    getEventCategories() {
        axios.get(`https://localhost:44359/api/EventCategories`
        )
            .then((res) => {
                this.setState({ eventcategories: [...this.state.eventcategories, ...res.data] });
            })
            .catch((err) => {
                console.log(err);

            });
    }

    getTicketCategories() {
        axios.get(`https://localhost:44359/api/categories`
        )
            .then((res) => {
                this.setState({ ticketcategories: [...this.state.ticketcategories, ...res.data] });
            })
            .catch((err) => {
                console.log(err);

            });
    }

    componentDidMount() {
        this.getEventCategories();
        this.getTicketCategories();
    }

    changeHandler = e => {
        this.setState({ EventCategory: JSON.parse(e.target.value) })
    }

    changeHandlerTicket = e => {
        var Ticket = { Category: { Id: 1 }, Price: parseInt(e.target.value) }
        // this.setState({Tickets: [...this.state.Tickets, JSON.stringify(Ticket)]})
        console.log(this.state.Tickets);

    }


    changeHandlerCategory = e => {
        const cat = JSON.parse(e.target.value);
        this.setState({ Category: cat });
        if (this.state.checkboxToggle) {
            this.setState({ checkboxToggle: false });
        }
        else {
            this.setState({ checkboxToggle: true });
        }
    }
    
    submitHandler = e => {
        e.preventDefault();
        
    if (e.target[5].value > new Date().toJSON().slice(0, 16)) {
        var files = e.target[1].files;
        let filesArr=[]
        const url = "https://localhost:44359/api/pictures/upload";
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
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

            var Ticket1 = { Category: { Id: 1, Name: "Normal" }, Price: parseInt(e.target[8].value) };
            var Ticket2 = { Category: this.state.Category, Price: parseInt(e.target[10].value) };

            if (this.state.checkboxToggle) {

                this.state.Tickets = [...this.state.Tickets, Ticket1]
            }
            else {

                this.state.Tickets = [...this.state.Tickets, Ticket1, Ticket2]
            }


            var event = {
                Title: e.target[0].value,
                Pictures: this.state.Pictures,
                PlaceName: e.target[2].value,
                PlaceAddress: e.target[3].value,
                Description: e.target[4].value,
                DateOfEvent: e.target[5].value,
                AvailableTickets: parseInt(e.target[6].value),
                EventCategory: this.state.EventCategory,
                Tickets: this.state.Tickets
            }


            console.log(event);
            console.log(this.state.Pictures);
            const headers = {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

            axios.post("https://localhost:44359/api/events", event, {
                headers: headers
            })
                .then(response => {
                    console.log(response)
                }).then(response => {
                    alert("Created Successfully")
                    window.location.reload(true);
                })
                .catch(error => {
                    console.log(error)

                })

        }
        else {
            alert("Please input a Valid Date");
        }
    }
    checkDate = e => {
        if (e.target.value < new Date().toJSON().slice(0, 16)) {
            alert("Invalid Date");
            e.target.value = new Date().toJSON().slice(0, 16);
        }
    }


    setFile = e => {
        var files = e.target.files;
        let filesArr=[]
        console.log(files);
        let Picture;
        Array.from(files).forEach(file=>{
        Picture = {Url: file.name}
        filesArr=[...filesArr, Picture];
        });
        this.setState({Pictures: filesArr});
    }




    render() {

        const popoverTitle = (

            <Popover id="popover-basic">
                <Popover.Header as="h3">Title</Popover.Header>
                <Popover.Body>
                    Max length 30 characters
                </Popover.Body>
            </Popover>
        );

        const popoverDescription = (

            <Popover id="popover-basic">
                <Popover.Header as="h3">Description</Popover.Header>
                <Popover.Body>
                    Max length 500 characters
                </Popover.Body>
            </Popover>
        );
        const popoverEventHappening = (

            <Popover id="popover-basic">
                <Popover.Header as="h3">Event Happening</Popover.Header>
                <Popover.Body>
                    Max length 30 characters. Building, Property, Hotel ect
                </Popover.Body>
            </Popover>
        );

        const popoverAddress = (

            <Popover id="popover-basic">
                <Popover.Header as="h3">Address</Popover.Header>
                <Popover.Body>
                    Max length 50 characters
                </Popover.Body>
            </Popover>
        );

        const popoverPrice = (

            <Popover id="popover-basic">
                <Popover.Header as="h3">Price</Popover.Header>
                <Popover.Body>
                    Only the Amount (Amount is Converted to (&euro;))
                </Popover.Body>
            </Popover>
        );

        

        return (


            <div className={classes.newEventForm}>
                <h1>Event Creation</h1>
                <form onSubmit={this.submitHandler}>
                    <div className={classes.eventinfo}>

                        <h4>Event Title</h4>
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverTitle}>
                            <input type="text" name="Title" placeholder="Title" maxLength="30"></input>
                        </OverlayTrigger>
                        <h4>Insert Your Pictures</h4>
                        <input type="file" onChange={this.setFile} multiple></input>
                        <h4>Event happening</h4>
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverEventHappening}>
                            <input type="text" name="PlaceName" maxLength="30" placeholder="Building, Property etc"></input>
                        </OverlayTrigger>
                        <h4>Address</h4>
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverAddress}>
                            <input type="text" name="PlaceAddress" maxLength="50" placeholder="PlaceAddress"></input>
                        </OverlayTrigger>
                        <h4>Description</h4>
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverDescription}>
                            <textarea id="txtid" style={{ maxHeight: "150px" }} maxLength="500" name="Description" rows="4" cols="50" maxLength="500"></textarea>
                        </OverlayTrigger>
                        <h4>Date Of Event</h4>
                        <input type="datetime-local" onChange={this.checkDate} name="DateOfEvent" placeholder="Date Of Event"></input>
                        <h4>Available Tickets</h4>
                        <input type="number" name="AvailableTickets" placeholder="Available Tickets"></input>
                    </div>

                    <div className={classes.categorytickets}>
                        <h4>Choose Your Event Category</h4>
                        <div>
                            <select onChange={this.changeHandler}>
                                <option hidden>Choose A Category</option>
                                {this.state.eventcategories.map((evc) => (

                                    <option key={evc.Id} value={JSON.stringify(evc)}>{evc.Name}</option>
                                ))}
                            </select>
                        </div>
                        <h4>Choose your Ticket Categories</h4>
                        <div>
                            Normal
                            <OverlayTrigger trigger="focus" placement="right" overlay={popoverPrice}>
                                <input type="text" placeholder='Price' disabled={this.checkboxToggle} name="Price"></input>
                            </OverlayTrigger>
                            {this.state.ticketcategories.map((t, index) => (

                                index > 0 &&
                                <div id={classes.categorydiv} key={t.Id}>{t.Name}



                                    <input type="checkbox" value={JSON.stringify(t)} name="Category" onClick={this.changeHandlerCategory}></input>

                                    <input type="text" placeholder='Price' disabled={this.state.checkboxToggle} name="Price"></input>
                                </div>
                            ))}
                        </div>

                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default CreateNewEvent;
