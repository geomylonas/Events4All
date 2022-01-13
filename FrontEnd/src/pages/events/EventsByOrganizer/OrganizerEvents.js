import React from 'react';
import classes from "../MainPage.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteModal from '../DeleteEventModal';

class OrganizerEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      openModal: false,
      openModalPurchase: false,
      activeItem: '',
      loading: false,
      page: 0,
      prevY: 0,
      stoploading: false, 
    };
  }




  getEvents(page) {

    

      this.setState({ loading: true });
      axios.get(`https://localhost:44359/api/Events/organizer/${page}/12/`, {
        headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    }
      )
        .then((res) => {
          this.setState({ events: [...this.state.events, ...res.data] });
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
          this.setState({ stoploading: true });

        });
    


  };



  componentDidMount() {
    this.getEvents(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.01
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);

  }


  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y && !this.state.stoploading) {
      const currentPage = (this.state.events.length / 12);
      this.getEvents(currentPage);
      this.setState({ page: currentPage });
    }
    this.setState({ prevY: y });
  }

 


  onClickButton = (ev) => {
    this.setState({ activeItem: ev }, () => this.setState({ openModal: true }));
    console.log(ev.Id)

  }
  onCloseModal = () => {
    this.setState({ openModal: false})
  }



  


 

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };


    return (


      <div>
        
        <div className={classes.allEvents}>
          {this.state.events.map(ev => (

            <div className={classes.individualSampleEvent} key={ev.Id}>
              {ev.Id}
              <Link to={`/events/info/${ev.Id}`}>
                <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.eventPicture} />
              </Link>
              <div className={classes.sampleEventBody}>
                <h4>{ev.Title}</h4>
                <p className={classes.overflow}>{ev.Description}</p>
                <select>
                  <option defaultValue hidden>Select Ticket</option>
                {ev.Tickets.map(cat=>(
                  <option key={cat.Category.Name} >{cat.Category.Name} {cat.Price}&euro;</option>
                ))}
                  </select>
                <div>
                  <Link to={`/events/info/${ev.Id}`}>
                    <button className={classes.detailsButton}>Details</button>
                  </Link>
                  
                </div>
              
                <img className={classes.trashcan} src={require("../../../images/trashcan.png")} alt="trashcan" onClick={() => this.onClickButton(ev)} />
              </div>
            </div>

          ))}
          <DeleteModal eventchosen={this.state.activeItem.Id} show={this.state.openModal} onHide={this.onCloseModal} />




        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <div className={classes.loader} style={loadingTextCSS}></div>
        </div>
      </div>

    );
  }
};
export default OrganizerEvents;




