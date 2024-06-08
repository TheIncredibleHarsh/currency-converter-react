import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fromCurrency, setFromCurrency] = useState('inr');
  const [toCurrency, setToCurrency] = useState('inr');
  const [currencyData, setCurrencyData] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const fetchConversionRates = () => {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
    fetch(url)
    .then(response => response)
    .then(response =>  response.json())
    .then(body => {
      setCurrencyData(body[fromCurrency]);
      return body[fromCurrency];
    })
    .then((data) => setCurrencyList(Object.keys(data)))
  };

  useEffect(()=>{
    fetchConversionRates();
  }, [fromCurrency]);

  useEffect(()=>{
    currencyData && setToValue(currencyData[toCurrency]*fromValue);
  }, [fromValue, toCurrency, currencyData]);

  const switchCurrencies = () => {
    let to = toCurrency
    setToCurrency(fromCurrency)
    setFromCurrency(to)
  }

  return (
    <>
      <div className="h-screen w-screen bg-[url('/bg.jpg')] bg-cover blur-sm absolute"></div>
      <div className='h-screen w-screen flex justify-center items-center'>
        <div className='bg-slate-400 z-10 rounded-2xl p-5 opacity-80 space-y-2 flex flex-col'>
          <div className='w-96 flex flex-row'>
            <input className='w-full h-16 bg-slate-300 focus:outline-none p-2 text-slate-600 text-xl' type="number" onChange={(e) => {setFromValue(e.target.value)}} defaultValue={fromValue}/>
            <select className='ps-2 bg-slate-400 rounded-lg text-slate-700 font-semibold' name="input-currency" id="input-currency" onChange={(e) => {setFromCurrency(e.target.value)}}>
              {currencyList.map((option, key)=>{
                if(option == fromCurrency){
                  return <option key={key} value={option} selected>{option.toUpperCase()}</option>
                }
                return <option key={key} value={option} >{option.toUpperCase()}</option>
              })}
            </select>
          </div>
          <input className='bg-green-200 p-2 rounded-lg w-20 mx-24 hover:bg-green-100 active:bg-green-400' type="button" value="switch" onClick={()=> switchCurrencies()} />
          <div className='w-96 flex flex-row'>
            <input className='w-full h-16 bg-slate-300 focus:outline-none p-2 text-slate-600 text-xl' type="number" value={toValue.toString()} readOnly/>
            <select className='ps-2 bg-slate-400 rounded-lg text-slate-700 font-semibold' name="output-currency" id="output-currency" onChange={(e) => {setToCurrency(e.target.value)}}>
              {currencyList.map((option, key)=>{
                if(option == toCurrency){
                  return <option key={key} value={option} selected>{option.toUpperCase()}</option>
                }
                return <option key={key} value={option}>{option.toUpperCase()}</option>
              })}
            </select>
          </div>
        </div> 
      </div>
    </>
  )
}

export default App
