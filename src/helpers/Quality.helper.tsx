import { IPowerQuality } from '../interfaces/power.interface';

export interface IState {
  touchOnly: boolean;
  selfOnly: boolean;
  mass: boolean;
  range: boolean;
  speed: boolean;
  touch: boolean;
  self: boolean;
}

class QualityHelper{
  static calculateCost = (info: IPowerQuality): number => {
    const powerQualityBaseCost = (info.emulatedPower ? 0 : 2) + Math.max(0, info.cost * (info.multiplier-1));
    const modifierSumCost = info.modifiers ? info.modifiers.reduce((prev, cur) => prev + cur.cost * cur.multiplier, 0) : 0;
    return Math.max((info.emulatedPower ? 0 : 1), powerQualityBaseCost + modifierSumCost);
  }
  
  static getState = (info: IPowerQuality) => {
    const state: IState = {
      touchOnly: false,
      selfOnly: false,
      mass: false,
      range: false,
      speed: false,
      touch: false,
      self: false
    };
  
    const type = info.capacity.toLowerCase();
    if (type === 'mass')
      state.mass = true;
    else if (type === 'range')
      state.range = true;
    else if (type === 'speed')
      state.speed = true;
    else if (type === 'touch')
      state.touch = true;
    else if (type === 'self')
      state.self = true;
  
    for (const modifier of info.modifiers) {
      switch (modifier.name.toLowerCase()) {
        case 'touch only': state.touchOnly = true; break;
        case 'self only': state.selfOnly = true; break;
        case 'power capacity':
          const type = modifier.specific?.toLowerCase();
          if (type === 'mass')
            state.mass = true;
          else if (type === 'range')
            state.range = true;
          else if (type === 'speed')
            state.speed = true;
          else if (type === 'touch')
            state.touch = true;
          break;
      }
    }
    return state;
  }
  
  static getCapacities = (info: IPowerQuality): string[] => {
    const state = QualityHelper.getState(info);
  
    if(state.selfOnly) return ['Self'];
    if(state.touchOnly) return ['Touch'];
  
    const capacities = [];
    if(state.mass) capacities.push('Mass');
    if(state.range) capacities.push('Range');
    if(state.speed) capacities.push('Speed');
    if(state.touch) capacities.push('Touch');
    if(state.self) capacities.push('Self');
  
    return capacities;
  }
}

export default QualityHelper;