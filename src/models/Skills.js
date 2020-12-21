
const LEVELS = Object.freeze({
    NOVICE: 'Novice',
    ADEPT: 'Adept',
    MASTER: 'Master'
});

const SKILLS = Object.freeze({
    AEROTHEURGE: 'Aerotheurge',
    EXPERT_MARKSMAN: 'Expert Marksman',
    GEOMANCER: 'Geomancer',
    HYDROSOPHIST: 'Hydrosophist',
    MAN_AT_ARMS: 'Man-at-Arms',
    PYROKINETIC: 'Pyrokinetic',
    SCOUNDREL: 'Scoundrel',
    WITCHCRAFT: 'Witchcraft'
});

const levelStates = [
    {
        [LEVELS.NOVICE]: 0,
        [LEVELS.ADEPT]: 0,
        [LEVELS.MASTER]: 0,
    },
    {
        [LEVELS.NOVICE]: 3,
        [LEVELS.ADEPT]: 0,
        [LEVELS.MASTER]: 0,
    },
    {
        [LEVELS.NOVICE]: 5,
        [LEVELS.ADEPT]: 2,
        [LEVELS.MASTER]: 0,
    },
    {
        [LEVELS.NOVICE]: 6,
        [LEVELS.ADEPT]: 3,
        [LEVELS.MASTER]: 0,
    },
    {
        [LEVELS.NOVICE]: 6,
        [LEVELS.ADEPT]: 4,
        [LEVELS.MASTER]: 1,
    },
    {
        [LEVELS.NOVICE]: 6,
        [LEVELS.ADEPT]: 4,
        [LEVELS.MASTER]: 2,
    },
];

const initialSkillsState = Object.values(SKILLS).reduce((obj, skill) => ({ ...obj, [skill]: 0 }), {});

const defaultSkill = {
    name: 'Default skill',
    spells: [],
    disabled: false
}

const defaultSpell = {
    selected: false,
    disabled: false,
}

const skills = [
    {
        name: SKILLS.AEROTHEURGE,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Avatar of Storms',
                    image_url: './images/skills/aerotheurge/avatar_of_storms.png',
                },
                {
                    name: 'Bitter Cold',
                    image_url: './images/skills/aerotheurge/bitter_cold.png',
                },
                {
                    name: 'Blitz Bolt',
                    image_url: './images/skills/aerotheurge/blitz_bolt.png',
                },
                {
                    name: 'Shocking Touch',
                    image_url: './images/skills/aerotheurge/shocking_touch.png',
                },
                {
                    name: 'Teleportation',
                    image_url: './images/skills/aerotheurge/teleportation.png',
                },
                {
                    name: 'Thunder Jump',
                    image_url: './images/skills/aerotheurge/thunder_jump.png',
                },
                {
                    name: 'Wind of Change',
                    image_url: './images/skills/aerotheurge/wind_of_change.png',
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Air Absorption Shield',
                    image_url: './images/skills/aerotheurge/air_absorption_shield.png',
                },
                {
                    name: 'Headvice',
                    image_url: './images/skills/aerotheurge/headvice.png',
                },
                {
                    name: 'Invisibility',
                    image_url: './images/skills/aerotheurge/invisibility.png',
                },
                {
                    name: 'Summon Air Elemental',
                    image_url: './images/skills/aerotheurge/summon_air_elemental.png',
                },
                {
                    name: 'Tornado',
                    image_url: './images/skills/aerotheurge/tornado.png',
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Chain Lightning',
                    image_url: './images/skills/aerotheurge/chain_lightning.png',
                },
                {
                    name: 'Make Invisible',
                    image_url: './images/skills/aerotheurge/make_invisible.png',
                },
                {
                    name: 'Netherswap',
                    image_url: './images/skills/aerotheurge/netherswap.png',
                },
                {
                    name: 'Storm',
                    image_url: './images/skills/aerotheurge/storm.png',
                },
            ],
        },
    },
    {
        name: SKILLS.EXPERT_MARKSMAN,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Doctor',
                    image_url: './images/skills/expert_marksman/doctor.png',
                },
                {
                    name: 'First Aid',
                    image_url: './images/skills/expert_marksman/first_aid.png',
                },
                {
                    name: 'Ranged Precision Stance',
                    image_url: './images/skills/expert_marksman/ranged_precision_stance.png',
                },
                {
                    name: 'Ranged Power Stance',
                    image_url: './images/skills/expert_marksman/ranged_power_stance.png',
                },
                {
                    name: 'Ricochet',
                    image_url: './images/skills/expert_marksman/ricochet.png',
                },
                {
                    name: 'Treat Poisoning',
                    image_url: './images/skills/expert_marksman/treat_poisoning.png',
                },
                {
                    name: 'Splintered Arrow',
                    image_url: './images/skills/expert_marksman/splintered_arrow.png',
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Absorb the Elements',
                    image_url: './images/skills/expert_marksman/absorb_the_elements.png',
                },
                {
                    name: 'Barrage',
                    image_url: './images/skills/expert_marksman/barrage.png',
                },
                {
                    name: 'Farseer',
                    image_url: './images/skills/expert_marksman/farseer.png',
                },
                {
                    name: 'Infect',
                    image_url: './images/skills/expert_marksman/infect.png',
                },
                {
                    name: "Survivor's Karma",
                    image_url: './images/skills/expert_marksman/survivors_karma.png',
                },
                {
                    name: 'Vampiric Arrow',
                    image_url: './images/skills/expert_marksman/vampiric_arrow.png',
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Arrow Spray',
                    image_url: './images/skills/expert_marksman/arrow_spray.png',
                },
                {
                    name: 'Rain of Arrows',
                    image_url: './images/skills/expert_marksman/rain_of_arrows.png',
                },
                {
                    name: 'Shrapnel Shatter',
                    image_url: './images/skills/expert_marksman/shrapnel_shatter.png',
                },
            ]
        }
    },

    {
        name: SKILLS.GEOMANCER,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Avatar of Poison',
                    image_url: './images/skills/geomancer/avatar_of_poison.png'
                },
                {
                    name: 'Bless',
                    image_url: './images/skills/geomancer/bless.png'
                },
                {
                    name: 'Boulder Bash',
                    image_url: './images/skills/geomancer/boulder_bash.png'
                },
                {
                    name: 'Fortify',
                    image_url: './images/skills/geomancer/fortify.png'
                },
                {
                    name: 'Midnight Oil',
                    image_url: './images/skills/geomancer/midnight_oil.png'
                },
                {
                    name: 'Summon Spider',
                    image_url: './images/skills/geomancer/summon_spider.png'
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Blessed Earth',
                    image_url: './images/skills/geomancer/blessed_earth.jpg'
                },
                {
                    name: 'Earth Absorption Shield',
                    image_url: './images/skills/geomancer/earth_absorption_shield.png'
                },
                {
                    name: 'Magical Poison Dart',
                    image_url: './images/skills/geomancer/magical_poison_dart.png'
                },
                {
                    name: 'Petrifying Touch',
                    image_url: './images/skills/geomancer/petrifying_touch.png'
                },
                {
                    name: 'Tectonic Spray',
                    image_url: './images/skills/geomancer/tectonic_spray.png'
                },
                {
                    name: 'Summon Wolf',
                    image_url: './images/skills/geomancer/summon_wolf.png'
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Deadly Spores',
                    image_url: './images/skills/geomancer/deadly_spores.png'
                },
                {
                    name: 'Earthquake',
                    image_url: './images/skills/geomancer/earthquake.png'
                },
                {
                    name: 'Summon Earth Elemental',
                    image_url: './images/skills/geomancer/summon_earth_elemental.png'
                },
                {
                    name: 'Summon Poison Slug',
                    image_url: './images/skills/geomancer/summon_poison_slug.png'
                },
            ],
        }
    },

    {
        name: SKILLS.HYDROSOPHIST,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Avatar of Frost',
                    image_url: './images/skills/hydrosophist/avatar_of_frost.png'
                },
                {
                    name: 'Freezing Touch',
                    image_url: './images/skills/hydrosophist/freezing_touch.png'
                },
                {
                    name: 'Rain',
                    image_url: './images/skills/hydrosophist/rain.png'
                },
                {
                    name: 'Regeneration',
                    image_url: './images/skills/hydrosophist/regeneration.png'
                },
                {
                    name: 'Slow Current',
                    image_url: './images/skills/hydrosophist/slow_current.png'
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Cleansing Water',
                    image_url: './images/skills/hydrosophist/freezing_touch.png'
                },
                {
                    name: 'Ice Shard',
                    image_url: './images/skills/hydrosophist/ice_shard.png'
                },
                {
                    name: 'Ice Wall',
                    image_url: './images/skills/hydrosophist/ice_wall.png'
                },
                {
                    name: 'Mass Slow',
                    image_url: './images/skills/hydrosophist/mass_slow.png'
                },
                {
                    name: 'Summon Ice Elemental',
                    image_url: './images/skills/hydrosophist/summon_ice_elemental.png'
                },
                {
                    name: 'Water Absorption Shield',
                    image_url: './images/skills/hydrosophist/water_absorption_shield.png'
                },
                {
                    name: 'Water of Life',
                    image_url: './images/skills/hydrosophist/water_of_life.png'
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Hail Attack',
                    image_url: './images/skills/hydrosophist/hail_attack.png'
                },
                {
                    name: 'Mass Healing',
                    image_url: './images/skills/hydrosophist/mass_healing.png'
                },
                {
                    name: 'Mass Disease',
                    image_url: './images/skills/hydrosophist/mass_disease.png'
                },
                {
                    name: 'Winterblast',
                    image_url: './images/skills/hydrosophist/winterblast.png'
                },
            ],
        }
    },

    {
        name: SKILLS.MAN_AT_ARMS,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Battering Ram',
                    image_url: './images/skills/man_at_arms/battering_ram.png'
                },
                {
                    name: 'Crushing Fist',
                    image_url: './images/skills/man_at_arms/crushing_fist.png'
                },
                {
                    name: 'Cure Wounds',
                    image_url: './images/skills/man_at_arms/cure_wounds.png'
                },
                {
                    name: 'Divine Light',
                    image_url: './images/skills/man_at_arms/divine_light.png'
                },
                {
                    name: 'Encourage',
                    image_url: './images/skills/man_at_arms/encourage.png'
                },
                {
                    name: 'Helping Hand',
                    image_url: './images/skills/man_at_arms/helping_hand.png'
                },
                {
                    name: 'Melee Defensive Stance',
                    image_url: './images/skills/man_at_arms/melee_defensive_stance.png'
                },
                {
                    name: 'Melee Power Stance',
                    image_url: './images/skills/man_at_arms/melee_power_stance.png'
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Barbed Wire',
                    image_url: './images/skills/man_at_arms/barbed_wire.png'
                },
                {
                    name: 'Crippling Blow',
                    image_url: './images/skills/man_at_arms/crippling_blow.png'
                },
                {
                    name: 'Elemental Tortoise',
                    image_url: './images/skills/man_at_arms/elemental_tortoise.png'
                },
                {
                    name: 'Rage',
                    image_url: './images/skills/man_at_arms/rage.png'
                },
                {
                    name: 'Taunt',
                    image_url: './images/skills/man_at_arms/taunt.png'
                },
                {
                    name: 'Whirlwind',
                    image_url: './images/skills/man_at_arms/whirlwind.png'
                },
            ],
            [LEVELS.MASTER]: [
                {
                    name: 'Flurry',
                    image_url: './images/skills/man_at_arms/flurry.png'
                },
                {
                    name: 'Shackles of Pain',
                    image_url: './images/skills/man_at_arms/shackles_of_pain.png'
                },
            ],
        }
    },

    {
        name: SKILLS.PYROKINETIC,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Avatar of Fire',
                    image_url: './images/skills/pyrokinetic/avatar_of_fire.png'
                },
                {
                    name: 'Burn My Eyes',
                    image_url: './images/skills/pyrokinetic/burn_my_eyes.png'
                },
                {
                    name: 'Burning Touch',
                    image_url: './images/skills/pyrokinetic/burning_touch.png'
                },
                {
                    name: 'Flare',
                    image_url: './images/skills/pyrokinetic/flare.png'
                },
                {
                    name: 'Firefly',
                    image_url: './images/skills/pyrokinetic/firefly.png'
                },
                {
                    name: 'Self-Immolation',
                    image_url: './images/skills/pyrokinetic/self_immolation.png'
                },
                {
                    name: 'Wildfire',
                    image_url: './images/skills/pyrokinetic/wildfire.png'
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Explode',
                    image_url: './images/skills/pyrokinetic/explode.png'
                },
                {
                    name: 'Fire Absorption Shield',
                    image_url: './images/skills/pyrokinetic/fire_absorption_shield.png'
                },
                {
                    name: 'Fireball',
                    image_url: './images/skills/pyrokinetic/fireball.png'
                },
                {
                    name: 'Purifying Fire',
                    image_url: './images/skills/pyrokinetic/purifying_fire.png'
                },
                {
                    name: 'Smokescreen',
                    image_url: './images/skills/pyrokinetic/smokescreen.png'
                },
                {
                    name: 'Summon Fire Elemental',
                    image_url: './images/skills/pyrokinetic/summon_fire_elemental.png'
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Immolation',
                    image_url: './images/skills/pyrokinetic/immolation.png'
                },
                {
                    name: 'Infectious Flame',
                    image_url: './images/skills/pyrokinetic/infectious_flame.png'
                },
                {
                    name: 'Meteor Shower',
                    image_url: './images/skills/pyrokinetic/meteor_shower.png'
                },
            ],
        }
    },

    {
        name: SKILLS.SCOUNDREL,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Adrenaline',
                    image_url: './images/skills/scoundrel/adrenaline.png'
                },
                {
                    name: 'Fast Track',
                    image_url: './images/skills/scoundrel/fast_track.png'
                },
                {
                    name: 'Lacerate',
                    image_url: './images/skills/scoundrel/lacerate.png'
                },
                {
                    name: 'Precise Incision',
                    image_url: './images/skills/scoundrel/precise_incision.png'
                },
                {
                    name: 'Trip',
                    image_url: './images/skills/scoundrel/trip.png'
                },
                {
                    name: 'Venomous Strike',
                    image_url: './images/skills/scoundrel/venomous_strike.png'
                },
                {
                    name: 'Winged Feet',
                    image_url: './images/skills/scoundrel/winged_feet.png'
                },
                {
                    name: 'Walk in Shadows',
                    image_url: './images/skills/scoundrel/walk_in_shadows.png'
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Become Air',
                    image_url: './images/skills/scoundrel/become_air.png'
                },
                {
                    name: 'Cloak and Dagger',
                    image_url: './images/skills/scoundrel/cloak_and_dagger.png'
                },
                {
                    name: 'Daggers Drawn',
                    image_url: './images/skills/scoundrel/daggers_drawn.png'
                },
                {
                    name: 'Eye Gouge',
                    image_url: './images/skills/scoundrel/eye_gouge.png'
                },
                {
                    name: 'Wind-up Toy',
                    image_url: './images/skills/scoundrel/wind_up_toy.png'
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Coup de Grace',
                    image_url: './images/skills/scoundrel/coup_de_grace.png'
                },
                {
                    name: 'Crawling Infestation',
                    image_url: './images/skills/scoundrel/crawling_infestation.png'
                },
                {
                    name: 'Shadow Step',
                    image_url: './images/skills/scoundrel/shadow_step.png'
                },
            ],
        }
    },

    {
        name: SKILLS.WITCHCRAFT,
        spells: {
            [LEVELS.NOVICE]: [
                {
                    name: 'Decaying Touch',
                    image_url: './images/skills/witchcraft/decaying_touch.png'
                },
                {
                    name: 'Lower Resistances',
                    image_url: './images/skills/witchcraft/lower_resistances.png'
                },
                {
                    name: 'Malediction',
                    image_url: './images/skills/witchcraft/malediction.png'
                },
                {
                    name: 'Oath of Desecration',
                    image_url: './images/skills/witchcraft/oath_of_desecration.png'
                },
                {
                    name: 'Summon Undead Warrior',
                    image_url: './images/skills/witchcraft/summon_undead_warrior.png'
                },
                {
                    name: 'Vampiric Touch',
                    image_url: './images/skills/witchcraft/vampiric_touch.png'
                },
            ],

            [LEVELS.ADEPT]: [
                {
                    name: 'Destroy Summon',
                    image_url: './images/skills/witchcraft/destroy_summon.png'
                },
                {
                    name: 'Drain Willpower',
                    image_url: './images/skills/witchcraft/drain_willpower.png'
                },
                {
                    name: 'Mute',
                    image_url: './images/skills/witchcraft/mute.png'
                },
                {
                    name: 'Rapture',
                    image_url: './images/skills/witchcraft/rapture.png'
                },
                {
                    name: 'Summon Armoured Undead Decapitator',
                    image_url: './images/skills/witchcraft/summon_armoured_undead_decapitator.png'
                },
            ],

            [LEVELS.MASTER]: [
                {
                    name: 'Death Punch',
                    image_url: './images/skills/witchcraft/death_punch.png'
                },
                {
                    name: 'Invulnerability',
                    image_url: './images/skills/witchcraft/invulnerability.png'
                },
                {
                    name: 'Horrific Scream',
                    image_url: './images/skills/witchcraft/horrific_scream.png'
                },
                {
                    name: 'Resurrect',
                    image_url: './images/skills/witchcraft/resurrect.png'
                },
                {
                    name: 'Soulsap',
                    image_url: './images/skills/witchcraft/soulsap.png'
                },
            ],
        }
    },
]

const SkillsModel = {
    name: 'Skills',
    skills: skills.map(skill => ({ ...defaultSkill, ...skill })),
    spellBehavior: {
        toggleSelected: (spell) => ({ ...spell, selected: !spell.selected }),
        select: (spell) => ({ ...spell, selected: true }),
        deselect: (spell) => ({ ...spell, selected: false }),
        disabled: (spell) => ({ ...spell, selected: false, disabled: true }),
        reset: (spell) => ({ ...spell, selected: false, disabled: false })
    },
};

export default SkillsModel;
export { LEVELS, SKILLS, levelStates, initialSkillsState };
