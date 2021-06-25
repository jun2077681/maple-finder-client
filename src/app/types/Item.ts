export interface Item {
  ownerName: string;
  name: string;
  quantity?: number;
}

export type InventoryType = "equip" | "use" | "setup" | "etc" | "cash"

export enum InventoryTypeEnum {
  equip = "장비",
  use = "소비",
  setup = "설치",
  etc = "기타",
  cash = "캐시"
}

export type Inventory = {
  [kinds in "equip" | "use" | "setup" | "etc" | "cash"]: Item[]
}
