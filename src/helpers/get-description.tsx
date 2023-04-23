
const lookup: {[key: string]: string[]} = {
  attack: [
    'With the Attacks quality, you can attack things with your power. Roll its dice like any other attack, using height to determine hit location. It inflicts width in Shock and Killing damage. Without the Attacks quality, you can\'t use your power to attack.',
    'If your power has the Attacks quality, each additional Attacks level adds +1 damage to successful attacks.'
  ],
  defends: [
    'With the Defends quality, you can defend yourself with your power. Roll its dice like any other defense roll, with height and width determining which dice it can gobble from attacks against you. Without the Defends quality, you can\'t use your power to defend.',
    'If it has the Defends quality, each additional Defends level adds one gobble die to a successful defense, using the height and width of the defense roll.'
  ],
  useful: [
    'With the Useful quality, you can do something else with your power that\'s neither an attack nor a defense. This can be literally anything you want: flying, creating frogs, reading minds and healing super-fast are all examples of Useful Power Qualities. Roll the power\'s dice to activate the power, using width for speed and height for effectiveness, as usual.',
    'If it has the Useful quality, each additional Useful level offsets one penalty die when you use the power in difficult circumstances.'
  ],
  area: [
    'Your power explodes, with the same effects as the Area weapon quality (page 82). For particularly nasty attacks, you can take Hard Dice or Wiggle Dice as Area dice. Area Hard Dice cost +2 each instead of the usual +1, and Area Wiggle Dice cost +4 each.',
    'Area is usually taken on Attacks, but you can apply it to the Defends quality (your power explodes when you successfully defend against an attack) or the Useful quality (your power explodes as a side effect) if you want. With Defends or Useful, Area has no range unless you take the Power Capacity (Range) Extra, so make sure you have some way to resist the damage yourself'
  ],
  augment: [
    'Your power\'s dice pool can enhance another dice pool\'s roll. You don\'t have to declare that you\'re using Augment like most Extras; you can decide that you\'re using it in the roll phase of combat, after you\'ve already rolled for your declared action. Simply add the Augment dice to the dice pool that you just rolled and look for matching dice.',
    'Augment applies to your own actions. To be able to apply it to someone else\'s actions, add the Power Capacity (Range) Extra.',
    'Augment has some important limitations.',
    '**If either power—the Augment power or the one you\'re augmenting—has Extras (besides Augment, of course) or additional Power Quality Levels, you have a choice**. You can turn off the Extras and additional Power Quality Levels and add the dice pools together as above; or you can use all the Extras and Power Quality Levels from both powers but roll only the smaller of the two dice pools. The number of dice is all that matters here, not the types of dice; if you have a 6d pool being augmented by a 2wd Augment power, use the 2wd because that\'s fewer dice.',
    '**The Augment dice can only be added to a dice pool that shares Augment\'s Power Quality**. Augment on the Attacks Power Quality can only boost attack rolls. Augment on the Defends Power Quality can only boost defense rolls. Augment on Useful can boost any action that is neither a defense nor an attack, at the GM\'s discretion.',
    '**Augment does not increase another power\'s Power Capacities**. Always use the Power Capacities of the roll being augmented, not the power with Augment.',
    '> **Example**: You take Augment for a power we\'ll call All-Encompassing Fire, with 3d+2hd+2wd. It has Attacks with Augment and Penetration 2. Let\'s say you use All-Encompassing Fire to boost your 3d Brawling dice pool.',
    '> If you shut off the Extra, you can roll all 6d+2hd+2wd to attack with no Penetration. (Augment does not increase capacity, so your range is only touch—it\'s a punch!)',
    '> If you want to use Penetration 2 on your punch, you must only use your Brawling dice, the smaller of the two dice pools: That\'s 3d with Penetration 2.',
    '**Optional Rule**: You can spend Willpower to add the Augment dice and keep all Extras and Power Quality Levels from Augment and the affected power. This costs 1 Willpower per Augment die, 2 per Augment Hard Die, and 4 per Augment Wiggle Die.'
  ],
  booster: [
    'Each time you take Booster on a Power Quality, it multiplies its Power Capacity by 10. If your Power Quality has more than one capacity, you can decide when you use the power whether Booster applies to one or another; and if you have more than one instance of Booster, you can divide the Booster levels between the capacities however you like each time you use it.'
  ],
  burn: [
    'Burn is usually taken on Attacks, but you can take it with the Defends quality (you set attackers on fire if you successfully defend against them) or Useful (you set things on fire as a side effect of your power) if you want.',
    'Burn has range only if its Power Quality has the range Power Capacity. Otherwise it affects only those who touch you or whom you touch.',
    'The Burn quality has no points or dice pool associated with it—it simply takes effect. Targets damaged by a Burn power are on fire.',
    'When a Burn power strikes, it does normal damage. In addition, every hit location of the target except the head is now on fire and takes 1 point of Shock damage.',
    'Burning hit locations suffer an additional point of Shock damage each round until the fire is extinguished. Typically, only full immersion or lack of oxygen will do it—most fire-based military weapons use a sticky fuel that is particularly difficult to extinguish.',
    'Any target set on fire must make a Trauma Check once per round to avoid panicking. A target that panics may do nothing except run around swatting at the flames.',
    'The Burn quality can also be used to simulate other threats that stick with you, such as acid or even a swarm of insects. Just describe it differently.'
  ],
  'controlled effect': [
    'The Miracle affects specific targets or characters, such as friends only, enemies only, yourself only, or others only. (If this is a disadvantage, take it as a Flaw.)'
  ],
  custom: [
    'If you want to have a special extra or flaw that isn\'t covered by any other description you can use Custom to enter a personal variant described with the note.'
  ],
  daze: [
    'Your power reduces the target\'s dice pool by width in dice for the next round'
  ],
  deadly: [
    'For +1, an attack that ordinarily does width in Shock damage instead does width in Killing; or an attack that ordinarily does width in Killing does width in Shock and Killing. For +2, an attack that does width in Shock instead does width in Shock and Killing.'
  ],
  disintegrate: [
    'This Extra applies to the Attacks quality. If your attack fills the target hit location or object with Killing damage, it disintegrates completely and is gone forever.'
  ],
  duration: [
    'With a single successful roll, your Miracle remains in effect for the rest of the current scene or series of actions or rounds.',
    'The exact duration is fluid and depends on the circumstances; it might be a few rounds or it may be several minutes, or longer if the players and GM agree.',
    'You don\'t have to concentrate on maintaining the action or roll it again, and can perform other actions while it\'s still going.',
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
  eletrocuting: [
    'This Extra applies only to the Attacks quality. It functions like a limited version of the Engulf Extra. If the attack damages the target—it must inflict at least one point of damage past the target\'s defenses—that same damage instantly "travels" to adjacent hit locations as it goes to ground, without requiring you to make any more rolls.',
    'The damage follows the shortest route through the target to ground, which usually means the damage goes to lower hit locations, ending at a leg. An electrocuting attack that does damage to a human-shaped target\'s head or arm also inflicts damage to the torso and one leg; if it does damage to a target\'s torso it also inflicts damage to one leg.'
  ],
  endless: [
    'With a successful roll, your Miracle remains in effect indefinitely, even if you\'re asleep, until you choose to deactivate it. You don\'t need to roll to deactivate it; a simple declaration will do.',
    'See the Duration Extra for details about ongoing powers'
  ],
  engulf: [
    'Your Miracle affects every hit location of the target simultaneously. If the power is an attack, it inflicts the same damage to every hit location. Engulf does not give you additional rolls; a single defense roll is enough to block or deflect an Engulf attack altogether.'
  ],
  'go first': [
    'Go First increases the width of your Miracle\'s roll by 1 for determining initiative in the Resolve phase. You can take it multiple times for a greater bonus.'
  ],
  'hardened defense': [
    'This Extra applies to the Defends quality if it also has the Armored Defense Flaw. With Hardened Defense, your Armored Defense\'s LAR is not reduced by Penetration.'
  ],
  'high capacity': [
    'This Extra applies when a Power Quality has more than one Power Capacity. With High Capacity, one particular Power Capacity always has its maximum capacity. You don\'t have to devote dice to it at all when combining capacities.',
    '> **Example**: You have 5d with a Power Quality with the Mass capacity, the Speed capacity, the Range capacity, and High Capacity (Mass). Your power can always lift the maximum amount of mass for those 5d, and still divide the full 5d of capacity among Speed and Range.'
  ],
  interference: [
    'Interference allows your power to reduce the width of an opposed roll *before* the resolution of all rolls. This is an extremely powerful effect in the game.',
    'You must declare you\'re using Interference to oppose another character\'s roll during the declaration phase of combat, and make a successful roll in the roll phase (see page 28 for opposed rolls; see page 75 for how opposed defense rolls work). On a success, in the resolution phase your Interference roll reduces the width of the opposed roll by its width *before any other roll is parsed*.',
    'Your Interference roll\'s height must match or exceed the height of the roll that you\'re opposing. Unlike an ordinary opposed roll, however, it does not need to match or beat the width of the roll you\'re opposing; it happens before any other actions take place. This makes Interference a really, really effective opposed roll.',
    'The kinds of actions your power can oppose with Interference is always up to the GM. Interference on a Defends Power Quality usually opposes attack rolls; Interference on a Useful Power Quality usually opposes noncombat rolls, depending on the nature and description of your power and the action you\'re trying to oppose. Interference on Attacks can oppose just about any kind of action, but the GM is encouraged to play up unintended consequences when you, say, distract someone with blasts of supernova fire.',
    '**Long-Term Interference**: A Power Quality that has Interference and also is a long-term effect, through an Extra such as Duration, is an automatic defense or "jinx." It applies the same Interference result separately against each opponent that\'s affected by your power.',
    'Long-term Interference on Defends represents armor, a force field, or some other static protection: It applies separately to any attack against you.',
    'Long-term Interference on Useful or Attacks constantly interferes with some particular kind of action. Exactly what kind of action is up to you and your GM, and depends entirely on the nature of your power and your description of it in the declaration phase; it helps to describe the effects of your Interference power with enough detail that it\'s fairly obvious what it opposes and what it does not.',
    '> **Example**: You declare you\'re going to attack your enemy, Freezerburn, with Flame Blast. Freezerburn declares he is going to block it with Ice Shield, which is a Defends Power Quality with Interference.',
    '> You roll 4x8 with Flame Blast. Freezerburn rolls 3x9 with Ice Shield.',
    '> Your Flame Blast\'s width is greater than the Ice Shield\'s, so if it was a standard defense roll your blast would go through before the Ice Shield took effect.',
    '> But with Interference, Ice Shield works a little differently. Its height is greater than or equal to your Flame Blast\'s height, so each of the dice in the Ice Shield set removes one die from your Flame Blast set, regardless of your attack\'s speed. Your Flame Blast drops to 1x8, which is a miss.'
  ],
  'native power': [
    'Your power is not a superpower at all, but a native ability as natural to you as walking or talking is to a normal person. You do not lose dice from this power if your Willpower reaches zero, and you do not lose this power if a power like Nullify disrupts your Archetype\'s Sources or Permissions.'
  ],
  'no physics': [
    'Your power ignores all the usual laws of physics that ordinarily apply to you even when you\'re using a Miracle—gravity, inertia, leverage, and so on. You could use it to make impossibly sharp turns regardless of speed, use your superhuman strength to stop a truck cold without destroying it, or lift a car by its bumper without tearing the bumper off.'
  ],
  'no upward limit': [
    'You can spend Willpower to enhance your power. For every point of Willpower you spend, you can double your power\'s mass, range or speed capacity. For every 2 Willpower, you can quadruple your mass, range or speed capacity or add +1 to the width of your roll. If you have the Radius Extra, you can double the power\'s radius for 8 Willpower. There\'s no limit to the amount of Willpower you can spend to increase the power\'s capacity or width—you can even extend the width of your roll beyond the size of your dice pool—but you must spend the Willpower before you roll.'
  ],
  'non-physical': [
    'This Extra applies only to the Attacks quality. Typically a standard defense roll deflects or avoids the attack as usual, but a static defense that you don\'t have to roll—body armor, or a "Defends" Power Quality with Interference or Armored Defense and either Duration, Endless or Permanent—simply does not apply. If there\'s any doubt, it\'s up to the GM.',
    'If an ordinary defense roll won\'t block the attack, you must define some reasonably common factor that can protect against your attack but would not protect against a physical attack. The GM and players should decide what counts as "reasonable."',
    'For example, a mental attack might be blocked if the target succeeds at a Stability roll against the attack, while a non-physical gamma ray blast might be blocked by lead shielding, the Hardened Defense Extra, or anything that keeps out radiation.',
    'If your power has this Extra, it always applies. You can\'t choose whether or not to use it. To have a version of Attacks without it on the same power, take another instance of the Attacks quality (page 106).'
  ],
  'on sight': [
    'Your ranged power can affect anyone or anything you can see within range, even if you don\'t have line of sight. It works even if you\'re looking at the subject through an intermediary such as a camera, mirror, or power that allows remote viewing.'
  ],
  penetration: [
    'This Extra applies only to the Attacks quality. Your attack reduces the target\'s armor ratings (HAR and LAR) by 1. You may take Penetration multiple times to reduce armor further.'
  ],
  permanent: [
    'Once you activate your power, it stays on permanently unless you deliberately shut it off. It is not affected if you run out of Willpower or Base Will. If you activate a Permanent power and then get killed, the power will keep going. See the Duration Extra, page 124, for other details about ongoing powers.',
    'Adding Permanent to a power that also has Attached or If/Then is a handy way to create a power that automatically activates when you use some other power.',
    'If you want a power that is truly permanent, one that you can\'t deliberately shut down, add a –1 Flaw called "Always On."'
  ],
  'power capacity': [
    'Your Power Quality has another Power Capacity (see page 109). If it\'s mass, range or speed, this Extra costs +2; if it\'s touch, the cost is +1'
  ],
  radius: [
    'Your Miracle affects all possible targets within a 10-yard (10-meter) sphere around the point where it takes effect. Each additional instance of the Radius Extra doubles its size: 20 yards at +4, 40 yards at +6, and so on. If your power incurs a Willpower cost, it applies once for each target affected in the radius.'
  ],
  'speeding bullet': [
    'Your power can\'t easily be resisted or avoided. In order to get a roll to oppose it, the target must have six or more dice in an appropriate Stat—typically Coordination to oppose an Attacks quality with Speeding Bullet, or Mind, Sense or Command to oppose a Useful quality with Speeding Bullet. Ongoing static protection such as armor or a defense with Duration applies normally.'
  ],
  spray: [
    'Your power has the Spray quality, like a weapon (page 83). It adds +1d to your roll, and allows you to attempt any number of multiple actions with the power without penalty. You may take this Extra multiple times to gain additional Spray dice. You may even take Hard Dice or Wiggle Dice in Spray for particularly dangerous attacks or effective actions; each Spray Hard Die costs +2 instead of +1, and each Spray Wiggle Die costs +4. The Augment Extra is another way to add dice to a roll.'
  ],
  subtle: [
    'Your power usually goes unnoticed. Anyone within 10 yards (10 meters) can notice it only with a Perception roll.'
  ],
  traumatic: [
    'This Extra applies only to the Attacks quality. Your attack power is terrifying. If you use it to damage an enemy, causing at least one point of damage past defenses, the target must make a Trauma Check or suffer mental trauma (page 63). Unfortunately, deliberately causing that much trauma forces you to make a Trauma Check, too.'
  ],
  'variable effect': [
    'You can change the effects of your Power Quality. With a successful roll to activate the power—this cannot be an actual attack, defense or other use, just a roll to activate it—you may designate some or all of the dice of your Variable Effect power to temporarily "become" dice for some other effect.',
    'This emulated power is good for a single action unless you extend it with an Extra such as Endless. You must declare that you\'re using Variable Effect, and what you\'re emulating with it, in the declaration phase.',
    'If you can use the Power Quality only for Variable Effect, apply the If/Then Flaw.',
    '**Using Variable Effect**: You don\'t actually lose the dice from your Variable Effect power, but as long as you are using them to emulate another power you can\'t use them for Variable Effect itself or to emulate some other effect on the same Power Quality.',
    'The emulated effect uses the dice of the the original power; you can\'t "change" dice types. If you have no Hard Dice in the source power, you can have no Hard Dice in an emulated power.',
    'As with all Extras, you must purchase Variable Effect separately for each Power Quality that you want it to affect. You cannot change the effect of a Power Quality that doesn\'t have the Variable Effect.',
    'To emulate a Skill die, you must have Variable Effect on the Power Quality that matches that Skill. To emulate Stat dice, your power must have Variable Effect on all three Power Qualities, Attacks, Defends and Useful.',
    '**Multiple Effects**: Each use of a Power Quality with Variable Effect to emulate some other version of that Power Quality requires its own action. That means that if you want to emulate three Power Qualities at once, you need to do it with multiple actions or else do it in stages, one roll per round.',
    'If you want to be much more efficient at emulating powers, add the Permanent Extra to a Power Quality that has Variable Effect, and add the Attached Flaw to link it to another Power Quality that has Variable Effect. When you activate the "primary" quality, the one that\'s Attached to it also activates automatically. (See Automatic Powers, page 119.)',
    '**Power Capacities**: Because you\'re not rolling for its own effect, a Power Quality with Variable Effect has no capacity for range, speed or mass. But its emulated power has a range, speed or mass capacity, as usual.',
    '**Power Qualities, Extras and Flaws**: If the Variable Effect Power Quality has other Power Quality Levels, Extras or Flaws, they do not "transfer" over to the emulated power; they apply only to the use of the Variable Effect Power Quality itself. The emulated power starts from scratch.',
    'You may add Extras and Power Quality Levels to an emulated power by paying Willpower equal to their Point value.',
    'For example, let\'s say you emulate a 4d Attacks power and you add the Extra No Upward Limit and three Attacks levels. No Upward Limit costs +2 Points per die and three Attacks quality levels cost +3 per die. To add them to the emulated power costs 5 Willpower per emulated die, or 20 Willpower for a 4d power.',
    'You may reduce the Willpower cost of adding Extras and quality levels to an emulated power effect by adding Flaws to it, to a minumum Willpower cost of 0. (Sorry, but you can\'t give yourself Willpower points by taking more Flaws on an emulated power effect than it has Extras.)',
    '**Power themes**: In many characters, the power effects emulated with Variable Effect must tie in somehow with a broad theme. If this is the case, use the If/Then Flaw to specify what theme your power must follow. If you have a power with Variable Effect with If/Then (fire theme), you could use Variable Effect to change its Useful quality so it manipulates fire, or to modify the Extras of its fiery Attacks quality, but you couldn\'t change it to something non-fire-related. If in doubt, talk to the GM.',
    'Variable Effect is a great way to represent characters with very flexible powers. See the "cafeteria Miracles" Alternate Forms (page 140), Cosmic Power (page 142) and Gadgeteering (page 145) for some examples.'
  ],
  'always on': [
    'This Flaw combines with the Permanent Extra: You can\'t deactivate your power.'
  ],
  'armored defense': [
    'This Flaw applies to the Defends quality. Your Defends quality does not have its own roll to gobble attack dice, and its additional Power Quality Levels do not boost defense rolls. Instead, it provides its width in LAR on every hit location, and each additional Defends level adds +1 LAR.',
    'The armor ratings of a power with Armored Defense are subject to Penetration unless you also take the Hardened Defense Extra (page 126).',
    'If you have the Interference Extra along with Armored Defense, Defends works like Heavy Armor (see Interference, page 126), but the Armored Defense Flaw makes the power susceptible to Penetration. In that case Armored Defense\'s roll does not provide LAR, because its dice are used for Interference.'
  ],
  attached: [
    'A power with Attached takes effect only when you use another power or a particular Stat or Skill. You still must roll for each; you can take the primary action in one round and the Attached power the next, or use both in one round with multiple actions. Take the Duration, Endless or Permanent Extra to have the attached power "go off" automatically when you use its associated Stat or power. Attached is worth –2 if it applies only when you use a specific Miracle or Skill. If Attached applies when you use a particular Stat (which can be used with multiple Skills), it\'s worth –1.',
    'It\'s possible to take the Attached Flaw more than once, if your power requires more than one "source" power to be active.'
  ],
  automatic: [
    'This Flaw applies to a power with the Attached Flaw. The Power Quality with Automatic takes effect every time you use its Attached power, automatically, whether you want it or not. You must declare and roll for the Attached power alongside the power that triggered it, unless it\'s already activated via the Duration or Endless Extra. Automatic is worth no Points as a Flaw if you have the Permanent Extra; if you\'re power is permanent, it\'s automatically on already!'
  ],
  backfires: [
    'Every time you use your power, you take a point of Killing damage to the torso (or whatever counts as your core hit location).'
  ],
  'base will cost': [
    'To activate your power you must spend one point of Base Will. You lose this Base Will point permanently. If you fail to activate the power for any reason, you do not lose the Base Will.'
  ],
  'delayed effect': [
    'Your power takes a while to take effect. Exactly how long this takes depends on the nature of the power and the situation, and is up to you and the GM; a power with more Extras should take longer to have its complete effect than one with just the basic Power Qualities. A Delayed Effect attack may dole its damage out at one point per round, or it may wait and deliver all its damage at the end of the scene or encounter. A Delayed Effect defense may take a few minutes to "charge up."'
  ],
  depleted: [
    'Your power has a limited number of uses that must be recharged, reloaded, refreshed or otherwise replaced. Each time that you attempt to use a power takes one charge.',
    'The more charges your power has, the fewer times it can be recharged. The default is one charge per die in the power, with one available recharge per die in the power. You can increase the number of charges by reducing the number of recharges. With half the recharges, each recharge has double the charges.',
    'For example, let\'s say you have 6d in a power. Ordinarily that\'s six charges with six recharges, for 36 total uses. You could halve the number of recharges and double the number of charges in each, for 12 charges with three recharges, or triple the number of charges but have only a third as many rechages—18 chages with only 2 recharges. The total number of uses is always the same.',
    'Ordinarily, each Power Quality with Depleted has its own set of charges. You can have them all share one set of charges with the If/Then Flaw.',
    'It takes one round to recharge a depleted power. This typically doesn\'t require a roll but it counts as an action if you want to do more than that in a single round.',
    'When you\'re out of recharges, you must take some significant in-character action to regain the use of your power. Exactly what you must do depends on your character, but it usually shouldn\'t take more than an hour or so; work out a reasonable recharge method with the GM and other players. Maybe you must fly back to your home to swap batteries, or maybe you must plug into a wall for an hour, or maybe you must sit in crystal-clear sunlight for a while.',
    'You generally can\'t take Depleted on a power that\'s Attached to a power that already has the Depleted Flaw, unless the Attached power would have fewer charges than the primary power; if the primary power runs out first you can\'t use the Attached power anyway, so Depleted would not impair it and would therefore be worth no Points as a Flaw.'
  ],
  'direct feed': [
    'Every time you use your power, you lose width in Willpower points. The better you do with it, the more Willpower you lose.'
  ],
  exhausted: [
    'You can use your power only once in a particular encounter or scene.'
  ],
  focus: [
    'Your power is contained in an external object and can\'t be used without it. When you use the power it obviously comes from the focus.',
    'The focus can be taken away if you\'re unconscious or helpless. If you do lose it, you can only replace it between adventures, after a significant amount of time, or in some restricted circumstances; work with the GM to figure out what\'s appropriate.',
    'You can choose whether your focus is usable by others or not. If it is, it\'s usable by anyone, friend or foe.',
    'The focus itself can be attacked even without taking it from you. You must designate one hit location number where the focus can be attacked with a called shot. An ordinary hit on that number still hits you, not the focus, but if an enemy wants to target the focus itself that\'s the number he or she needs to target.',
    'A focus has its own hit boxes and armor points. It has one wound box for every die (of any kind) in each Power Quality with the same Focus Flaw. Use the Heavy Armor power to give the focus a Heavy Armor Rating.',
    'For example, the rural inventor Doc Stockton has a Miracle called Rusting Raygun, 5d+2hd. With a total of seven dice it has seven wound boxes.',
    'It\'s possible to have more than one power included in a single focus. In that case each power should have the Focus Flaw. However, each power should be treated as a separate "part" of the overall focus, with its own wound boxes.',
    'See page 136 for a list of optional focus Extras and Flaws'
  ],
  fragile: [
    'Your power instantly stops working if you take any damage or if you suffer some other serious distraction; anything that inflicts a gobble die penalty (see page 25) also shuts down your power. You can attempt to use it again the next round.'
  ],
  'full power only': [
    'You can never "scale back" your power\'s effects. It always affects the maximum possible Power Capacity, rolls its maximum dice pool, and (with an attack) inflicts maximum possible damage.'
  ],
  'go last': [
    'The Power Quality takes effect last in the combat round; treat it as "width 1" for determining initiative.'
  ],
  horrifying: [
    'Your power appalls witnesses. Any Charm rolls that you attempt with characters who have seen your power work are at +1 Difficulty for each Power Quality that has this Flaw. For example, if you have three Power Qualities with the Horrifying Flaw, after you use the power your Charm rolls are at +3 Difficulty, for a base Difficulty of 4. You gradually lose this penalty with a character who becomes accustomed to you and your use of the power; how long this takes is up to the GM.'
  ],
  'if/then': [
    'Your power requires some condition—or the absence of some condition—for it to work. Maybe you must say the Lord\'s prayer, or maybe it doesn\'t work in the presence of a certain color or in the presence of other people, or maybe it doesn\'t work against certain types of characters, or maybe you must be in a certain mood. If the circumstances aren\'t right, the power doesn\'t work. A particular restrictive version might be worth -2 if the GM agrees.',
    'If the GM agrees, you can also use If/Then to specify when some particular part of a power doesn\'t work—when it has a particular Power Capacity, for example, or when it can use an Extra.'
  ],
  'limited damage': [
    'This Flaw applies to the Attacks Extra. Your power inflicts only one kind of damage, either width in Shock or width in Killing. You must choose which kind of damage the power inflicts when you create the power.'
  ],
  'limited width': [
    'No matter what you roll, your power has an effective width of 1. It still takes effect if you roll a set, but treat its width as 1 for speed, damage and all other effects.'
  ],
  locational: [
    'Your power is tied to a particular hit location. If that hit location takes any Shock or Killing damage, your power fails but you can reactivate it the next round. If that hit location is filled with Shock or Killing damage, you cannot use the power at all. You can take Locational multiple times to apply it to multiple hit locations. If Locational applies to three hit locations it\'s worth –3, but your power fails if any of those locations takes any damage.'
  ],
  loopy: [
    'Your power disorients you, causing you to wander in a stupor until you make a Stability roll. You can attempt the roll once per round. This Flaw gets you no Points if you have two or more Hard Dice or any Wiggle Dice in Command or Stability.'
  ],
  'mental strain': [
    'Every time you use your power, you suffer a point of Shock damage to the head.'
  ],
  'no physical change': [
    'Whatever your power appears to do, really it causes no physical change to the world. If you\'re invisible, you\'re only invisible in the minds of those who see you, and you still are picked up by cameras and motion sensors; with an attack power, you cause pain that could debilitate or kill the victim, but the victim also can throw off the power\'s effects and recover from all damage.',
    'A target who knows or suspects your power is at work can resist the power\'s effects by rolling Resistance against your power roll and spending a point of Willpower. (This requires a declaration and roll in the appropriate combat phases.)'
  ],
  obvious: [
    'There is no way to use your power without drawing attention to yourself. Maybe it glows brilliantly, causes a loud noise, or exudes a stench—when you use it, everybody nearby knows about it. Define the effect when you build your power.'
  ],
  'one use': [
    'Your power works once, then it\'s gone and you cannot use it again, ever. You can only regain it by taking it as a new power through character advancement (page 56). This Flaw applies only if you actually use the power; if you fail to activate your power for any reason, it is not used up.'
  ],
  'reduced capacities': [
    'The Power Quality\'s capacities are reduced to one tenth normal: 10 lbs instead of 100 lbs, 64 yards instead of 640 yards, and so on.'
  ],
  'scattered damage': [
    'This Flaw applies only to the Attacks quality. Each point of damage inflicted by the power affects a different hit location; roll 1d10 for each point of damage and apply it to the hit location indicated on that die. (If splitting the damage up actually improves the power, treat this as a +1 Extra instead.)'
  ],
  'self only': [
    'You can use your power to affect only yourself. This is typically taken on a Useful Power Quality (although you can take it on Attacks if you really want); it cannot be taken with the Defends quality, which affects only you by default (see page 109). You get no Points for the Touch Only Flaw if you have Self Only.'
  ],
  slow: [
    'You can use the power only every other round. The first time you use it in an encounter you can use it immediately, but after that you must wait a round between each attempt to use it. You can take other actions while waiting.'
  ],
  'touch only': [
    'A Power Quality with Touch Only has no range, speed or mass capacities (see page 109); no matter how many Power Qualities its power has, it has no range and affects no mass beyond what you can touch and lift. You cannot take this Flaw on a Power Quality that already is limited to the "touch" or "self" Power Capacities'
  ],
  uncontrollable: [
    'Your power has a mind of its own. Once you activate it, the GM decides exactly what it does and when. You can shut it off only with a dynamic roll of the power\'s dice against your initial activation roll.'
  ],
  'willpower bid': [
    'To activate your power you must "bid" one point of Willpower. If you fail to activate the power for any reason, you lose the Willpower point. If the power activates, you keep the Willpower point.'
  ],
  'willpower cost': [
    'To activate your power you must spend Willpower equal to 1 per die that you roll, 2 per Hard Die, and 4 per Wiggle Die. If you fail to activate the power for any reason, you do not need to spend the Willpower.'
  ],
  'willpower investment': [
    'To activate your power you must "invest" Willpower equal to 1 per die that you roll, 2 per Hard Die, and 4 per Wiggle Die. This invested Willpower returns when your power\'s duration is over, even if it\'s only single action, but until then you must treat it as if you lost that Willpower. If you fail to activate the power for any reason, you do not need to invest the Willpower.'
  ],
  accessible: [
    'The focus can be taken away with a disarm attack, and if you\'ve been grappled and pinned it can be wrestled out of your hand with an opposed Brawling roll.'
  ],
  adaptation: [
    'Rather than a thoroughgoing innovation, your focus is an improvement on some pre-existing technology. Use the mundane version\'s wound boxes and capacities (you can instead use your dice pool capacity by taking the Power Capacity Extra), but use the Miracle\'s dice pool, Power Qualities and Extras.'
  ],
  'booby-trapped': [
    'The focus is built to hurt anyone who activates it without permission. If the user fails to fit the criteria—a particular code word, a DNA match, whatever you and the GM and other players deem appropriate—the largest Attacks power in the focus automatically attacks the user. This attack occurs once per use of the focus.',
    'A character with some appropriate Skill or power (Alchemy, Engineering, Gadgeteering, whatever the GM deems acceptable) can deactivate the trap by making an opposed roll against the largest dice pool in the power. If the roll succeeds, the booby trap no longer works until you or someone with the same Skill turns it back on. If the roll fails, the tinkerer suffers the same attack as for using the focus.'
  ],
  bulky: [
    'The focus is too large for you to carry it around. It\'s not too heavy to lift, but it\'s bulky; you lose 1d from any dice pool while carrying it. It can move under its own power if you attach a movement power such as Flight to it.'
  ],
  crew: [
    'The focus requires a crew of operators for it to work. Each level of the Crew Flaw doubles the number of operators required: With one level of Crew it requires two operators, with two levels it requires four, and so on.'
  ],
  delicate: [
    'The focus has half the normal number of wound boxes (round down, with a minimum of one). If the focus only has one wound box anyway, you get no Points for this Flaw.'
  ],
  durable: [
    'The focus has twice the normal number of wound boxes (two per die).'
  ],
  'environmental-bound': [
    'The focus functions only in a specific environment, such as the presence of air or only underwater.'
  ],
  'friends only': [
    'The focus is usable by others, but only a specific group of people that you choose. This might be a single best friend, or all members of a particular species, or anyone who knows the password, or whatever you want. This advantage is not wholly foolproof—it\'s possible for a stranger to trick the focus with a lot of effort and planning. Exactly what that requires is up to you, the GM and the other players. But ordinarily the focus can be used only by the people you designate.'
  ],
  immutable: [
    'The powers contained in the focus cannot be changed in any way.'
  ],
  indestructible: [
    'The focus cannot be damaged or destroyed by ordinary means. However, you must work out with the GM and other players some specific, difficult but not impossible means that will destroy it.'
  ],
  irreplacable: [
    'The focus cannot be replaced'
  ],
  manufacturable: [
    'Others can study and reproduce your focus—but only with a tremendous amount of work on your part.',
    'To allow another Talent to reproduce the focus, you must pay Willpower equal to the total cost of all powers in the focus, and then spend a point of Base Will. (If the recipient helps you build the focus, he or she can donate Willpower to help; see page 52.) This is equivalent to gaining a new power in the middle of some desperate action (page 57); but in this case you don\'t gain the new power, somebody else does! Once you\'ve given the focus away, it can be replicated by other Talents, who must spend the same Willpower but do not need to spend Base Will. The GM can decide what happens to it next; maybe it goes into long-term study, or maybe in a few months you start seeing knockoffs in stores everywhere as shops full of Talents pool their Willpower and turn the focus out in mass quantities.',
    'As an alternative, you can train non-Talents to create the focus, with an eye toward making it a piece of technology available at large. This is much more difficult. First, you must spend Base Will equal to half the total Point cost of the focus. Each point of Base Will spent in this way requires one month of game time spent drafting plans, building computer simulations and instructing engineers and scientists. In addition you must give up the focus itself, losing all the Points you paid for it (or all the Willpower if you built it with the Gadgeteering Miracle).',
    'After all this, the focus may be reproduced by non-Talent engineers, and anybody who can afford it can get it without paying Points—it has become a ubiquitous object like a shovel, flashlight, or gun.'
  ],
  'operational skill': [
    'You must have a particular Skill to use the focus. Use the lower of the two dice pools, either the focus\' power or the Skill. If you have Hard Dice or Wiggle Dice in the Skill dice pool, however, you can use them even if the focus itself has no Hard Dice or Wiggle Dice.'
  ],
  secret: [
    'The focus is hidden and its powers appear to come directly from you. Other characters can discover the secret only by extended close observation.'
  ],
  unwieldy: [
    'All actions with this focus are limited to a maximum width of 2 for initiative purposes only. This does not affect damage or any other functions of width. With the –2 version of this Flaw, all actions with this focus and all physical actions you take, even ones that don\'t involve this focus, are limited to width 2 for initiative purposes.'
  ]
};

export function getDescription(name: string | undefined): string[]{
  if(!name) return [];
  const description = lookup[name.toLowerCase()];
  return description ?? [];
}