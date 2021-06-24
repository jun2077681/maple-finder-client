export interface Item {
  name: string;
  quantity?: number;
}

export type InventoryType = "장비" | "소비" | "설치" | "기타" | "캐시"

export type Inventory = Map<InventoryType, Item[]>;

export type InventoryJSON = {
  [kinds in "equip" | "use" | "set-up" | "etc" | "cash"]: Item[]
}
