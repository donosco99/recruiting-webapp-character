import { createSlice } from '@reduxjs/toolkit';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts.js';
import { current } from '@reduxjs/toolkit'


const initAttr = ATTRIBUTE_LIST.reduce((attrDict, attribute)=>{
    attrDict[attribute.toLowerCase()] = 10;
    return attrDict;
}, {});

const initSkills = SKILL_LIST.reduce((skillDict, skillElem)=>{
    skillDict[skillElem.name.toLowerCase()] = {
        value: 0,
        modifier:0,
        modifierName:skillElem.attributeModifier.toLowerCase()
    }
    return skillDict;
}, {});


const initClasses = Object.keys(CLASS_LIST).reduce((classDict, className) => {
    classDict[className] = {
        showDetails: false,
        doesMeetRequirements: false
    };
    return classDict;
  }, {});
  
const initialState = {
  'character-1': {
    attributes: initAttr,
    skills: initSkills,
    totalSkillBudget: 10,
    classes: initClasses
  }
};

const calculateModifier = (attributeValue) => Math.floor((attributeValue - 10) / 2);
const calculateTotalAttributes = (attributes) => {
    return Object.values(attributes).reduce((total, value) => total + value, 0);
  };

const calculateTotalSpentSkills = (skills) => {
    return Object.values(skills).reduce((total, value) => total + value.value, 0);
}

const getClassesMeetingRequirement = (attributes) => {
   
    return Object.keys(CLASS_LIST).filter((key) => {
        const classReq = CLASS_LIST[key];
        return Object.keys(classReq).every((attribute) => {
            return attributes[attribute.toLowerCase()] >= classReq[attribute];
        });
    });
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    adjustAttribute(state, action) {
        const { attribute, change, characterId } = action.payload;
        const totalAttributes = calculateTotalAttributes(state[characterId].attributes);

        if (change === 1 && totalAttributes >= 70) {
            alert('The total sum of all attributes cannot exceed 70.');
            return;
        }
        state[characterId].attributes[attribute] += change;

        const modifierVal = calculateModifier(state[characterId].attributes[attribute]);
        Object.keys(state[characterId].skills).forEach((skill) => {
            if (state[characterId].skills[skill].modifierName === attribute) {
                state[characterId].skills[skill].modifier = modifierVal;
            }
        });
        if (attribute === 'intelligence') {
            state[characterId].totalSkillBudget = Math.max(10 + 4 * modifierVal, 0);
        }

        Object.keys(state[characterId].classes).forEach((className) => {
            state[characterId].classes[className].doesMeetRequirements = false;
        });
        getClassesMeetingRequirement(state[characterId].attributes).forEach((className) => {
            state[characterId].classes[className].doesMeetRequirements = true;
        });

        console.log(current(state))
    },
    incrementSpentSkill(state, action) {
        const { skill, characterId } = action.payload;

        const spentSkills = calculateTotalSpentSkills(state[characterId].skills);
        if (spentSkills < state[characterId].totalSkillBudget) {
            state[characterId].skills[skill].value += 1;
        } else {
            alert('Cannot spend more than Budget.');
        }
    },
    decrementSpentSkill(state, action) {
        const { skill, characterId } = action.payload;

        if (state[characterId].skills[skill].value > 0) {
            state[characterId].skills[skill].value -= 1;
        }
    },
    resetState(state, action) {
        return initialState;
    },
    addCharacter(state) {
        const newCharacterId = `character-${Object.keys(state).length + 1}`;
        state[newCharacterId] = {
          attributes: { ...initAttr },
          skills: { ...initSkills },
          totalSkillBudget: 10,
          classes: { ...initClasses },
          skillCheck: { selectedSkill: '', dc: '', rollResult: null, checkResult: null }
        };
    }  ,
    setInitialState(state, action) {
        console.log("In setInitialState");
        console.log(action.payload)
        return action.payload;
    }
  }
});

export const { adjustAttribute , incrementSpentSkill, decrementSpentSkill, resetState, addCharacter, setInitialState} = characterSlice.actions;
export default characterSlice.reducer;
