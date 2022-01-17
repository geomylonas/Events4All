import React from "react";
import { Image, Carousel, Card, Button } from "react-bootstrap";
import CustomerForm from "../../components/CustomerForm/customerForm";
import classes from "./homepage.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";


function Homepage(props) {
    const scrollToRef = useRef(null);

    
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
                    <Carousel.Item>
                        <Image src={require("../../images/convention.jpg")} className={classes.homeImage} />
                        <Carousel.Caption>
                            <h3>Conventions</h3>
                            <p>Find Professional meetings</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={require("../../images/lecture.jpg")} className={classes.homeImage} />
                        <Carousel.Caption>
                            <h3>Lectures</h3>
                            <p>Attend Lectures</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className={classes.aboutUs}>
                <h2>About us</h2>
            </div>


            


            <div ref={props.refProp} className={classes.cards}>

                <div className={classes.col1}>
                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>The Idea</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">How this idea came up.</Card.Subtitle>
                            <Card.Text>
                                The idea came up from one of our group members, who was really into concerts, events etc. Taking that into consideration we designed a web application where users will be able to buy tickets and publish events. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
 
 
                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>The Customers</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Logging in as a Costumer.</Card.Subtitle>
                            <Card.Text>
                                Joining in our delighted Customer Community you will be able to browse throught our list of events, find information about them, check ticket availability and purchase tickets.                            </Card.Text>
                        </Card.Body>
                    </Card>
 
                </div>
                <div className={classes.col2}>
                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>Who we are</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">The team behind this project.</Card.Subtitle>
                            <Card.Text>
                                We are a team of four ambitious junior Web Developers, eager to start our journey in this industry, learn new technologies and gain experience so we can evolve and have a successful career.
                            </Card.Text>
                        </Card.Body>
                    </Card>
 
 
                    <Card style={{ margin: "15px 0" }}>
                        <Card.Body>
                            <Card.Title>The Organizer</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Logging in as a Organizer.</Card.Subtitle>
                            <Card.Text>
                                Become a member of our experienced event organizer team where you will be able to manage and publish your event and their respective tickets. <br/><strong>Join Now!</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </div>
            </div>



            <div className={classes.sectionForm}>
                <CustomerForm />
            </div>

                
                <h1 id={classes.h1}>Our Hosted Events Look Like</h1>
            <div className={classes.sampleEventsDiv}>
                <div className={classes.individualSampleEvent}>
                    <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    <div className={classes.sampleEventBody}>
                        <h4>Title</h4>
                        <h5>Description</h5>
                        <div>
                            <Link to="/events/mainpage">
                                <button className={classes.outlineButton}>Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={classes.individualSampleEvent}>
                    <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    <div className={classes.sampleEventBody}>
                        <h4>Title</h4>
                        <h5>Description</h5>
                        <div>
                        <Link to="/events/mainpage">
                                <button className={classes.outlineButton}>Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={classes.individualSampleEvent}>
                    <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    <div className={classes.sampleEventBody}>
                        <h4>Title</h4>
                        <h5>Description</h5>
                        <div>
                        <Link to="/events/mainpage">
                                <button className={classes.outlineButton}>Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>




        </div>

    )
}

export default Homepage;