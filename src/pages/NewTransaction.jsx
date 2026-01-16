import TransactionEditor from "../components/TransactionEditor";
import "./NewTransaction.css";

export default function NewTransaction() {
  return (
    <div className="NewTransaction">
      <header>
        <h1>새로운 기록</h1>
      </header>
      <TransactionEditor type={"CREATE"} />
    </div>
  );
}