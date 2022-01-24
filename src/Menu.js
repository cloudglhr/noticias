/* eslint-disable no-useless-constructor */
import React from "react";
import Search from "./Search";
import "./Menu.css";

class Menu extends React.Component{

    constructor(props){
        super(props);
    }

    handleOptionChange  = e => {
        const {name, value} = e.target;
        console.log("original "+name + value);
        this.props.handleoptionChange(name,value);
    }

    render(){
        return(
            <div className="container">
                <div className="subcontainer">
                    <div className="logo">
                        {this.props.title}
                    </div>
                    <div className="search">
                        <Search onsearch={this.props.onsearch}/>
                    </div>
                    <div className="actions">
                    <label id="lbldropdwon" htmlFor="dropdown">Filtro</label>
                    <select id="dropdown" name="dropdown" onChange={this.handleOptionChange}>
                        {this.props.opciones.map(opt => {
                            return <option key={opt.id} value={opt.cat}>{opt.descripcion}</option>
                        })}
                    </select>
                        
                    </div>
                </div>
            </div>
        );
    }
}


export default Menu;