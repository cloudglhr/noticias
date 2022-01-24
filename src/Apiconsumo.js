import React, {useEffect} from "react";

function Apiconsumo(props){
    const url='https://newsapi.org/v2/everything?q=apple&from=2022-01-22&to=2022-01-22&sortBy=popularity&apiKey=8db5de8ca57a48cea9549a60a803a832';
    const fetchApi = async => {
      const response = fetch(url)
      console.log(response.statusText)
    }

    useEffect(() =>{
      fetchApi()
    }, [])
    return(
        <input type="text" />
    );
}

export default Apiconsumo;