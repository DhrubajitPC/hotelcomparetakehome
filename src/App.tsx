import React from "react";
import "./App.css";
import CurrencySelect from "./components/CurrencySelect";
import ErrorBoundary from "./components/ErrorBoundary";
import HotelsList from "./components/HotelsList";
import AppContextProvider from "./state/Context";

function App() {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <CurrencySelect />
        <HotelsList />
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
