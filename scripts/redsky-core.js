Hooks.once('init', () => {
    //override _prepareArmorClass while calling original
    //(function() {
    //    console.log("overriding prepareArmorClass")
    //    var proxied = dnd5e.documents.Actor5e._prepareArmorClass;
    //    dnd5e.documents.Actor5e._prepareArmorClass = function () {
    //        console.log("Redsky | AC override");
    //        proxied();
    //    };
    //})();

    //Arcana removed; Medicine is int; Eldertech, Materials, and Politics added
    CONFIG.DND5E.skills = {
        acr: { label: "DND5E.SkillAcr", ability: "dex" },
        ani: { label: "DND5E.SkillAni", ability: "wis" },
        ath: { label: "DND5E.SkillAth", ability: "str" },
        dec: { label: "DND5E.SkillDec", ability: "cha" },
        his: { label: "DND5E.SkillHis", ability: "int" },
        ins: { label: "DND5E.SkillIns", ability: "wis" },
        itm: { label: "DND5E.SkillItm", ability: "cha" },
        inv: { label: "DND5E.SkillInv", ability: "int" },
        med: { label: "DND5E.SkillMed", ability: "int" },
        nat: { label: "DND5E.SkillNat", ability: "int" },
        prc: { label: "DND5E.SkillPrc", ability: "wis" },
        prf: { label: "DND5E.SkillPrf", ability: "cha" },
        per: { label: "DND5E.SkillPer", ability: "cha" },
        rel: { label: "DND5E.SkillRel", ability: "int" },
        slt: { label: "DND5E.SkillSlt", ability: "dex" },
        ste: { label: "DND5E.SkillSte", ability: "dex" },
        sur: { label: "DND5E.SkillSur", ability: "wis" },
        eld: { label: "REDSKY.SkillEld", ability: "int" },
        mat: { label: "REDSKY.SkillMat", ability: "int" },
        pol: { label: "REDSKY.SkillPol", ability: "int" },
    };
    dnd5e.utils.preLocalize("skills", { key: "label", sort: true });

    //Remove radiant damage
    CONFIG.DND5E.damageTypes = {
        ...CONFIG.DND5E.physicalDamageTypes,
        acid: "DND5E.DamageAcid",
        cold: "DND5E.DamageCold",
        fire: "DND5E.DamageFire",
        force: "DND5E.DamageForce",
        lightning: "DND5E.DamageLightning",
        necrotic: "DND5E.DamageNecrotic",
        poison: "DND5E.DamagePoison",
        psychic: "DND5E.DamagePsychic",
        thunder: "DND5E.DamageThunder"
    };
    dnd5e.utils.preLocalize("damageTypes", { sort: true });

    //Remove truesight, add Low Light Vision
    CONFIG.DND5E.senses = {
        blindsight: "DND5E.SenseBlindsight",
        darkvision: "DND5E.SenseDarkvision",
        tremorsense: "DND5E.SenseTremorsense",
        lowlight: "REDSKY.SenseLowLightVision"
    };
    dnd5e.utils.preLocalize("senses", { sort: true });

    //Add Touch AC, remove others
    CONFIG.DND5E.armorClasses = {
        flat: {
          label: "DND5E.ArmorClassFlat",
          formula: "@attributes.ac.flat"
        },
        natural: {
          label: "DND5E.ArmorClassNatural",
          formula: "@attributes.ac.flat"
        },
        default: {
          label: "DND5E.ArmorClassEquipment",
          formula: "@attributes.ac.armor + @attributes.ac.dex"
        },
        touch: {
          label: "REDSKY.ArmorClassTouch",
          formula: "10 + @attributes.ac.dex + @attributes.ac.shield"
        },
        custom: {
          label: "DND5E.ArmorClassCustom"
        }
    };
    dnd5e.utils.preLocalize("armorClasses", { key: "label" });

    CONFIG.Actor.documentClass = ActorRedsky;

    Actors.registerSheet("dnd5e", ActorSheetRedskyCharacter, {
        types: ["character"],
        makeDefault: true,
        label: "REDSKY.SheetClassCharacter"
      });
});

class ActorRedsky extends dnd5e.documents.Actor5e {
    _prepareArmorClass() {
        super._prepareArmorClass();
        const ac = this.system.attributes.ac;
        ac.touch = 10 + ac.shield + ac.bonus + ac.cover;
    }
}

class ActorSheetRedskyCharacter extends dnd5e.applications.actor.ActorSheet5eCharacter {
    get template() {;
        return './modules/redsky-5e/templates/redsky-character-sheet.hbs';
      }
    
}


