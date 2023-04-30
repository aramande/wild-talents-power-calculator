export interface IPowerItem{
  ref: string;
  name: string;
  specific?: string;
  multiplier: number;
  cost: number;
}


export interface IPowerQuality extends IPowerItem{
  modifiers: IPowerModifier[];
  capacity: TCapacity;
  emulatedPower: boolean;
}

export interface IPowerModifier extends IPowerItem{
  costOptions?: string;
  focus?: boolean;
}

export type TCapacity = 'Mass' | 'Range' | 'Speed' | 'Touch' | 'Self' | 'N/A';