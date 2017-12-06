const getRelatives = (familyTree, firstName, lastName) => {
  const relatives = {};

  for (let i = 0; i < familyTree.length; i++) {
    if (familyTree[i].firstName === firstName && familyTree[i].lastName === lastName) {
      const fatherId = familyTree[i].father;
      const motherId = familyTree[i].mother;

      relatives.father = fatherId ? { firstName: familyTree[fatherId - 1].firstName, lastName: familyTree[fatherId - 1].lastName } : null;
      relatives.mother = motherId ? { firstName: familyTree[motherId - 1].firstName, lastName: familyTree[motherId - 1].lastName } : null;

      const fathersFatherId = fatherId ? familyTree[fatherId - 1].father : null;
      const fathersMotherId = fatherId ? familyTree[fatherId - 1].mother : null;
      const mothersFatherId = motherId ? familyTree[motherId - 1].father : null;
      const mothersMotherId = motherId ? familyTree[motherId - 1].mother : null;

      relatives.fathersFather = fathersMotherId ?
        { firstName: familyTree[fathersFatherId - 1].firstName, lastName: familyTree[fathersFatherId - 1].lastName } : null;
      relatives.fathersMother = fathersFatherId ?
        { firstName: familyTree[fathersMotherId - 1].firstName, lastName: familyTree[fathersMotherId - 1].lastName } : null;
      relatives.mothersFather = mothersFatherId ?
        { firstName: familyTree[mothersFatherId - 1].firstName, lastName: familyTree[mothersFatherId - 1].lastName } : null;
      relatives.mothersMother = mothersMotherId ?
        { firstName: familyTree[mothersMotherId - 1].firstName, lastName: familyTree[mothersMotherId - 1].lastName } : null;

      relatives.siblings = [];
      // Father and/or mother unknown, one cannot know, is there full siblings
      // (half siblings are not siblings in this program)
      if (!fatherId && !motherId) {
        return relatives;
      }

      familyTree.forEach((person) => {
        if (person !== familyTree[i] && person.father === fatherId && person.mother === motherId) {
          relatives.siblings.push({ firstName: person.firstName, lastName: person.lastName });
        }
      });
      return relatives;
    }
  }
  return null;
};
module.exports.getRelatives = getRelatives;

