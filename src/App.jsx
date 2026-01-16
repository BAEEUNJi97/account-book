import "./App.css";
import { Routes,Route,Link,useNavigate} from "react-router-dom";
import {useReducer, useRef, createContext} from "react";
import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";
import EditTransaction from "./pages/EditTransaction";
import Notfound from "./pages/Notfound";


const mockData = [
  {
    id: 0,
    name: "마라탕 & 꿔바로우",
    amount: 59000,
    type: "expense",
    category: "🍚 식비",
    date: new Date().getTime() + 1,
  },
  {
    id: 1,
    name: "월세",
    amount: 500000,
    type: "expense",
    category: "🏠 생활",
    date: new Date().getTime() + 2,
  },
  {
    id: 2,
    name: "월급",
    amount: 3500000,
    type: "income",
    category: "🏢 급여",
    date: new Date().getTime() + 3,
  },
];

function reducer(state,action){
  switch(action.type){
    case 'INIT': return action.data;
    case 'CREATE': return[...state, action.data]
   case 'UPDATE':
  return state.map((transaction) =>
    String(transaction.id) === String(action.data.id)
      ? action.data
      : transaction
  );

  case 'DELETE':
    return state.filter(
       (transaction) => String(transaction.id) !== String(action.data.id)
    );
    default:
      return state;
  }
}

export const TransactionStateContext  = createContext();
export const TransactionDispatchContext  = createContext();

function App() {

  const [transactions, setTransactions] = useReducer(reducer, mockData);
  const idRef =useRef(4);

  const onCreateTransaction = (name, amount, type, category, date) => {
      setTransactions({
      type:"CREATE",
      data:{
        id: idRef.current++,
        name,
        amount,
        type,
        category,
        date
      },
    });
  };

  const onUpdateTransaction = (id, name, amount, type, category, date) => {
      setTransactions({
      type:"UPDATE",
      data:{
        id,
        name,
        amount,
        type,
        category,
        date
      },
    });
  };

  const onDeleteTransaction = (id) => {
     setTransactions({
      type:"DELETE",
      data:{
      id,
      },
    });
  };

  return (
    <>
    <TransactionStateContext.Provider value={transactions}>
      <TransactionDispatchContext.Provider
        value={{
          onCreateTransaction,
          onUpdateTransaction,
          onDeleteTransaction,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-transaction" element={<NewTransaction />} />
          <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        </Routes>
      </TransactionDispatchContext.Provider>
    </TransactionStateContext.Provider>  
    </>
  );
}

export default App;
