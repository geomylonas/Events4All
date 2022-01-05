import React from 'react';
import classes from "./MainPage.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import PurchaseModal from './PurchaseModal';
import DeleteModal from './DeleteEventModal';


class FeaturedEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      eventcategories:[],
      openModal: false,
      openModalPurchase: false,
      activeItem: '',
      loading: false,
      checked: '',
      page: 0,
      prevY: 0,
      eventcategoryname:''
    };
  }


  

  getEvents(page, eventcategories) {
    console.log(eventcategories);
    this.setState({ loading: true });
    axios.get(`https://localhost:44359/api/Events/${page}/12`
    )
    .then((res) => {
      this.setState({ events: [...this.state.events, ...res.data] });
      this.setState({ loading: false });
     
    })
    .catch((err) => {
      console.log(err);
      
    });
    
    // }
    // else{
    //   this.setState({ loading: true });
    //   axios.get(`https://localhost:44359/api/Events/${page}/12/${this.state.events.category}`
    //   )
    //   .then((res) => {
    //     this.setState({ events: [...this.state.events, ...res.data] });
    //     this.setState({ loading: false });
    //   })
    //   .catch((err) => {
    //     console.log(err);
        
    //   });
     
    // }

  };


  getEventCategories(){
    axios.get(`https://localhost:44359/api/EventCategories`
    )
    .then((res) => {
      this.setState({ eventcategories: [...this.state.eventcategories, ...res.data] });
      console.log(this.state.eventcategories)
    })
    .catch((err) => {
      console.log(err);
      
    });
  }






  componentDidMount() {
    this.getEventCategories();
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
        console.log(this.state.events.length);
          
     
  }


  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const currentPage = (this.state.events.length/12);
      this.getEvents(currentPage);
      this.setState({ page: currentPage });
      console.log(currentPage);
    }
    this.setState({ prevY: y });
    console.log(this.state.prevY);
  }



  onClickButtonPurchase= (ev)=>{
    this.setState({ activeItem: ev }, () => this.setState({ openModalPurchase: true }));
    console.log(ev.Id)
  }

  onClickButton = (ev) => {
    this.setState({ activeItem: ev }, () => this.setState({ openModal: true }));
    console.log(ev.Id)
  }
  onCloseModal = () => {
    this.setState({ openModal: false, openModalPurchase: false })
  }


  showEventCategories(){
    if(!this.state.openList){
        this.setState({openList: true});
        console.log("hey true");
    }
    else {
        this.setState({openList: false});
        console.log("hey");
    }
}





selectCategory(cat){
   const {name, value} = cat.target;
   this.setState({[name]: value});
   this.setState({checked: name})
}

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (


      <div className={classes.allEvents}>
        <div onClick={() => this.showEventCategories}>
                Click
            
                {this.state.eventcategories.map(cat =>(
                <div key={cat.Id}>
                <input type="radio" value={cat.Name} name={cat.Name} checked={this.state.checked == cat.Name} onChange={(cat) =>this.selectCategory(cat)}/>
                <label htmlFor={cat.Id}>{cat.Name}</label>
                </div>
                ))}
            
            </div>
        {this.state.events.map(ev => (
            <div className={classes.individualSampleEvent} key={ev.Id}>
              {ev.Id}
              <Link to={`/events/info/${ev.Id}`}>
                <img src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.eventPicture}/>
              </Link>
              <div className={classes.sampleEventBody}>
                <h4>{ev.Title}</h4>
                <p className={classes.overflow}>{ev.Description}</p>
                <div>
                  <Link to={`/events/info/${ev.Id}`}>
                    <button className={classes.detailsButton}>Details</button>
                  </Link>
                  <button className={classes.purchaseButton} onClick={() => this.onClickButtonPurchase(ev)}>Quick Purchase</button>
                </div>
                  <img className={classes.trashcan} src={require("../../images/trashcan.png")} alt="trashcan" onClick={() => this.onClickButton(ev)} />
              </div>
          </div>

        ))}
        <DeleteModal eventchosen={this.state.activeItem.Id} show={this.state.openModal} onHide={this.onCloseModal} />


        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
          >
          <span style={loadingTextCSS}>Loading....</span>
        </div>
        <PurchaseModal show={this.state.openModalPurchase} onHide={this.onCloseModal} />
      </div>

    );
  }
};
export default FeaturedEvents;




{/* <Card className={classes.wholeCard}>
  {ev.Id}
  <Link to={`/events/info/${ev.Id}`}>
    <Card.Img variant="top" src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
  </Link>
  <Card.Body className={classes.singleEventBody}>
    <Card.Title>{ev.Title}</Card.Title>
    <Card.Text className={classes.overflow}>
      {ev.Description}
    </Card.Text>
    <Link to={`/events/info/${ev.Id}`}>
      <button className={classes.outlineButtonCard}>Details</button>
    </Link>
    <button className={classes.filledButtonCard} onClick={() => this.onClickButtonPurchase(ev)} >Quick Purchase</button>
    <img className={classes.trashcan} src={require("../../images/trashcan.png")} alt="trashcan" onClick={() => this.onClickButton(ev)} />
  </Card.Body>
</Card> */}
