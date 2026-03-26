import { useRef, useState } from "react";

const useTooltip = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  const handleOnMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
    setVisible(true);
  };

  const handleOnMouseLeave = () => setVisible(false);

  return {
    visible,
    handleOnMouseEnter,
    handleOnMouseLeave,
    pos,
    ref,
  };
};

export default useTooltip;
