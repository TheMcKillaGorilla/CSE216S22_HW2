import BinarySearchTree from "./BinarySearchTree.js";
import { Person, Employee, Student } from "./People.js";

const NUM_BINS = 5;
const KEY_LENGTH = 8;

function printBST(header, tree) {
    let text = tree.toString() + "\n";
    console.log(header + "\n" + text);
    let outputDisplay = document.getElementById("output-display");
    text = text.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');
    text = text.replaceAll(" ", '&nbsp;');
    outputDisplay.innerHTML += text;
}

function addPersonToBST(person, tree) {
    tree.putValue(person.key, person);
    printBST("Current Binary Search Tree:", tree);
}

let tree = new BinarySearchTree(KEY_LENGTH);

// DEMONSTRATE ADDING VALUES TO THE BST, WHICH INCLUDES THE NEED TO MAKE THE BST BIGGER
addPersonToBST(new Student(tree.generateKey(), "Harvard", "Crimson", 4.0), tree);
addPersonToBST(new Employee(tree.generateKey(), "Yale", "Law", 80000), tree);
addPersonToBST(new Employee(tree.generateKey(), "Jake", "Peralta", 40000), tree);
addPersonToBST(new Person(tree.generateKey(), "Amy", "Santiago"), tree);
addPersonToBST(new Student(tree.generateKey(), "Micheal", "Scott", 3.5), tree);
addPersonToBST(new Student(tree.generateKey(), "Steve", "Harvey", 3.6), tree);
addPersonToBST(new Person(tree.generateKey(), "Rock", "Dwayne"), tree);

// DEMONSTRATE MAKING KEYS AND ADDING VALUES TO THE BST    
let jlKey = tree.generateKey();
tree.putValue(jlKey, new Student(jlKey, "Tony", "Stark", 3.8));
let cwKey = tree.generateKey();
tree.putValue(cwKey, new Student(cwKey, "Steve", "Rogers", 9.1));
let dgKey = tree.generateKey();
tree.putValue(dgKey, new Employee(dgKey, "David", "Gilmour", 120000));
printBST("\nAfter Changing 3 Items", tree);

// DEMONSTRATE GETTING VALUES FROM THE HASH TABLE
let p = tree.getValue(jlKey);
console.log("\nget " + jlKey + ": " + p.toString() + "\n");
p = tree.getValue(cwKey);
console.log("\nget " + cwKey + ": " + p.toString() + "\n");
p = tree.getValue(dgKey);
console.log("\nget " + dgKey + ": " + p.toString() + "\n");

// NOW LET'S TRY REPLACING THE DATA IN THE ABOVE THREE
tree.putValue(jlKey, new Student(jlKey, "Captian " , "Marvel", 3.5));
tree.putValue(cwKey, new Student(cwKey, "Wanda", "Maximoff", 3.89));
tree.putValue(dgKey, new Student(dgKey, "War", "Machine", 3.4));
printBST("\nAfter Changing 3 Items", tree);

// AND DEMONSTRATE REMOVING ITEMS FROM THE BST
tree.removeValue(jlKey);
printBST("\nAfter Removing Captian Marvel", tree);

tree.removeValue(cwKey);
printBST("\nAfter Removing Wanda Maximoff", tree);

tree.removeValue(dgKey);
printBST("\nAfter Removing War Machine", tree);
