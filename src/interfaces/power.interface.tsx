export interface IPowerItem{
  ref: number;
  name?: string;
  multiplier: number;
  cost: number;
  specific?: string;
}


export interface IPowerQuality extends IPowerItem{
  modifiers?: IPowerItem[];
}