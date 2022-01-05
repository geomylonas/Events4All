import render from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import { ListGroup, Button } from "react-bootstrap";


class CategoryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        fetch('https://localhost:44359/api/Categories').then(response => response.json()).then(
            result => {
                this.setState({ categories: result });
            }
        )
    }



    render() {

        return (
            <div>
                {this.state.categories.map(cat => (
                    <ListGroup key={cat.Id} className="my-2">
                        <ListGroup.Item>
                            {cat.Name}
                            <span className="listGroupItem">
                            <Button variant="primary">Edit</Button>{' '}
                            <Button variant="primary">Delete</Button>{' '}
                            </span>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </div>

        );
    }
}


export default CategoryComponent;



