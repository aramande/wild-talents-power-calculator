export interface IPowerItemInfo{
  ref: number;
  name?: string;
  level: number;
  cost?: number;
  dynamicCost?: (level: number) => number;
  content?: JSX.Element;
  specific?: string;
}


export interface IPowerQualityInfo extends IPowerItemInfo{
  modifiers?: IPowerItemInfo[];
}