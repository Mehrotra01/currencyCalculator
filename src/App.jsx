import React, { useState } from "react";
import { InputBox } from "./component";
import useCurr from "./Hooks/useCurr";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setconvertedAmount] = useState(0);

  const currInfo = useCurr(from);
  const options = Object.keys(currInfo);
  // console.log(options)

  const swap = () => {
    setFrom(to);
    setTo(from);
    setconvertedAmount(amount);
    setAmount(convertedAmount);
  };
  const convert = () => {
    setconvertedAmount(amount * currInfo[to]);
  };
  const clear =()=>{
    setAmount(0);
    setconvertedAmount(0);
  }

  const BackgroundImage = "./bg.jpg";

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundColor: `#26AFB7`,
        backgroundImage: `url('${BackgroundImage}')`,
        backgroundPosition: `center`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOpt={options}
                onCurrChange={(cuy) => {
                  setAmount(amount);
                  setFrom(cuy);
                }}
                onAmountChange={(x) => setAmount(x)}
                selectCurr={from}
                cName=""
              />
            </div>
            <div className="relative w-full h-0.5 border-red-500">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                ⥯
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOpt={options}
                onCurrChange={(currency) => setTo(currency)}
                selectCurr={to}
                amountDisable
                cName=""
              />
            </div>
            <div className="mx-5">
              <button
                type="submit"
                className="w-60 mx-5 bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>

              <button
                type="submit"
                className="w-20  bg-blue-600 text-white px-2 py-3 rounded-lg"
             onClick={clear} >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
