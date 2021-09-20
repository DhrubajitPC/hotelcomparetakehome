import React, { FC } from "react";
import "./App.css";
import HotelInfo from "./components/HotelInfo";
import AppContextProvider, { useAppContext } from "./state/Context";

function App() {
  const currencies = ["USD", "SGD", "CNY", "KRW"];
  return (
    <AppContextProvider>
      <div
        style={{
          margin: "0 15px",
        }}
      >
        <div>
          Currency:{" "}
          <select name="currency">
            {currencies.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </div>
        <HotelsList />
      </div>
    </AppContextProvider>
  );
}

const HotelsList: FC = () => {
  const { state } = useAppContext();
  return (
    <div>
      {!state.loading.hotel &&
        state.hotels.map((h, i) => (
          <HotelInfo
            onBook={function (): void {
              throw new Error("missing feature");
            }}
            currency={""}
            key={i}
            {...h}
            price={212}
          />
        ))}
    </div>
  );
};

export default App;
