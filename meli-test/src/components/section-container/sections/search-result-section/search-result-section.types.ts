import { ItemSummary } from "@/models/models";

export interface SearchResultItemsProps {
  item: ItemSummary;
}

export interface SearchResultSectionProps {
  setCategories: (categories: string[]) => void;
}
