import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from '../EventInfo.module.css';
import { Card, Carousel, ProgressBar } from "react-bootstrap";
import "./EventInfoOrganizer.css";
import DeleteModal from '../DeleteEventModal';
import { Link } from 'react-router-dom';

function OrganizerEventInfo(props) {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [deleteModal, setDeletemodal] = useState(false);

    useEffect(() => {
        fetchEvent();
    }, []);
    const fetchEvent = () => {
        if (id != null) {


            axios
                .get(
                    `https://localhost:44359/api/Events/?id=${id}`
                )
                .then((res) => {
                    setData(res.data);
                    console.log(res.data)
                    
                })
                .catch((err) => console.log(err));
        }
    };


    function deleteEvent(){
        setDeletemodal(true);
        
    } 
    function closeModal(){
        setDeletemodal(false);
        
    } 
  

    if (data.length == 0) return null;
    return (
        
        <div className={classes.eventSection} key={data.Id}>


            <div className={classes.col1}>
            <Carousel style={{width: "100%"}} fade>
                {data.Pictures.map(i=>{
                    
                    return(
                        
                        <Carousel.Item >
                        <img src={require(`../../../Files/${i.Url}`)} className="orgImg" alt={`${i.Url}`} />
                        </Carousel.Item>
                    )
                            
                })}
            </Carousel>
                <div className="orgticketBox">
                    <h4>Tickets</h4>
                    <div className="orgcategorytickets">
                        <div>
                            <h6>Category</h6>
                            {data.Tickets.map(p => (

                                <div className={classes.categorydiv} key={p.Category.Name}>{p.Category.Name}</div>

                            ))}
                        </div>
                        <div>
                            <h6>Price</h6>
                            {data.Tickets.map(p => (

                                <div key={p.Category.Name} name={p.Price} className="price">{p.Price}</div>

                            ))}
                        </div>
                    </div>

                </div>
                
            </div>



            <div id="delEdit">
            { 
                  data.Tickets.map((tic, index) => ( tic.PurchaseDetails.length == 0 && index < 1) &&
                  <button key={tic.Id} onClick={deleteEvent} disabled={false}>Delete</button>)
            }
            {
                 data.Tickets.map((tic) => ( tic.PurchaseDetails.length > 0) &&
                 <button key={tic.Id} disabled={true}>Delete</button>)
            }  
            {
                (data.DateOfEvent > new Date().toJSON().slice(0, 16)) &&
                <Link to={`/editevent/info/${data.Id}`}>
                    <button >Edit</button>
                </Link>
            } 
            </div>

            <div className={classes.col2}>
                

                <h4>Event happening</h4>
                <Card body className={classes.eventBox}>{data.PlaceName}</Card>
                <h4>Address</h4>
                <Card body className={classes.eventBox}>{data.PlaceAddress}</Card>
                <h4>Description</h4>
                <Card body className={classes.eventBox}>{data.Description}</Card>
                <h4>Date Of Event</h4>
                <Card body className={classes.eventBox}>
                    {data.DateOfEvent}
                </Card>
                <h4>AvailableTickets</h4>
                <ProgressBar style={{height: "30px", fontSize: "16px"}} now={data.AvailableTickets} label={`${data.AvailableTickets}`} />
            </div>
          <DeleteModal eventchosen={data.Id} show={deleteModal} onHide={closeModal}/>
            



        </div>

    );
}




export default OrganizerEventInfo;









