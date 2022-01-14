import React from "react";
import { Image, Carousel, Card, Button } from "react-bootstrap";
import CustomerForm from "../../components/CustomerForm/customerForm";
import classes from "./homepage.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";


function Homepage() {
    const scrollToRef = useRef();

    return (
        <div className={classes.container}>
            
            <div>
                <Carousel fade>
                    <Carousel.Item>
                        <Image src={require("../../images/events.jpg")} className={classes.homeImage} />
                        <Carousel.Caption>
                            <h3>Concerts</h3>
                            <p>Find concerts around the world</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.homeImage} />

                        <Carousel.Caption>
                            <h3>Parties</h3>
                            <p>Join Parties</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src="https://pma-iq.org/isset_content/dist/img/event.jpg" className={classes.homeImage} />
                        <Carousel.Caption>
                            <h3>Meetings</h3>
                            <p>Find Professional meetings</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className={classes.aboutUs}>
                <h2>About us</h2>
            </div>





            <div className={classes.cards}>

                <div className={classes.col1}>
                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>The Idea</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">How this idea came up.</Card.Subtitle>
                            <Card.Text>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                            </Card.Text>
                        </Card.Body>
                    </Card>


                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>The Customers</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Logging in as a Costumer.</Card.Subtitle>
                            <Card.Text>
                                Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
                <div className={classes.col2}>
                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>Who we are</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">The team behind this project.</Card.Subtitle>
                            <Card.Text>
                                Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                            </Card.Text>
                        </Card.Body>
                    </Card>


                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>The Organizer</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Logging in as a Organizer.</Card.Subtitle>
                            <Card.Text>
                                Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </div>
            </div>



            <div className={classes.sectionForm}>
                <CustomerForm />
            </div>


            <div className={classes.sampleEventsDiv}>
                <div className={classes.individualSampleEvent}>
                    <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    <div className={classes.sampleEventBody}>
                        <h4>Title</h4>
                        <h5>Description</h5>
                        <div>
                            <Link to="/register">
                                <button className={classes.outlineButton}>Details</button>
                            </Link>
                            <button className={classes.filledButton}>Quick Purchase</button>
                        </div>
                    </div>
                </div>
                <div className={classes.individualSampleEvent}>
                    <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    <div className={classes.sampleEventBody}>
                        <h4>Title</h4>
                        <h5>Description</h5>
                        <div>
                            <button className={classes.outlineButton}>Details</button>
                            <button className={classes.filledButton}>Quick Purchase</button>
                        </div>
                    </div>
                </div>
                <div className={classes.individualSampleEvent}>
                    <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    <div className={classes.sampleEventBody}>
                        <h4>Title</h4>
                        <h5>Description</h5>
                        <div>
                            <button className={classes.outlineButton}>Details</button>
                            <button className={classes.filledButton}>Quick Purchase</button>
                        </div>
                    </div>
                </div>
            </div>




        </div>

    )
}

export default Homepage;