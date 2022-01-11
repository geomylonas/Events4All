import { Component } from "react";
import axios from "axios";



export default class EventFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventcategories: [],
            checked: 0
        }
    }

    getEventCategories() {
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
    }

    unSelectCategory(){
        this.state.checked = 0;
        this.props.eventcategory(this.state.checked)
    }


    selectCategory(cat) {
        const { name, value } = cat.target;
        this.setState({ [name]: value });
        this.state.checked = name;
        this.props.eventcategory(name)
    }

    render() {

        return (
            <div>
                <input type="radio" value="none" id="none" checked={this.state.checked == 0} onChange={() => this.unSelectCategory()}/>
                <label htmlFor="none">All Events</label>
                {this.state.eventcategories.map(cat => (
                    <div key={cat.Id}>
                        <input type="radio" value={cat.Id} name={cat.Id} id={cat.Id} checked={this.state.checked == cat.Id} onChange={(cat) => this.selectCategory(cat)} />
                        <label htmlFor={cat.Id}>{cat.Name}</label>
                    </div>

                ))}
                


            </div>
        )
    }
}