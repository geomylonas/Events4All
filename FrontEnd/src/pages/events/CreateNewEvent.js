import React from 'react';
import classes from './CreateNewEvent.module.css';
import axios from 'axios';
import QueryString from 'qs';




class CreateNewEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            eventcategories: [],
            ticketcategories: [],
            EventCategory: 0,
            Tickets:[],
            Price: 0,
            TicketCategory:'',
            checkboxToggle: true       
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
        this.setState({ EventCategory: JSON.parse(e.target.value )})
    }

    changeHandlerTicket = e => {
    var Ticket = { Category: {Id:1}, Price: parseInt(e.target.value) }
    // this.setState({Tickets: [...this.state.Tickets, JSON.stringify(Ticket)]})
    console.log(this.state.Tickets);

}


changeHandlerCategory= e => {
    const cat = JSON.parse(e.target.value);
    this.setState({Category: cat});
    if(this.state.checkboxToggle){
        this.setState({checkboxToggle: false});   
    }
    else{
        this.setState({checkboxToggle: true});
    }
}


    submitHandler = e => {
        e.preventDefault();
        var Pictures = []

        var Ticket1 = {Category:  {Id: 1, Name: "Normal"}, Price: parseInt(e.target[8].value)};
        var Ticket2 = {Category: this.state.Category, Price: parseInt(e.target[10].value)};
        
        if(this.state.checkboxToggle){

            this.state.Tickets = [...this.state.Tickets, Ticket1]
        }
        else{

            this.state.Tickets = [...this.state.Tickets, Ticket1, Ticket2]
        }
            
    
            var event ={
                Title: e.target[0].value,
                
                PlaceName: e.target[2].value,
                PlaceAddress: e.target[3].value,
                Description: e.target[4].value,
                DateOfEvent: e.target[5].value,
                AvailableTickets: parseInt(e.target[6].value),
                EventCategory: this.state.EventCategory,
                Tickets: this.state.Tickets   
            }

    
    console.log(event)
        const headers = {
                'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        
           axios.post("https://localhost:44359/api/events", event, {
                   headers: headers
               })
                .then(response => {
                        console.log(response)
                    }).then(response=>{
                        alert("Created Successfully")
                        window.location.reload(true)
                    })
                    .catch(error => {
                            console.log(error)
                    
                        })
                
    }






    render() {
      
        return (


            <div className={classes.newEventForm}>
                <h1>Event Creation</h1>
                <form onSubmit={this.submitHandler}>
                    <div className={classes.eventinfo}>

                        <h4>Event Title</h4>
                        <input type="text" name="Title" placeholder="Title"></input>
                        <h4>Insert Your Pictures</h4>
                        <input type="file" multiple></input>
                        <h4>Event happening</h4>
                        <input type="text" name="PlaceName" placeholder="Building, Property etc"></input>
                        <h4>Address</h4>
                        <input type="text" name="PlaceAddress" placeholder="PlaceAddress"></input>
                        <h4>Description</h4>
                        <textarea id="txtid" style={{ maxHeight: "150px" }} name="Description" rows="4" cols="50" maxLength="500"></textarea>
                        <h4>Date Of Event</h4>
                        <input type="datetime-local" name="DateOfEvent" placeholder="Date Of Event"></input>
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
                                       <input type="text" placeholder='Price' disabled={this.checkboxToggle} name="Price"></input>
                                {this.state.ticketcategories.map((t,index) => (

                                     index > 0 &&
                                        <div id={classes.categorydiv} key={t.Id}>{t.Name}

                                       
                                        
                                        <input type="checkbox" value={JSON.stringify(t)} name="Category" onClick={this.changeHandlerCategory}></input>
                                       
                                        <input type="text" placeholder='Price' disabled={this.state.checkboxToggle} name="Price"></input>
                                        </div>
                                        
                                    
                                ))}
                            </div>

                        </div>
                <button type="submit">Create</button>
                </form>
            </div>


        )
    }

}

export default CreateNewEvent;



{/* <FloatingLabel controlId="floatingTextarea2" label="Title">
                    <Form.Control type="text" placeholder="Title" name="Title" value={Title} onChange={this.changeHandler}/>
                    </FloatingLabel> */}