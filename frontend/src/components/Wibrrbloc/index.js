import React, {Component} from 'react';
import './Wibrrbloc.css'
import axios from 'axios'
import Product from '../Product';

let urlbase_prod = "http://wibrrdemo.eu-4.evennode.com"
let urlbase_dev = "http://localhost:3000"
class Wibrrbloc extends Component {

    constructor() {
        super()
        this.state = {
            query : "",
            dataIziway : [],
            dataGlo: [],
            isLoad: false,
            errMsg: "",
            isEmpty: false
        }
    }

    requestSearch = () => {
        this.setState({isLoad: true})
        this.setState({isEmpty: false})
        axios.post(`http://localhost:3000/glo`, { "findterm" : this.state.query }).then(glores => {
            axios.post(`http://localhost:3000/izi`, { "findterm" : this.state.query }).then(izires => {
                console.log('glo: '+glores.data.length)
                console.log('izi: '+izires.data.length)
                if(glores.data.length == 0 || izires.data.length==0) {
                    this.setState({isEmpty: true})
                    this.setState({isLoad: false})
                }
                if(izires.data.length > glores.data.length){
                    this.setState({dataIziway: izires.data.slice(0,glores.data.length)})
                    this.setState({dataGlo: glores.data})
                } else {
                    this.setState({dataIziway: izires.data})
                    this.setState({dataGlo: glores.data.slice(0,izires.data.length)})
                }
                this.setState({isLoad: false})
            }).catch((e)=>{
                this.setState({isLoad: false})
                this.setState({errMsg: e.message})
            })
        }).catch((e)=>{
            this.setState({isLoad: false})
            this.setState({errMsg: e.message})
        })
    }

    render () {
        return (
            <div className="wibrr-space">
                <div className='form-input'>
                    <input placeholder="Entrer le nom du produit" onChange={event => this.setState({query : event.target.value}) }/>
                    <button onClick={ this.requestSearch }>chercher</button>
                </div>
                <div className='waiting'>
                    Quick search and compare product price on <a href='https://iziway.cm' target="_blank">Iziway</a> and <a href='https://glotelho.cm' target="_blank">Glotelho</a> ecommerce coded by <a href='https://github.com/njammy' target="_blank">@njammy</a>
                </div>
                {
                    this.state.isLoad ?
                    <div className='loader'>
                        <div className="custom-loader"></div>
                    </div>
                    :
                    this.state.errMsg.length > 0 ?
                    <div className='error-alert'> 
                        <div>An error occured, this could have happened for these potentials reasons :</div> <br/>
                        <label># Our api server is down</label> <br/>
                        <label># The terms which your find is write in bad format. eg: "ceinture" mdr..</label> <br/>
                        <label># The terms which your find crash our server :xd</label>
                    </div>
                    :
                    this.state.isEmpty ?
                        <div className='error-alert'> 
                            <div>Oww...sorry, no results were found in either of the two ecommerce</div>
                        </div>
                    :
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
                                    <Product key={index} typeProduct={1} link={product.link} name={product.name} price={product.price} />
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
                                    <Product key={index} typeProduct={2} link={product.link} name={product.name} price={product.price} />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Wibrrbloc;