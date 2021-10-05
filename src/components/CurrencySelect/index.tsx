import React, { FC } from "react";

const CurrencySelect: FC = () => {
  const currencies = ["USD", "SGD", "CNY", "KRW"];
  return (
    <div>
      Currency:{" "}
      <select name="currency">
        {currencies.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
