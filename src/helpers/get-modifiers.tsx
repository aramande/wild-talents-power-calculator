import { IPowerItem, IPowerModifier } from '../interfaces/power.interface';

const refCounter: {current: number} = {current: 0};
const extras: IPowerModifier[] = [
  makeModifier('Area', 1, '+1 per Area die'),
  makeModifier('Augment', 4),
  makeModifier('Booster'),
  makeModifier('Burn', 2),
  makeModifier('Controlled Effect'),
  makeModifier('Custom'),
  makeModifier('Daze'),
  makeModifier('Deadly', 1, "+1 or +2"),
  makeModifier('Disintegrate'),
  makeModifier('Duration', 2),
  makeModifier('Eletrocuting'),
  makeModifier('Endless', 3),
  makeModifier('Engulf', 2),
  makeModifier('Go First'),
  makeModifier('Hardened Defense', 2),
  makeModifier('High Capacity'),
  makeModifier('Interference', 3),
  makeModifier('Native Power'),
  makeModifier('No Physics'),
  makeModifier('No Upward Limit', 2),
  makeModifier('Non-Physical', 2),
  makeModifier('On Sight'),
  makeModifier('Penetration'),
  makeModifier('Permanent', 4),
  makeModifier('Radius', 2),
  makeModifier('Power Capacity', 1, '+1 or +2'),
  makeModifier('Speeding Bullet', 2),
  makeModifier('Spray'),
  makeModifier('Subtle'),
  makeModifier('Traumatic'),
  makeModifier('Variable Effect', 4)
]
  
const flaws: IPowerModifier[] = [
  makeModifier('Always On', -1),
  makeModifier('Armored Defense', -2),
  makeModifier('Attached', -1, '-1 or -2'),
  makeModifier('Backfires', -2),
  makeModifier('Base Will Cost', -4),
  makeModifier('Delayed Effect', -2),
  makeModifier('Depleted', -1),
  makeModifier('Direct Feed', -2),
  makeModifier('Exhausted', -3),
  makeModifier('Focus', -1),
  makeModifier('Fragile', -1),
  makeModifier('Full Power Only', -1),
  makeModifier('Go Last', -1),
  makeModifier('Horrifying', -1),
  makeModifier('If/Then', -1),
  makeModifier('Limited Damage', -1),
  makeModifier('Limited Width', -1),
  makeModifier('Locational', -1),
  makeModifier('Loopy', -1),
  makeModifier('Mental Strain', -2),
  makeModifier('No Physical Change', -1),
  makeModifier('Obvious', -1),
  makeModifier('One Use', -4),
  makeModifier('Reduced Capacities', -1),
  makeModifier('Scattered Damage', -1),
  makeModifier('Self Only', -3),
  makeModifier('Slow', -2),
  makeModifier('Touch Only', -2),
  makeModifier('Uncontrollable', -1)
];
function makeModifier(name: string, cost: number = 1, options?: string): IPowerModifier {
  const ref = refCounter.current;
  refCounter.current = refCounter.current + 1;
  return { name: name, ref: ref, cost: cost || cost, costOptions: options, multiplier: 1 };
}

export const Modifiers = {extra: extras, flaws};