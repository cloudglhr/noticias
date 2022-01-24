/* eslint-disable react/no-direct-mutation-state */
import './App.css';
import Menu from './Menu';
import List from './List';
import React from 'react';
import Pagination from './Pagination';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      books:[
        {id:0, rating: 4, title: 'Harry Potter y el cáliz de fuego', image:'libro01.jpg'},
        {id:1, rating: 3, title: 'The shining', image:'libro02.jpg'},
        {id:2, rating: 5, title: 'Codigo Da Vinci', image:'libro03.jpg'},
        {id:3, rating: 5, title: 'El principito', image:'libro04.jpg'},
        {id:4, rating: 5, title: 'Sobrenatural', image:'libro05.jpg'}
      ],
      noticia :[],
      totalResults:0,
      pagina:"1",
      totalpaginas:30,
      copynoticia: [],
      opciones: [
            {"id": 0, "descripcion": "", "cat": "q=apple"}
          , {"id": 1, "descripcion": "Colombia", "cat": "q=colombia"}
          , {"id": 2, "descripcion": "Ecuador", "cat": "q=ecuador"}
          , {"id": 3, "descripcion": "Peru", "cat": "q=peru"}
          , {"id": 4, "descripcion": "Bitcoin", "cat": "q=bitcoin"}
          , {"id": 5, "descripcion": "Autos", "cat": "q=autos"}
          , {"id": 6, "descripcion": "Motos", "cat": "q=motos"}
      ],
      dropdown:null,
      original:"q=apple",
    };
    this.setState({copynoticia: [...this.state.noticia]});
  }

  HandleoptionChange = (name, value) =>{
    this.setState({[name]:value});
    this.state.original= value;
    this.setState({original: value});
    this.componentDidMount();
  }
  
  componentDidMount() {
    const url="https://newsapi.org/v2/everything?"+this.state.original+"&language=es&from=2022-01-22&to=2022-01-22&sortBy=popularity&apiKey=b161bd4ea1444cdea5b0632ac7c48b3a";
    console.log("url actual: "+url);
    fetch(url,{method: 'GET'})
    .then(result=>result.json())
    .then(data => {
      this.state.totalResults=data.totalResults;
      let totalpaginas = Math.ceil(data.totalResults / 20);
      this.state.totalpaginas=data.totalpaginas;
      this.setState({
        noticia:data.articles,
        copynoticia:data.articles,
        totalpaginas:totalpaginas
        
      })
    })
  }

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    this.state.pagina = currentPage;
    const url="https://newsapi.org/v2/everything?"+this.state.original+"&page="+currentPage+"&language=es&from=2022-01-22&to=2022-01-22&sortBy=popularity&apiKey=b161bd4ea1444cdea5b0632ac7c48b3a";
    fetch(url,{method: 'GET'})
    .then(result=>result.json())
    .then(data => {
    console.log(data);
    this.setState({
        noticia:data.articles,
        copynoticia:data.articles
    })
    })
  }

  

  onSearch = (query) =>{
    if(query === ''){
      this.setState({copynoticia: [...this.state.noticia]})
    }else{
      const temp = [...this.state.noticia];
      let res = [];

      temp.forEach(item =>{
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
      this.setState({copynoticia: [...res]});
    }
  }
  
      

  render() {
    const { totalResults,  pagina, totalpaginas } = this.state;
    
    if (totalResults === 0) return null;
    const headerClass = ['text-dark py-2 pr-4 m-0', this.state.pagina ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className='app'>
        <Menu title="Noticias" onsearch={this.onSearch} opciones={this.state.opciones} handleoptionChange={this.HandleoptionChange} />
        <div className="container2 mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalResults}</strong> Noticias
              </h2>
              { pagina && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ pagina }</span> / <span className="font-weight-bold">{ totalpaginas }</span>
                </span>
              ) }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalResults} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
        </div>
      </div>
        <List items={this.state.copynoticia} />
      </div>
    );
  }
}


export default App;
