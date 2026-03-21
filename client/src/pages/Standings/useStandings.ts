import { useState } from "react";
import type { SortDir, SortKey } from "./Standings.types";

const useStandings = () => {
  const [activeTab, setActiveTab] = useState<"east" | "west">("east");

  const switchToEast = () => setActiveTab("east");
  const switchToWest = () => setActiveTab("west");

  const [sortKey, setSortKey] = useState<SortKey>("wins");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return {
    activeTab,
    switchToEast,
    switchToWest,
    sortKey,
    sortDir,
    handleSort,
  };
};

export default useStandings;
