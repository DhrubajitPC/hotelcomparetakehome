import React, { FC } from "react";
import { useAPI, useAppContext } from "../../state/Context";
import { Currency } from "../../state/types";

const CurrencySelect: FC = () => {
  const api = useAPI();
  const {
    state: { selectedCurrency },
  } = useAppContext();
  const currencies: Currency[] = ["SGD", "USD", "CNY", "KRW"];

  return (
    <div>
      Currency:{" "}
      <select
        name="currency"
        defaultValue={selectedCurrency}
        onChange={(e) => {
          api.fetchPrices(e.target.value as Currency);
        }}
      >
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
