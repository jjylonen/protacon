
const onClick = (person) => {
  const title = document.getElementsByClassName('nine columns ptc-right')[0].firstElementChild;
  title.textContent = `${person.firstName} ${person.lastName}, Sukupuu`;

  const tree = document.getElementsByClassName('ptc-family-tree')[0].firstElementChild;
  tree.innerHTML = '';

  const relatives = getRelatives(familyTree, person.firstName, person.lastName);
  for (let i = 0; i < relatives.siblings.length + 1; i++) {
    const personElement = document.createElement('li');
    if (i === 0) {
      personElement.innerHTML = `<a href="#">${person.firstName}<br>${person.lastName}</a>`;
      personElement.addEventListener('click', () => onClick(person));
      const parentElement = document.createElement('ul');
      if (relatives.father) {
        const fatherElement = document.createElement('li');
        fatherElement.innerHTML = `<a href="#">${relatives.father.firstName}<br>${relatives.father.lastName}</a>`;
        fatherElement.addEventListener('click', (event) => {
          event.stopPropagation();
          onClick(relatives.father);
        });
        const fathersParentElement = document.createElement('ul');
        if (relatives.fathersFather) {
          const fathersFatherElement = document.createElement('li');
          fathersFatherElement.innerHTML = `<a href="#">${relatives.fathersFather.firstName}<br>${relatives.fathersFather.lastName}</a>`;
          fathersFatherElement.addEventListener('click', (event) => {
            event.stopPropagation();
            onClick(relatives.fathersFather);
          });
          fathersParentElement.appendChild(fathersFatherElement);
        }
        if (relatives.fathersMother) {
          const fathersMotherElement = document.createElement('li');
          fathersMotherElement.innerHTML = `<a href="#">${relatives.fathersMother.firstName}<br>${relatives.fathersMother.lastName}</a>`;
          fathersMotherElement.addEventListener('click', (event) => {
            event.stopPropagation();
            onClick(relatives.fathersMother);
          });
          fathersParentElement.appendChild(fathersMotherElement);
        }
        fatherElement.appendChild(fathersParentElement);
        parentElement.appendChild(fatherElement);
      }
      if (relatives.mother) {
        const motherElement = document.createElement('li');
        motherElement.innerHTML = `<a href="#">${relatives.mother.firstName}<br>${relatives.mother.lastName}</a>`;
        motherElement.addEventListener('click', (event) => {
          event.stopPropagation();
          onClick(relatives.mother);
        });
        const mothersParentElement = document.createElement('ul');
        if (relatives.mothersFather) {
          const mothersFatherElement = document.createElement('li');
          mothersFatherElement.innerHTML = `<a href="#">${relatives.mothersFather.firstName}<br>${relatives.mothersFather.lastName}</a>`;
          mothersFatherElement.addEventListener('click', (event) => {
            event.stopPropagation();
            onClick(relatives.mothersFather);
          });
          mothersParentElement.appendChild(mothersFatherElement);
        }
        if (relatives.mothersMother) {
          const mothersMotherElement = document.createElement('li');
          mothersMotherElement.innerHTML = `<a href="#">${relatives.mothersMother.firstName}<br>${relatives.mothersMother.lastName}</a>`;
          mothersMotherElement.addEventListener('click', (event) => {
            event.stopPropagation();
            onClick(relatives.mothersMother);
          });
          mothersParentElement.appendChild(mothersMotherElement);
        }
        motherElement.appendChild(mothersParentElement);
        parentElement.appendChild(motherElement);
      }
      personElement.appendChild(parentElement);
    } else {
      personElement.innerHTML = `<a href="#">${relatives.siblings[i - 1].firstName}<br>${relatives.siblings[i - 1].lastName}</a>`;
      personElement.addEventListener('click', () => onClick(relatives.siblings[i - 1]));
    }
    tree.appendChild(personElement);
  }
};

window.addEventListener('load', () => {
  const list = document.getElementsByClassName('scroll')[0];
  familyTree.forEach((person, index) => {
    const element = document.createElement('div');
    element.id = `person${index + 1}`;
    element.textContent = `${person.firstName} ${person.lastName}`;
    element.addEventListener('click', () => onClick(person));
    list.appendChild(element);
  });
});
