export interface IPowerItem {
  ref: string;
  name: string;
  specific: string;
  multiplier: number;
  cost: number;
}

export interface IPowerQuality extends IPowerItem {
  modifiers: IPowerModifier[];
  capacity: TCapacity;
  emulatedPower?: boolean; //Deprecated
  type: TType;
}

export interface IPowerModifier extends IPowerItem {
  focus?: boolean;
}

export type TCapacity = 'Mass' | 'Range' | 'Speed' | 'Touch' | 'Self' | 'N/A';
export type TType = 'normal' | 'emulated' | 'hyperstat' | 'hyperskill';
