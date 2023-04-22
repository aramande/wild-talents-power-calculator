
const lookup: {[key: string]: string[]} = {
  attack: [
    'With the Attacks quality, you can attack things with your power. Roll its dice like any other attack, using height to determine hit location. It inflicts width in Shock and Killing damage. Without the Attacks quality, you can\'t use your power to attack.',
    'If your power has the Attacks quality, each additional Attacks level adds +1 damage to successful attacks.'
  ],
  booster: [
    'Each time you take Booster on a Power Quality, it multiplies its Power Capacity by 10. If your Power Quality has more than one capacity, you can decide when you use the power whether Booster applies to one or another; and if you have more than one instance of Booster, you can divide the Booster levels between the capacities however you like each time you use it.'
  ],
  duration: [
    'With a single successful roll, your Miracle remains in effect for the rest of the current scene or series of actions or rounds.',
    'The exact duration is fluid and depends on the circumstances; it might be a few rounds or it may be several minutes, or longer if the players and GM agree.',
    'You don\'t have to concentrate on maintaining the action or roll it again, and can perform other actions while it’s still going.',
    'If your Miracle has the Attacks quality, it launches one attack against the same target with the same roll every single round.',
    'If it has Defends, it automatically defends, with the same set, against each attack against you.',
    'If it has Useful, it automatically conducts the same action once per round with the same roll.',
    'Typically, the same action and its rolled set apply throughout this duration, so if you activate your Miracle with a 2x7 it remains active at height 7',
    'You can voluntarily reroll the power\'s effect by declaring it again and then rolling a new result in the Roll phase. However, you cannot activate an action with Duration and then "stack" another roll with the same action and a new duration on top of it. The new action\'s roll replaces the original one.',
    'Two important circumstances change the way Duration works. The first is if your power is conditional—it has some restricted condition under which it works. The second is if your power doesn\'t roll for its own effect, but intead augments some other roll using the Augment Extra or impedes some other roll using the Interference Extra.',
    'A conditional power with Duration on the Attacks or Useful quality—one that has Flaws such as Attached or If/Then, which restrict when it works—takes effect automatically or reflexively whenever the conditions are right. It is not restricted to a single automatic activation each round, but it cannot activate at all if the conditions are wrong.',
    'Each time the power takes effect it uses the same roll that activated it in the first place. You can stop the power from "going off," but only by making an announcement to that effect in the declaration phase, before the power has a chance to take effect. If you don\'t declare that you\'re quashing the power\'s effects before something triggers it, it takes effect in the Roll phase whether you like it or not.',
    'If your Duration power doesn\'t roll for its own effect but instead affects some other roll, as with the Augment Extra or the Interference Extra, you must roll its dice anew every time it takes effect. After all, you\'re not rolling to activate a power but to affect some other action.',
    'See the Extras Endless and Permanent for longer-lasting versions of Duration.'
  ],
  'if/then': [
    'Your power requires some condition—or the absence of some condition—for it to work. Maybe you must say the Lord\'s prayer, or maybe it doesn\'t work in the presence of a certain color or in the presence of other people, or maybe it doesn\'t work against certain types of characters, or maybe you must be in a certain mood. If the circumstances aren\'t right, the power doesn\'t work. A particular restrictive version might be worth -2 if the GM agrees.',
    'If the GM agrees, you can also use If/Then to specify when some particular part of a power doesn\'t work—when it has a particular Power Capacity, for example, or when it can use an Extra.'
  ]
};

export function getDescription(name: string | undefined): string[]{
  if(!name) return [];
  const description = lookup[name.toLowerCase()];
  return description ?? [];
}