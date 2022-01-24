import React from "react";
import Item from "./Item";

function List(props){
    return(
        <div className="list">
            {
                props.items.map(item => 
                      <Item 
                            key={item.url + item.author}
                            id={item.url + item.author}
                            title={item.title}
                            image={item.urlToImage}
                            author={item.author}
                            url={item.url} />
                )
            }
        </div>
    );
}

export default List;