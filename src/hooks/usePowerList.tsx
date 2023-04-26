import React, { useEffect, useReducer } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { guid } from '../helpers/GUID';
import { Action } from '../helpers/Reducer';
import { IPowerQuality } from '../interfaces/power.interface';

export interface IPowerRegistry{
  [key: string]: IPowerQuality[]
}
export enum PowerListActionKind {
  UPDATE_POWER = 'update-power',
  DEL_POWER = 'del-power',
}
type AddPowerAction = Action<typeof PowerListActionKind.UPDATE_POWER, {name: string, qualities: IPowerQuality[]}>;
function reduceAddCharAction(state: IPowerRegistry, action: AddPowerAction): IPowerRegistry {
  if (!action.payload) return state;
  const newState: IPowerRegistry = {...state};
  newState[action.payload.name] = action.payload.qualities;
  return newState;
}
type DelPowerAction = Action<typeof PowerListActionKind.DEL_POWER, string>;
function reduceDelCharAction(state: IPowerRegistry, action: DelPowerAction): IPowerRegistry {
  if (!action.payload) return state;
  //delete state[action.payload];
  const newState: IPowerRegistry = {};
  for (const [name, qualities] of Object.entries(state)) {
    if(name !== action.payload){
      newState[name] = qualities;
    }
  }
  return newState;
}

export type PowerListActions = AddPowerAction | DelPowerAction;

function powerListReducer(state: IPowerRegistry, action: PowerListActions): IPowerRegistry {
  switch (action.type) {
    case PowerListActionKind.UPDATE_POWER:
      return reduceAddCharAction(state, action);
    case PowerListActionKind.DEL_POWER:
      return reduceDelCharAction(state, action);
    default:
      return state;
  }
}

export function usePowerList(): [IPowerRegistry, React.Dispatch<PowerListActions>] {
  const [powerListStorage, setPowerListStorage] = useLocalStorage<IPowerRegistry>('powerlist', {});
  const [powers, dispatch] = useReducer(powerListReducer, powerListStorage);

  useEffect(() => {
    setPowerListStorage((c) => powers);
  }, [powers, setPowerListStorage]);

  return [powers, dispatch];
}
