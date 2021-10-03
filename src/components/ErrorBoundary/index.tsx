import React, { Component } from "react";
import styles from "./styles.module.css";

class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const ErrorComponent = () => (
  <div className={styles.container}>
    <img src="images/sadcat.jpg" alt="sad cat" />
    <h1>Oops... Something went wrong.</h1>
    <button
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }}
      className={styles.magicFix}
    >
      Magic Fix
    </button>
  </div>
);
