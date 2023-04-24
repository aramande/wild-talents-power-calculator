import { useReducer } from 'react';
import { IPowerModifier, IPowerQuality, TCapacity } from '../interfaces/power.interface';
import { Action } from '../helpers/Reducer';

export enum PowerQualityActionKind {
  SET_REF = 'set-ref',
  SET_NAME = 'set-name',
  SET_CAPACITY = 'set-capacity',
  SET_MAIN_CAPACITY = 'set-main-capacity',
  ADD_CAPACITY = 'add-capacity',
  SET_EMULATED = 'set-emulated',
  INC_MULTIPLIER = 'increment-multiplier',
  DEC_MULTIPLIER = 'decrement-multiplier',
  ADD_MODIFIER = 'add-modifier',
  DEL_MODIFIER = 'del-modifier'
}


type SetRefAction = Action<typeof PowerQualityActionKind.SET_REF, number>;
function reduceSetRefAction(state: IPowerQuality, action: SetRefAction): IPowerQuality {
  if (!action.payload) return state;
  return {...state, ref: action.payload};
}
type SetQualityAction = Action<typeof PowerQualityActionKind.SET_NAME, string>;
function reduceSetQualityAction(state: IPowerQuality, action: SetQualityAction): IPowerQuality {
  if (!action.payload) return state;
  return {...state, name: action.payload};
}
type SetCapacityAction = Action<typeof PowerQualityActionKind.SET_CAPACITY, TCapacity>;
function reduceSetCapacityAction(state: IPowerQuality, action: SetCapacityAction): IPowerQuality {
  if (!action.payload) return state;
  return {...state, capacities: [action.payload]};
}
type SetMainCapacityAction = Action<typeof PowerQualityActionKind.SET_MAIN_CAPACITY, TCapacity>;
function reduceSetMainCapacityAction(state: IPowerQuality, action: SetMainCapacityAction): IPowerQuality {
  if (!action.payload) return state;
  return {...state, capacity: action.payload};
}
type AddCapacityAction = Action<typeof PowerQualityActionKind.ADD_CAPACITY, TCapacity>;
function reduceAddCapacityAction(state: IPowerQuality, action: AddCapacityAction): IPowerQuality {
  if (!action.payload) return state;
  return {...state, capacities: [...state.capacities, action.payload]};
}
type SetEmulatedAction = Action<typeof PowerQualityActionKind.SET_EMULATED, boolean>;
function reduceSetEmulatedAction(state: IPowerQuality, action: SetEmulatedAction): IPowerQuality {
  if (action.payload === undefined) return state;
  return {...state, emulatedPower: action.payload};
}
type IncrementMultiplierAction = Action<typeof PowerQualityActionKind.INC_MULTIPLIER, void>;
function reduceIncrementMultiplierAction(state: IPowerQuality, action: IncrementMultiplierAction): IPowerQuality {
  return {...state, multiplier: state.multiplier + 1};
}
type DecrementMultiplierAction = Action<typeof PowerQualityActionKind.DEC_MULTIPLIER, void>;
function reduceDecrementMultiplierAction(state: IPowerQuality, action: DecrementMultiplierAction): IPowerQuality {
  return {...state, multiplier: Math.max(1, state.multiplier - 1)};
}
type AddModifierAction = Action<typeof PowerQualityActionKind.ADD_MODIFIER, IPowerModifier>;
function reduceAddModifierAction(state: IPowerQuality, action: AddModifierAction): IPowerQuality {
  if (!action.payload) return state;
  return {...state, modifiers: [...state.modifiers, action.payload]};
}
type DelModifierAction = Action<typeof PowerQualityActionKind.DEL_MODIFIER, number>;
function reduceDelModifierAction(state: IPowerQuality, action: DelModifierAction): IPowerQuality {
  if (action.payload === undefined) return state;
  return {...state, modifiers: state.modifiers?.filter(x => x.ref !== action.payload)};
}

export type PowerQualityActions = 
  | SetRefAction 
  | SetQualityAction 
  | SetCapacityAction 
  | SetMainCapacityAction 
  | AddCapacityAction 
  | SetEmulatedAction 
  | IncrementMultiplierAction 
  | DecrementMultiplierAction 
  | SetCapacityAction
  | AddModifierAction
  | DelModifierAction;

function powerQualityReducer(state: IPowerQuality, action: PowerQualityActions): IPowerQuality {
  switch (action.type) {
    case PowerQualityActionKind.SET_NAME:
      return reduceSetQualityAction(state, action);
    case PowerQualityActionKind.SET_REF:
      return reduceSetRefAction(state, action);
    case PowerQualityActionKind.SET_CAPACITY:
      return reduceSetCapacityAction(state, action);
    case PowerQualityActionKind.SET_MAIN_CAPACITY:
      return reduceSetMainCapacityAction(state, action);
    case PowerQualityActionKind.ADD_CAPACITY:
      return reduceAddCapacityAction(state, action);
    case PowerQualityActionKind.SET_EMULATED:
      return reduceSetEmulatedAction(state, action);
    case PowerQualityActionKind.INC_MULTIPLIER:
      return reduceIncrementMultiplierAction(state, action);
    case PowerQualityActionKind.DEC_MULTIPLIER:
      return reduceDecrementMultiplierAction(state, action);
    case PowerQualityActionKind.ADD_MODIFIER:
      return reduceAddModifierAction(state, action);
    case PowerQualityActionKind.DEL_MODIFIER:
      return reduceDelModifierAction(state, action);
      
    default:
      return state;
  }
}
export function usePowerQuality(initialData?: IPowerQuality): [IPowerQuality, React.Dispatch<PowerQualityActions>] {
  const result: IPowerQuality = {
    ref: 0,
    multiplier: 1,
    cost: 1,
    emulatedPower: false,
    name: 'Attack',
    capacity: 'Mass',
    capacities: [],
    modifiers: []
  };
  const [characters, dispatch] = useReducer(powerQualityReducer, initialData ?? result);

  return [characters, dispatch];
}