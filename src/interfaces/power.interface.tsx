export interface IPowerItem{
  ref: number;
  name?: string;
  multiplier: number;
  cost: number;
  costOptions?: string;
  specific?: string;
}


export interface IPowerQuality extends IPowerItem{
  modifiers: IPowerItem[];
  capacities: TCapacity[];
  emulatedPower: boolean;
}

export type TCapacity = 'Mass' | 'Range' | 'Speed' | 'Touch' | 'Self' | 'N/A';