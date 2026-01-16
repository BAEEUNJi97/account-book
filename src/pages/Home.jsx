import "./Home.css";
import { useContext } from "react";
import { TransactionStateContext } from "../App";
import TransactionItem from "../components/TransactionItem";
import { useNavigate } from "react-router";

export default function Home() {
  const transactions = useContext(TransactionStateContext);
  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const navigate = useNavigate();

  return (
    <div className="Home">
      <header>
        <h1>한입 가계부</h1>
        <div
          className="new_button"
          onClick={() => navigate("/new-transaction")}
        >
          + 작성하기
        </div>
      </header>
      <main className="transaction_list">
        {sortedTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </main>
    </div>
  );
}