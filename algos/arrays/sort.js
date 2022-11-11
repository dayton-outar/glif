const list = [
    {
        no: 1,
        name: 'Daemon',
        dob: new Date(90, 4, 24)
    },
    {
        no: 2,
        name: 'Aaron',
        dob: new Date(79, 3, 3)
    },
    {
        no: 5,
        name: 'Rhaenys',
        dob: new Date(56, 7, 8)
    },
    {
        no: 3,
        name: 'Otto',
        dob: new Date(40, 8, 8)
    },
    {
        no: 4,
        name: 'Barbarosa',
        dob: new Date(2001, 5, 8)
    }
];

list.forEach((value) => {
    console.log(`${value.no}. ${value.name} \t\t ${value.dob.toDateString()}`);
});

console.log();
console.log('Sorting by identifier [no] in ascending order ...');
console.log();

list.sort((a, b) => a.no - b.no);

list.forEach((value) => {
    console.log(`${value.no}. ${value.name} \t\t ${value.dob.toDateString()}`);
});

console.log();
console.log('Reverse the order of [no] in descending order ...');
console.log();

list.sort((a, b) => b.no - a.no);

list.forEach((value) => {
    console.log(`${value.no}. ${value.name} \t\t ${value.dob.toDateString()}`);
});

console.log();
console.log('Sorting by length of string ...');
console.log();

list.sort((a, b) => a.name.length - b.name.length);

list.forEach((value) => {
    console.log(`${value.no}. ${value.name} \t\t ${value.dob.toDateString()}`);
});

console.log();
console.log('Sorting by alphabetic order ...');
console.log();

list.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
});

list.forEach((value) => {
    console.log(`${value.no}. ${value.name} \t\t ${value.dob.toDateString()}`);
});

console.log();
console.log('Sorting by date of birth ...');
console.log();

list.sort((a, b) => {
    if (a.dob < b.dob) {
        return -1;
    }

    if (a.dob > b.dob) {
        return 1;
    }

    return 0;
});

list.forEach((value) => {
    console.log(`${value.no}. ${value.name} \t\t ${value.dob.toDateString()}`);
});