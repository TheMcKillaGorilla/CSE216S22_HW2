class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
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

    putValueRecursively( key, value,  testNode) {
        // DOES IT GO ON THE LEFT?
        //first compare both strings, only one I found to work was localeCompare()
        //that function compares when the string occurs so if the key value were to be occuring before
        //testNode.key then we get a negative value

        if (key.localeCompare(testNode.key) < 0) {
            if (testNode.left === null) {
                testNode.left = new Node(key, value, testNode, null, null);
                this.size++;
                return;
            }
            else {
                this.putValueRecursively(key, value, testNode.left);
            }
        }
        else if (key.localeCompare(testNode.key) === 0) {
            testNode.data = value;
            return;
        }
        else {
            if (testNode.right == null) {
                testNode.right = new Node(key, value, testNode, null, null);
                this.size++;
                return;
            }
            else {
                this.putValueRecursively(key, value, testNode.right);
            }
        }
    }
    // @todo - YOU MUST DEFINE THIS METHOD
    putValue( key, value) {
        // IF IT'S THE FIRST ONE MAKE IT THE ROOT
        if (this.root === null) {
            this.root = new Node(key, value, null, null);
            this.size++;
            return;
        }
        // ADD IT TO THE EXISTING TREE
        this.putValueRecursively(key, value, this.root);
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        if (this.root == null) {
            return null;
        }
        else {
            return this.getValueRecursively(key, this.root);
        
    }
}

    getValueRecursively(key, testNode)
    {
        if (key.localeCompare(testNode.key) < 0) {
            if (testNode.left === null) {
                return null;
            }
            else {
                return this.getValueRecursively(key, testNode.left);
            }
        }
        else if (key.localeCompare(testNode.key) === 0) {
            return testNode.data;
        }
        else {
            if (testNode.right == null) {
                return null;
            }
            else {
                return this.getValueRecursively(key, testNode.right);
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let traveller = this.root;
        let found = false;
        while (!found) {
            //cout << "key: " << key << ", traveller->key: " << traveller->key << endl;
        //first compare both strings, only one I found to work was localeCompare()
        //that function compares when the string occurs so if the key value were to be occuring before
        //testNode.key then we get a negative value

            if (key.localeCompare(traveller.key) === 0) {
                // GET THE LARGEST ON THE LEFT, IS THERE IS A LEFT
                if (traveller.left != null) {
                    // FIND THE LARGEST
                    let largest = traveller.left;
                    while (largest.right != null) {
                        largest = largest.right;
                    }
                    // AT THIS POINT largest MUST
                    // BE THE LARGEST ON THE LEFT
                    // BUT IT MIGHT BE ITS PARENT LEFT
                    // OR RIGHT NODE
                    
                    // FIRST MOVE THE key AND THE data
                    traveller.key = largest.key;
                    traveller.data = largest.data;
                    
                    // THEN FIX THE TREE, NOTE largest HAS NO RIGHT
                    // IF IT'S A LEAF WE DON'T CARE ABOUT ITS CHILDREN
                    // SO WE CAN JUST KEEP ITS LEFT
                    if (largest === largest.parent.left) {
                        largest.parent.left = largest.left;
                    }
                    else {
                        largest.parent.right = largest.left;
                    }
                    //delete largest;
                }
                // OR THE SMALLEST ON THE RIGHT
                else if (traveller.right != null) {
                    // FIND THE SMALLEST
                    let smallest = traveller.right;
                    while (smallest.left != null) {
                        smallest = smallest.left;
                    }
                    // AT THIS POINT Smallest MUST
                    // BE THE SMALLEST ON THE RIGHT
                    // BUT IT MIGHT BE ITS PARENT RIGHT
                    // OR LEFT NODE
                    
                    // FIRST MOVE THE key AND THE data
                    traveller.key = smallest.key;
                    traveller.data = smallest.data;
                    
                    // THEN FIX THE TREE
                    if (smallest === smallest.parent.right) {
                        smallest.parent.right = smallest.right;
                    }
                    else {
                        smallest.parent.left = smallest.right;
                    }
                    //delete smallest;
                }
                // IT'S A LEAF
                else {
                    // IT MIGHT BE THE ROOT (i.e. THE ONLY NODE)
                    if (traveller === this.root) {
                        //delete root;
                        root = null;
                    }
                    // IT MIGHT BE ON ITS PARENT'S LEFT
                    else if (traveller === traveller.parent.left) {
                        traveller.parent.left = null;
                        //delete traveller;
                    }
                    // OR ITS RIGHT
                    else {
                        traveller.parent.right = null;
                        //delete traveller;
                    }
                }
                this.size--;
                found = true;
            }
            else if (key.localeCompare(traveller.key) < 0) {
                if (traveller.left == null) {
                    return;
                }
                else {
                    traveller = traveller.left;
                }
            }
            else {
                if (traveller.right === null) {
                    return;
                }
                else {
                    traveller = traveller.right;
                }
            }
        }
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

