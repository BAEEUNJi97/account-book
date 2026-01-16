import { useContext, useState } from "react";
import { TransactionDispatchContext } from "../App";
import "./TransactionEditor.css";
import { useNavigate } from "react-router-dom"; // ← dom으로!

const categories = ["🍚 식비", "💧 구독", "🏠 생활", "🏢 급여", "💰 금융"];

// type : "CREATE" | "EDIT"
// initData : 수정 모드일 때 넘어오는 기존 데이터
export default function TransactionEditor({ type = "CREATE", initData }) {
  const { onCreateTransaction, onUpdateTransaction } =
    useContext(TransactionDispatchContext);

  const navigate = useNavigate();

  // initData 있으면 그걸로, 없으면 기본값으로 초기화
  const [input, setInput] = useState({
    name: initData?.name ?? "",
    amount: initData ? String(initData.amount) : "",
    type: initData?.type ?? "expense",
    category: initData?.category ?? categories[0],
    date: initData
      ? new Date(initData.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  });

  const onSubmit = () => {
    if (!input.name || !input.amount || !input.category || !input.date || !input.type) {
      return;
    }

    const amountNumber = Number(input.amount);

    // 수정 모드일 때
    if (type === "EDIT" && initData) {
      onUpdateTransaction(
        initData.id,
        input.name,
        amountNumber,
        input.type,
        input.category,
        input.date
      );
    } else {
      // 추가 모드일 때
      onCreateTransaction(
        input.name,
        amountNumber,
        input.type,
        input.category,
        input.date
      );
    }

    navigate("/", { replace: true });
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div className="TransactionEditor">
      <div>
        <div className="description">분류</div>
        <select
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value })}
        >
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
      </div>
      <div>
        <div className="description">지출/수입 이름</div>
        <input
          type="text"
          id="name"
          placeholder="지출 & 수입 이름을 입력하세요 ..."
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
      </div>
      <div>
        <div className="description">지출/수입 금액</div>
        <input
          type="number"
          id="amount"
          placeholder="금액을 입력하세요"
          value={input.amount}
          onChange={(e) => setInput({ ...input, amount: e.target.value })}
        />
      </div>
      <div>
        <div className="description">카테고리</div>
        <select
          value={input.category}
          onChange={(e) => setInput({ ...input, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="description">날짜</div>
        <input
          type="date"
          id="date"
          value={input.date}
          onChange={(e) => setInput({ ...input, date: e.target.value })}
        />
      </div>
      <div className="button_container">
        <button className="submit_button" onClick={onSubmit}>
          {type === "EDIT" ? "수정" : "저장"}
        </button>
        <button className="cancel_button" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
