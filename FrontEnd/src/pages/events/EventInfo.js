import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './EventInfo.module.css';
import { Image, Card, Button, Modal } from "react-bootstrap";
import PurchaseModal from './PurchaseModal';



function EventInfo() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchEvent();
    }, []);
    const fetchEvent = () => {
        axios
            .get(
                `https://localhost:44359/api/Events/?id=${id}`
            )
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className={classes.eventSection} key={data.Id}>


            <div className={classes.col1}>
                <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.eventImage} />

                <div className={classes.ticketBox}>
                    <h4>Choose a Ticket</h4>
                    <div className={classes.categorytickets}>
                        <div>
                            <h6>Category</h6>
                            <div>Category</div>
                            <div>Category</div>

                        </div>
                        <div>
                            <h6>Price</h6>
                            <div>Price</div>
                            <div>Price</div>
                        </div>
                    </div>
                    <button className={classes.filledButton} onClick={() => setModalShow(true)}>Add to Cart</button>
                </div>
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
            </div>

            <PurchaseModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>

    );
}




export default EventInfo;









