class Node {
    // modified version of constructor
    constructor(initKey, initData) {
        this.key = initKey;
        this.data = initData;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    // set the parent of the node
    setParent(initParent) {
        this.parent = initParent;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        let tempNode = new Node(key, value);
        if (this.root === null) {
            this.root = tempNode;
            console.log(key + ": " + value.toString() + " has been made root since tree is empty");
            this.size++;
        }
        else {
            this.putValueHelper(this.root, tempNode, key);
            this.size++;
        }
    }
    putValueHelper(root, nodeToInsert, key) {
        if (key === root.key) {
            console.log(root.data.toString() + " has been replaced with " + nodeToInsert.data.toString());
            root.data = nodeToInsert.data;
        }
        else if (key < root.key && root.left === null) {
            nodeToInsert.setParent(root);
            console.log(nodeToInsert.key + ": " + nodeToInsert.data.toString() + " has been added and " + nodeToInsert.parent.data.toString() + " is the parent");
            root.left = nodeToInsert;
        }
        else if (key > root.key && root.right === null) {
            nodeToInsert.setParent(root);
            console.log(nodeToInsert.key + ": " + nodeToInsert.data.toString() + " has been added and " + nodeToInsert.parent.data.toString() + " is the parent");
            root.right = nodeToInsert;
        }
        else if (key < root.key) {
            this.putValueHelper(root.left, nodeToInsert, key);
        }
        else if (key > root.key) {
            this.putValueHelper(root.right, nodeToInsert, key);
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        return this.getValueHelper(this.root, key);
    }
    getValueHelper(root, key) {
        if (root == null) {
            console.log(root.data.toString() + " does not exist in tree ");
            return null;
        }
        else if (root.key == key) {
            console.log(root.key + " " + root.data.toString() + " has been found ");
            return root.data;
        }
        else if (key < root.key) {
            return this.getValueHelper(root.left, key);
        }
        else if (key > root.key) {
            return this.getValueHelper(root.right, key);
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        if (this.root.key === key && this.root.right === null && this.root.left === null){
            console.log(key + ": " + this.root.data.toString() + " is the last node in the tree and deleted");
            this.root = null;
        }
        else if (this.root.key === key && this.root.left === null){
            console.log(key + ": " + this.root.data.toString() + " and right root is promoted");
            this.root = this.root.right;
        }
        else if (this.root.key === key && this.root.right === null){
            console.log(key + ": " + this.root.data.toString() + " and left root is promoted");
            this.root = this.root.left;
        }
        else if (this.root.key === key && this.root.right === null && this.root.left === null){
            console.log(key + ": " + this.root.data.toString() + " is the last node in the tree and deleted");
            this.root = null;
        }
        else if (this.root.key === key && this.root.right != null && this.root.left != null){
            let childToReplace = this.replacerHelper(this.root.right);
            this.root.data = childToReplace.data;
            this.root.key = childToReplace.key;
            this.root.right = this.removeValueHelper(this.root.right, childToReplace.key);
        }
        else{
            this.removeValueHelper(this.root, key);
        }
    }

    // set promoted nodes left and right to roots left and right
    removeValueHelper(root, key) {
        if (root === null) {
            console.log(root.key + ": " + root.data.toString() + " to remove does not exist in tree ");
            return null;
        }
        else if (key < root.key) {
            root.left = this.removeValueHelper(root.left, key);
        }
        else if (key > root.key) {
            root.right = this.removeValueHelper(root.right, key);
        }
        else {
            if (root.left === null && root.right === null) {
                return null;
            }
            else if (root.right === null) {
                return root.left;
            }
            else if (root.left === null) {
                return root.right;
            }
            let childToReplace = this.replacerHelper(root.right);
            root.data = childToReplace.data;
            root.key = childToReplace.key;
            root.right = this.removeValueHelper(root.right, childToReplace.key);
        }
        return root;
    }
        
    replacerHelper(root) {
        let temp = root;
        while (temp && temp.left != null) {
            temp = temp.left;
        }
        return temp;
    }

    toStringRecursively(traveller, level) {
    let text = "";
    if (traveller.left != null)
        text += this.toStringRecursively(traveller.left, level + 1);
    for (let i = 0; i < level; i++) {
        text += "   ";
    }
    text += "   " + traveller.data.toString() + "\n";
    if (traveller.right != null)
        text += this.toStringRecursively(traveller.right, level + 1);
    return text;
    }

    toString() {
        if (this.root === null){
            return "There is no tree to print";
        }
        else{
            return this.toStringRecursively(this.root, 0);
        }
    }
};