import React, { useEffect, useReducer, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Action } from '../helpers/Reducer';
import { IPowerModifier, IPowerQuality } from '../interfaces/power.interface';
import { Tag, TagSuggestion } from 'react-tag-autocomplete';

export interface IPowerRegistry {
  [key: string]: Power;
}
export class Power {
  qualities: IPowerQuality[];
  tags: Tag[];

  constructor(qualities?: IPowerQuality[], tags?: Tag[]) {
    this.qualities = qualities ?? [];
    this.tags = tags ?? [];
  }

  static export(power: Power): string {
    function printQuality(quality: IPowerQuality): string {
      let result = `${quality.ref};${quality.name};${quality.specific ?? ''};${quality.multiplier};${
        quality.capacity
      };${quality.cost};${quality.emulatedPower ? 'emu' : 'no'}`;
      for (const modifier of quality.modifiers) {
        result += `;~${modifier.ref};${modifier.name};${modifier.specific ?? ''};${modifier.multiplier};${
          modifier.cost
        };${modifier.focus ? 'foc' : 'no'}`;
      }
      return result;
    }
    return `1;~~${power.tags.map((x) => x.value).join(';')};~~${power.qualities
      .map((x) => printQuality(x))
      .join(';~~')}`;
  }

  static import(content: string): Power {
    try {
      if (content.startsWith('1;')) {
        const parts = content.split(';~~');
        const tags = parts[1]
          .split(';')
          .filter((x) => x)
          .map((x) => ({ value: x, label: x }));
        const qualities: IPowerQuality[] = [];
        for (let i = 2; i < parts.length; i++) {
          const newQuality = parts[i];
          const sections = newQuality.split(';~');
          const qualityParts = sections[0].split(';');
          const modifiers: IPowerModifier[] = [];
          for (let k = 1; k < sections.length; k++) {
            const modifierParts = sections[k].split(';');
            const modifier: IPowerModifier = {
              ref: modifierParts[0],
              name: modifierParts[1],
              specific: modifierParts[2],
              multiplier: parseInt(modifierParts[3]),
              cost: parseInt(modifierParts[4]),
              focus: modifierParts[5] === 'foc',
            };
            modifiers.push(modifier);
          }
          const quality: IPowerQuality = {
            ref: qualityParts[0],
            name: qualityParts[1],
            specific: qualityParts[2],
            multiplier: parseInt(qualityParts[3]),
            capacity: qualityParts[4] as any,
            cost: parseInt(qualityParts[5]),
            emulatedPower: qualityParts[6] === 'emu',
            modifiers: modifiers,
          };
          qualities.push(quality);
        }
        return new Power(qualities, tags);
      }
    } catch (error) {
      //error handling here?
      console.error(error);
    }
    return new Power();
  }
}
export enum PowerListActionKind {
  UPDATE_POWER_OBJ = 'update-power-obj',
  UPDATE_POWER = 'update-power',
  DEL_POWER = 'del-power',
}
type UpdatePowerObjAction = Action<typeof PowerListActionKind.UPDATE_POWER_OBJ, { name: string; power: Power }>;
function reduceUpdatePowerObjAction(state: IPowerRegistry, action: UpdatePowerObjAction): IPowerRegistry {
  if (!action.payload) return state;
  const newState: IPowerRegistry = { ...state };
  newState[action.payload.name] = action.payload.power;
  return newState;
}
type UpdatePowerAction = Action<
  typeof PowerListActionKind.UPDATE_POWER,
  { name: string; qualities: IPowerQuality[]; tags: Tag[] }
>;
function reduceUpdatePowerAction(state: IPowerRegistry, action: UpdatePowerAction): IPowerRegistry {
  if (!action.payload) return state;
  const newState: IPowerRegistry = { ...state };
  newState[action.payload.name] = new Power(action.payload.qualities, action.payload.tags);
  return newState;
}
type DelPowerAction = Action<typeof PowerListActionKind.DEL_POWER, string>;
function reduceDeletePowerAction(state: IPowerRegistry, action: DelPowerAction): IPowerRegistry {
  if (!action.payload) return state;
  //delete state[action.payload];
  const newState: IPowerRegistry = {};
  for (const [name, qualities] of Object.entries(state)) {
    if (name !== action.payload) {
      newState[name] = qualities;
    }
  }
  return newState;
}

export type PowerListActions = UpdatePowerObjAction | UpdatePowerAction | DelPowerAction;

function powerListReducer(state: IPowerRegistry, action: PowerListActions): IPowerRegistry {
  switch (action.type) {
    case PowerListActionKind.UPDATE_POWER_OBJ:
      return reduceUpdatePowerObjAction(state, action);
    case PowerListActionKind.UPDATE_POWER:
      return reduceUpdatePowerAction(state, action);
    case PowerListActionKind.DEL_POWER:
      return reduceDeletePowerAction(state, action);
    default:
      return state;
  }
}

export function usePowerList(): [IPowerRegistry, React.Dispatch<PowerListActions>, TagSuggestion[]] {
  const [powerListStorage, setPowerListStorage] = useLocalStorage<IPowerRegistry>('powerlist', {});
  const [powers, dispatch] = useReducer(powerListReducer, powerListStorage);
  const [tagSuggestions, setTagSuggestions] = useState<TagSuggestion[]>([]);

  useEffect(() => {
    setPowerListStorage((c) => powers);
  }, [powers, setPowerListStorage]);

  useEffect(() => {
    const newTagSuggestions: TagSuggestion[] = [];
    const savedTags = Object.values(powers ?? {}).map((x) => x.tags ?? []);
    for (const tagGroups of savedTags) {
      for (const tag of tagGroups) {
        if (!newTagSuggestions.find((x) => x.value === tag.value)) {
          newTagSuggestions.push(tag);
        }
      }
    }
    setTagSuggestions(newTagSuggestions);
  }, [powers, setTagSuggestions]);

  return [powers, dispatch, tagSuggestions];
}
