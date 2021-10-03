import React, { FC } from "react";
import "./App.css";
import HotelInfo from "./components/HotelInfo";
import AppContextProvider, { useAppContext } from "./state/Context";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const currencies = ["USD", "SGD", "CNY", "KRW"];
  return (
    <ErrorBoundary>
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
                <option value={c} key={c}>{c}</option>
              ))}
            </select>
          </div>
          <HotelsList />
        </div>
      </AppContextProvider>
    </ErrorBoundary>
  );
}

const HotelsList: FC = () => {
  const { state } = useAppContext();
  return (
    <>
      {!state.loading.hotel &&
        state.hotels.map((h, idx) => (
          <HotelInfo
            onBook={function (): void {
              throw new Error("missing feature");
            }}
            currency={""}
            {...h}
            price={212}
            key={idx}
          />
        ))}
    </>
  );
};

export default App;
