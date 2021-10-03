import React, { FC, ReactElement, useState } from "react";

type Props = {
  body: ReactElement;
};

const Tooltip: FC<Props> = ({ body, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      data-testid="tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: "relative",
      }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: 0,
            background: "#dfe6e9",
            borderRadius: "5px",
          }}
        >
          {body}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
