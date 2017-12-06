const readline = require('readline');
const fs = require('fs');
const functions = require('./functions');

function main() {
  const familyTree = JSON.parse(fs.readFileSync('family_tree.json', 'utf8'));
  const prompts = readline.createInterface(process.stdin, process.stdout);
  prompts.question('Give person\'s full name: ', (name) => {
    const [firstName, lastName] = name.split(' ');
    const relatives = functions.getRelatives(familyTree, firstName, lastName);
    if (!relatives) {
      console.log('Person not found');
      process.exit();
    } else {
      console.log(`\nFather: ${relatives.father ? `${relatives.father.firstName} ${relatives.father.lastName}` : 'unknown'}`);
      console.log(`Mother: ${relatives.mother ? `${relatives.mother.firstName} ${relatives.mother.lastName}` : 'unknown'}`);
      console.log(`Father's father: ${relatives.fathersFather ?
        `${relatives.fathersFather.firstName} ${relatives.fathersFather.lastName}` : 'unknown'}`);
      console.log(`Father's mother: ${relatives.fathersMother ?
        `${relatives.fathersMother.firstName} ${relatives.fathersMother.lastName}` : 'unknown'}`);
      console.log(`Mother's father: ${relatives.mothersFather ?
        `${relatives.mothersFather.firstName} ${relatives.mothersFather.lastName}` : 'unknown'}`);
      console.log(`Mother's mother: ${relatives.mothersMother ?
        `${relatives.mothersMother.firstName} ${relatives.mothersMother.lastName}` : 'unknown'}`);
    }
    if (relatives.siblings.length) {
      console.log('\nSiblings:');
      relatives.siblings.forEach((person) => {
        console.log(`${person.firstName} ${person.lastName}`);
      });
    }
    process.exit();
  });
}

if (require.main === module) {
  main();
}
