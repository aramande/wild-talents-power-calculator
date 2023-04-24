export interface IPowerItem{
  ref: number;
  name: string;
  multiplier: number;
  cost: number;
}


export interface IPowerQuality extends IPowerItem{
  modifiers: IPowerModifier[];
  capacity: TCapacity;
  capacities: TCapacity[];
  emulatedPower: boolean;
}

export interface IPowerModifier extends IPowerItem{
  costOptions?: string;
  specific?: string;
  focus?: boolean;
}

export type TCapacity = 'Mass' | 'Range' | 'Speed' | 'Touch' | 'Self' | 'N/A';