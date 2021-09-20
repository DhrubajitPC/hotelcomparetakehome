import React, { FC, useState } from "react";

type Props = {
  body: HTMLElement;
};

const Tooltip: FC<Props> = ({ body, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
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
            top: 0,
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
