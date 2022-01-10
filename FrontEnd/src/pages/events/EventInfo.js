import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './EventInfo.module.css';
import { Image, Card, Button, Modal } from "react-bootstrap";
import Cart from '../../components/Cart/Cart';
import { propTypes } from 'react';



function EventInfo(props) {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [cartModal, setCartModal] = useState(false);
    const [checked, setChecked] = useState(false);



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
                })
                .catch((err) => console.log(err));
        }
    };


    // const addToCart = (ev) => {
    //     setProduct(ev);
    //     console.log(ev);
    // }

    function openCartModal() {
        setCartModal(true);
    }

    function onCloseCartModal() {
        setCartModal(false);
    }

    function handleChange(e){
        const price = e.target.name;
        const isChecked = e.target.checked;
        console.log(price);
    }

    if(data.length == 0) return null;
    const selectedProduct = { id: data.Id, title: data.Title}
    return (
        <div className={classes.eventSection} key={data.Id}>


            <div className={classes.col1}>
                <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.eventImage} />

                <div className={classes.ticketBox}>
                    <h4>Choose a Ticket</h4>
                    <div className={classes.categorytickets}>
                        <div>
                            <h6>Category</h6>
                            {data.Tickets.map(p => (
                                
                                <div key={p.Id}>{p.Category}</div>
                                
                            ))}
                        </div>
                        <div>
                            <h6>Price</h6>
                            {data.Tickets.map(p => (

                                <div key={p.Id}>{p.Price}
                                <input type="checkbox" name={p.Price} checked={p.Price} onChange={() => handleChange()}/>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                    <button className={classes.filledButton} onClick={() => props.addToCart(selectedProduct)}>Add to Cart</button>

                </div>
            </div>
            {/* <Cart productchosen={product} onClick={onCloseCartModal} show={cartModal}/> */}





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



        </div>

    );
}




export default EventInfo;









