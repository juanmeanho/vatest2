import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';


import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTv, faDoorClosed } 
from '@fortawesome/free-solid-svg-icons';

library.add(faTv, faDoorClosed );


export default class Home extends Component {
    constructor(props) {

        super(props);
        this.state = {
          menores : [],
          percentaje: null,
          consultores: [],
        };
        
        this.showData = this.showData.bind(this);
        this.getData = this.getData.bind(this);
    }


    showData (input){
        console.log(input)

        this.getData(input).then(res => {
            this.setState({consultores : res })
        })
    }

    async getData(input) {
        var consultores = null
         let res = await axios
              .get('https://reqres.in/api/users?page='+input)
              .then(response => {

                consultores = response.data.data
                //console.log(consultores)
                
              })
              .catch(error => {
                console.log(error)
                this.errored = true
              })

              return consultores

    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className="container">
                    <div className="card mt-2">
                    <div>
                        <input
                            className=" ml-3 mt-2"
                            type="text" value={this.state.name}
                            id={'todoName' + this.props.id}
                            onChange={e => this.showData(e.target.value)}
                        />
                    </div>                        
                    <div className="container mt-2 mb-2">
                            <div className="row">
                                <div className="col-sm-6 mr-0" >
                                    <div style={{height:'400px'}} className="card " >
                                        <nav className="navbar navbar-dark bg-primary navbar-expand-md">
                                            <span className="navbar-brand mb-0 h1">Total ({ this.state.consultores.length })</span>
                                        </nav>
                                        <ul className="list-group" style={{overflowY:'auto'}} >
                                            { this.state.consultores.map((consultor, index) => 
                                              
                                                <li href="#" key={index} className="list-group-item list-group-item-action">
                                                  <img height="60px" width="60px" src={consultor.avatar} alt=""></img>
                                                  {" "}
                                                  { consultor.first_name }{" "}
                                                    { consultor.last_name } 

                                                </li>
                                            )
                                            }
                                        </ul>
                                    </div>
                                </div>             
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
