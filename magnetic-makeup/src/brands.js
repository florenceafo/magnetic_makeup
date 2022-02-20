import React from 'react';

//import axios from 'axios';

export default class BrandList extends React.Component {
    state = {
        brands: [],
        items: []

    }

    componentDidMount() {
        this.getAllBrands();
        this.getAllItems();
    }

    getAllBrands() {
        fetch('http://localhost:4000/api/brands')
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.setState({ brands: data })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    getAllItems() {
        fetch('http://localhost:4000/api/items/brands')
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.setState({ items: data })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                    {this.state.brands.map(brand => <li key={brand._id}>{brand.name}</li>)}
                </ul>
                <ul>
                    {this.state.items.map(item => <li key={item._id}>{item.type} {item.shape} </li>)}
                </ul>
            </React.Fragment>
        )
    }
}
