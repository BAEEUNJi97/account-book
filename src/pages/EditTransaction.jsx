import { useContext } from "react";
import TransactionEditor from "../components/TransactionEditor";
import "./EditTransaction.css";
import { TransactionStateContext } from "../App";
import { useParams } from "react-router-dom";

export default function EditTransaction() {
  const params = useParams();
  const { id } = params;

  const transtactions = useContext(TransactionStateContext);
  const currentTransaction = transtactions.find(
    (transaction) => transaction.id === Number(id)
  );

  return (
    <div className="EditTransaction">
      <header>
        <h1>기록 수정하기</h1>
      </header>
      <TransactionEditor type={"EDIT"} initData={currentTransaction} />
    </div>
  );
}