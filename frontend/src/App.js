import './App.css';
import { useState } from 'react'
import Data from "./mock-data.json"

function App() {
  const [query, setQuery] = useState("")
  return (
    <div className="App">
      <div className="wibrr-space">
        <input placeholder="Enter Product Name" onChange={event => setQuery(event.target.value)}/>
        <div className='results'>
          <div className='article-result'>
            {
              Data.filter(product => {
                if (query === '') {
                  return [];
                } else if (product.name.toLowerCase().includes(query.toLowerCase())) {
                  return product;
                }
              }).map((product, index) => (
                <div className="box box-best" key={index}>
                  <p>
                    Name: {product.name} <br/>
                    Price: {product.price}  <br/>
                    OldPrice: {product.oldprice}
                  </p>
                </div>
              ))
            }
          </div>
          <div className='article-result article-just-right'>
            {
              Data.filter(product => {
                if (query === '') {
                  return [];
                } else if (product.name.toLowerCase().includes(query.toLowerCase())) {
                  return product;
                }
              }).map((product, index) => (
                <div className="box" key={index}>
                  <p>
                    Name: {product.name} <br/>
                    Price: {product.price}  <br/>
                    OldPrice: {product.oldprice}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
