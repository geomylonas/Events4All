import React from 'react';
import classes from "../MainPage.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteModal from '../DeleteEventModal';
import { act } from 'react-dom/test-utils';
import EventFilter from '../components/EventFilter';


class OrganizerEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      eventcategories: [],
      openModal: false,
      openModalPurchase: false,
      activeItem: '',
      loading: false,
      page: 0,
      prevY: 0,
      eventCategoryId: 0,
      stoploading: false,
      ticketDisabled: [],
      ticketId: 0,
      ticketCategory: '',
      ticketPrice: 0
    };
  }




  getEvents(page) {

    if (this.state.eventCategoryId == 0) {

      this.setState({ loading: true });
      axios.get(`https://localhost:44359/api/Events/${page}/12/`
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
    }
    else {

      this.setState({ loading: true });
      axios.get(`https://localhost:44359/api/Events/${page}/12/${this.state.eventCategoryId}`
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
    }


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

  addToCart = (ev) => {
    const selectedProduct = { eventId: ev.Id, eventTitle: ev.Title, ticketId: this.state.ticketId,
     ticketCategory: this.state.ticketCategory, ticketPrice: this.state.ticketPrice }
    console.log(selectedProduct);
    this.props.addToCart(selectedProduct);
  }


  onClickButton = (ev) => {
    this.setState({ activeItem: ev }, () => this.setState({ openModal: true }));
    console.log(ev.Id)

  }
  onCloseModal = () => {
    this.setState({ openModal: false, openModalPurchase: false })
  }



  eventCategoryFilter(cat) {
    this.state.eventCategoryId = cat;
    this.setState({ stoploading: false })
    this.setState({ events: [], page: 0 })
  }


  selectPrice = (id) => e =>{
    let catprice = JSON.parse(e.target.value);
    console.log(catprice);
    console.log(id);
    this.setState({ticketDisabled: [...this.state.ticketDisabled, id]});
    this.setState({ticketId: catprice.Id, ticketPrice: catprice.Price, ticketCategory: catprice.Category.Name})
  }

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };


    return (


      <div>
        <div className={classes.filter}>
          <EventFilter eventcategory={(cat) => this.eventCategoryFilter(cat)} />
        </div>
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
                <select onChange={this.selectPrice(ev.Id)}>
                  <option defaultValue hidden>Select Ticket</option>
                {ev.Tickets.map(cat=>(
                  <option key={cat.Category.Name} value={JSON.stringify(cat)}>{cat.Category.Name} {cat.Price}&euro;</option>
                ))}
                  </select>
                <div>
                  <Link to={`/events/info/${ev.Id}`}>
                    <button className={classes.detailsButton}>Details</button>
                  </Link>
                  <button className={classes.purchaseButton} onClick={() => this.addToCart(ev)} disabled={!this.state.ticketDisabled.includes(ev.Id)}>Add to Cart</button>
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




