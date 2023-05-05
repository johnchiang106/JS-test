// JS Test

// Assuming we have an array of factories

const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
];

// 1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
function countEmployeesByFactory(factories) {
      let results = [];
      for (let i = 0; i < factories.length; i++) {
            let factory = factories[i];
            let count = factory.employees.length;
            results.push({ name: factory.name, count: count });
      }
      return results;
}
// console.log(countEmployeesByFactory(factories));

// 2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
function countFactoriesByEmployee(factories) {
      let results = {};
      for (let i = 0; i < factories.length; i++) {
            let factory = factories[i];
            for (let j = 0; j < factory.employees.length; j++) {
                  let employee = factory.employees[j];
                  if (results[employee]) {
                        ++results[employee];
                  } else {
                        results[employee] = 1;
                  }
            }
      }
      let output = [];
      for (let employee in results) {
            output.push({ employee: employee, count: results[employee] });
      }
      return output;
}
// console.log(countFactoriesByEmployee(factories));

// 3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
function listEmployeesByFactory(factories) {
      let results = [];
      for (let i = 0; i < factories.length; i++) {
            let sortedEmployees = factories[i].employees.sort();
            results.push({ name: factories[i].name, employees: sortedEmployees });
      }
      return results;
}
// console.log(listEmployeesByFactory(factories));


// Assuming we have these different arrays

const employeeType = [
      {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
      {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
      {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
        {id: 1, name: "Alice", type: 2},
        {id: 2, name: "Bob", type: 3},
        {id: 3, name: "John", type: 2},
        {id: 4, name: "Karen", type: 1},
        {id: 5, name: "Miles", type: 3},
        {id: 6, name: "Henry", type: 1}
];

const tasks = [
      {id: 1, title: "task01", duration: 60}, //min
      {id: 2, title: "task02", duration: 120},
      {id: 3, title: "task03", duration: 180},
      {id: 4, title: "task04", duration: 360},
      {id: 5, title: "task05", duration: 30},
      {id: 6, title: "task06", duration: 220},
      {id: 7, title: "task07", duration: 640},
      {id: 8, title: "task08", duration: 250},
      {id: 9, title: "task09", duration: 119},
      {id: 10, title: "task10", duration: 560},
      {id: 11, title: "task11", duration: 340},
      {id: 12, title: "task12", duration: 45},
      {id: 13, title: "task13", duration: 86},
      {id: 14, title: "task14", duration: 480},
      {id: 15, title: "task15", duration: 900}
];


// 4. Count total hours worked in 1 day ? // => 39
function calculateTotalWorkHours() {
      let workingHours = {};
      for (const type of employeeType) {
            const begin = new Date(`2023-05-05 ${type.work_begin}`).getTime();
            let end = new Date(`2023-05-05 ${type.work_end}`).getTime();
            if (end <= begin) {
                  end += 86400000;
            }
            const diff = (end - begin) / (3600000);
            workingHours[type.id] = diff;
      }
      // console.log(workingHours);

      let totalWorkHours = 0;
      employees.forEach(employee => {
            totalWorkHours += workingHours[employee.type];
      });
    
      return totalWorkHours;
}
// console.log(calculateTotalWorkHours());
// Not sure why the answer of this is 39. My answer is 42.

// 5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
function howManyEmployeeByTime(dayTime) {
      let typeCount = {};
      for (let i = 0; i < employees.length; i++) {
            let eType = employees[i].type;
            if (typeCount[eType]) {
                  ++typeCount[eType];
            } else {
                  typeCount[eType] = 1;
            }
      }

      let totalEmployees = 0;
      for (let i = 0; i < employeeType.length; i++) {
            let eType = employeeType[i].id;
            const begin = new Date(`2023-05-05 ${employeeType[i].work_begin}`).getTime();
            let end = new Date(`2023-05-05 ${employeeType[i].work_end}`).getTime();
            const time = new Date(`2023-05-05 ${dayTime}`).getTime();
            
            if (end <= begin) {
                  end += 86400000;
            }
            
            if (begin <= time && time <= end) {
                  totalEmployees += typeCount[eType] || 0;
            }
      }
      return totalEmployees;
}
// console.log(howManyEmployeeByTime("20:00:00"));

// 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
function daysNeeded() {
      let totalTime = tasks.reduce((acc, task) => acc + task.duration, 0);
      console.log(totalTime);
      let days = Math.ceil(totalTime / (calculateTotalWorkHours() * 60));
      return days;
}
// console.log(daysNeeded());
// Assuming the tasks are for all employees.
