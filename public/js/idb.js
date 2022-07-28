// varible to hold db connection
let db;

// establish connection to IndexedDB database called 'budget' and set to version 1
const request = indexedDB.open('budget', 1);

// event will occur if database version changes
request.onupgradeneeded = function (event) {
  // save a reference to the database 
  const db = event.target.result;
  // create an object store (table) called `new_budget`, set it to have an auto incrementing primary key of sorts 
  db.createObjectStore('new_budget', { autoIncrement: true });
};

// event runs when connection to the database is finalize
request.onsuccess = function (event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadBudget() function to send all local db data to api
  if (navigator.onLine) {
    // uploadBudget();
  }
}

request.onerror = function(event) {
  console.log(event.target.errorCode);
};


// saves the record when a new budget is submitted and there is no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions 
  const transaction = db.transaction(['new_budget'], 'readwrite');
  // access the object store for 'new budget'
  const budgetObjectStore = transaction.objectStore('new_budget');
  // add record to your store
  budgetObjectStore.add(record)
}