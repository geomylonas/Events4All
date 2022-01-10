import React from 'react';
import classes from "./MainPage.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteModal from './DeleteEventModal';
import { act } from 'react-dom/test-utils';


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
      checked: 0,
      page: 0,
      prevY: 0
    };
  }


  

  getEvents(page, eventcategory) {
    console.log(eventcategory);
      console.log(this.state.checked)
      this.setState({ loading: true });
      axios.get(`https://localhost:44359/api/Events/${page}/12/`
      )
      .then((res) => {
        this.setState({ events: [...this.state.events, ...res.data] });
        this.setState({ loading: false });
        
      })
      .catch((err) => {
        console.log(err);
        
      });
    

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
    this.getEvents(this.state.page, this.state.checked);     

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

  addToCart = (ev) =>{
    const selectedProduct = { id: ev.Id, title: ev.Title}
    console.log(selectedProduct)
    this.props.addToCart(selectedProduct)
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

componentDidUpdate(prevState, prevProps){
  if(prevProps.checked !== this.state.checked){
    console.log(prevProps.checked)
    console.log(this.state.checked)
    console.log("HSHEFH")

  }

}



selectCategory(cat){
   const {name, value} = cat.target;
   this.setState({[name]: value});
   this.setState({checked: name})
   this.state.checked = name;
   console.log(this.state.checked)
   
}

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (


      <div className={classes.allEvents}>
        {/* <div onClick={() => this.showEventCategories}>
                Click
            
                {this.state.eventcategories.map(cat =>(
                <div key={cat.Id}>
                <input type="radio" value={cat.Id} name={cat.Id} checked={this.state.checked == cat.Id} onChange={(cat) =>this.selectCategory(cat)}/>
                <label htmlFor={cat}>{cat.Name}</label>
                </div>
                ))}
            
            </div> */}
            
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
                  <button className={classes.purchaseButton} onClick={() => this.addToCart(ev)}>Add to Cart</button>
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
      </div>

    );
  }
};
export default FeaturedEvents;




