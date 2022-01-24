/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import './Item.css';

class Item extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="item">
                <div className="image"><img src={this.props.image} width='100%' /></div>
                <div className="title">{this.props.title}</div>
                <br/>
                <div className="subtitle">{'Autor: ' + this.props.author}</div>
                
                <div className="actions">
                    <a href={this.props.url}><button>Ver mas</button></a>
                </div>
    
            </div> 
        );
    }
}


export default Item;