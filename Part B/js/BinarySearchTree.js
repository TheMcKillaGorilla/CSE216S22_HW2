class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
    // modified version of constructor
    constructor(initKey, initData) {
        this.key = initKey;
        this.data = initData;
        this.left = null;
        this.right = null;
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
        tempNode = new Node(key, value);
        if (this.root === null){
            this.root = tempNode;
            console.log(key + ": " + value.toString() + " has been made root since tree is empty");
            size++;
        }
        else{
            putValueHelper(this.root, tempNode, key);
            size++;
        }
    }
    putValueHelper(root, nodeToInsert, key){
        if (key === root.key){
            console.log(root.key + ": " + root.data.toString( ) + " has been replaced with " + key + ": " + nodeToInsert.data.toString());
            root.data = nodeToInsert.data;
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}