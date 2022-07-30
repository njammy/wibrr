import React, {Component} from 'react';
import './Wibrrbloc.css'
import axios from 'axios'

class Wibrrbloc extends Component {

    constructor() {
        super()
        this.state = {
            query : "",
            dataIziway : [],
            dataGlo: []
        }
    }

    requestSearch = () => {
        console.log(('el'))
        axios.post(`http://localhost:3000/izi`, { "findterm" : this.state.query }).then(res => {
            this.setState({dataIziway: res.data})
        })
        axios.post(`http://localhost:3000/glo`, { "findterm" : this.state.query }).then(res => {
            this.setState({dataGlo: res.data})
        })
    }

    render () {
        return (
            <div className="wibrr-space">
                <div className='form-input'>
                    <input placeholder="Enter Product Name" onChange={event => this.setState({query : event.target.value}) }/>
                    <button onClick={ this.requestSearch }>chercher</button>
                </div>
                <div  className='results'>
                    <div className='article-result'>
                        {
                            this.state.dataIziway.filter(product => {
                            if (this.state.query === '') {
                                return [];
                            } else if (product.name.toLowerCase().includes(this.state.query.toLowerCase())) {
                                return product;
                            }
                            }).map((product, index) => (
                            <div className="box" key={index}>
                                <div> <img src='/1.png' /> </div>
                                <p>
                                    {product.name} <br/>
                                    {product.price} Fcfa  <br/>
                                </p>
                            </div>
                            ))
                        }
                    </div>
                    <div className='article-result'>
                        {
                            this.state.dataGlo.filter(product => {
                            if (this.state.query === '') {
                                return [];
                            } else if (product.name.toLowerCase().includes(this.state.query.toLowerCase())) {
                                return product;
                            }
                            }).map((product, index) => (
                            <div className="box" key={index}>
                                <div> <img src='/2.png' /> </div>
                                <p> {product.name} </p>
                                <div> {product.price} Fcfa </div>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Wibrrbloc;