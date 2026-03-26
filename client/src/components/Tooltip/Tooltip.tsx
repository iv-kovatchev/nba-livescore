import "./Tooltip.scss";
import useTooltip from "./useTooltip";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  maxWidth?: number;
}

const Tooltip = ({ text, children, maxWidth }: TooltipProps) => {
  const { visible, handleOnMouseEnter, handleOnMouseLeave, pos, ref } =
    useTooltip();

  return (
    <div
      ref={ref}
      className="tooltip"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {children}
      {visible &&
        createPortal(
          <div
            className="tooltip__box"
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y,
              transform: "translateX(-50%)  translateY(calc(-100% - 8px))",
              maxWidth: maxWidth ? `${maxWidth}px` : undefined,
              whiteSpace: maxWidth ? "normal" : "nowrap",
            }}
          >
            {text}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
