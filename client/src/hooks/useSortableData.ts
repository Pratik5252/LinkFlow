// hooks/useSortableData.ts
import { useState, useMemo } from "react";

interface SortConfig {
  key: string;
  direction: "ascending" | "descending";
}

export function useSortableData<T>(
  items: T[],
  initialConfig: SortConfig | null = null
) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(
    initialConfig
  );

  const sortedItems = useMemo(() => {
    if (!sortConfig) {
      return items;
    }

    return [...items].sort((a, b) => {
      const getValue = (item: any, key: string) => {
        return key.split(".").reduce((obj: any, k: string) => obj?.[k], item);
      };

      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      if (aValue === null || bValue === null) return 0;

      let comparison = 0;
      if (typeof aValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (aValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = aValue - bValue;
      }

      return sortConfig.direction === "ascending" ? comparison : -comparison;
    });
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "ascending") {
        setSortConfig({ key, direction: "descending" });
      } else {
        setSortConfig(null); // Reset to original order
      }
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
  };

  const getSortIndicator = (
    key: string
  ): "ascending" | "descending" | "unsorted" => {
    if (!sortConfig || sortConfig.key !== key) {
      return "unsorted";
    }
    return sortConfig.direction;
  };

  return {
    items: sortedItems,
    requestSort,
    getSortIndicator,
    sortConfig,
  };
}
