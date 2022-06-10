class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [initLength];
        for (let i = 0; i < initLength; i++){
            this.hashTable[i] = null;
        }
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

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
    getValue(key) {
        let index = this.hashCode(key);
        for (let i = 0; i < this.length; i++){
            if (this.hashTable[index % this.length] != null && this.hashTable[index % this.length].key === key){
                console.log(this.hashTable[index % this.length].key + ": " + this.hashTable[index % this.length].value.toString() + " found at index "
                + (index % this.length));
                return this.hashTable[index % this.length].value;
            }
            else{
                index++;
            }
        }
        console.log("key does not exist in table");
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    /*removeValue(key) {   
        let foundKey = false;
        let index = this.hashCode(key);
        for (let i = 0; i < this.length; i++){
            if (this.hashTable[index % this.length] != null && key === this.hashTable[index % this.length].key){
              console.log(key + ": " + this.hashTable[index % this.length].value.toString() + " has been deleted at index " + (index % this.length));
              this.size--;
              this.hashTable[index % this.length] = null;
              foundKey = true;
              break;
            }
            else{
                index++;
            }
        }
        if (foundKey === true){
            let newTable = [this.length];
            for (let i = 0; i < this.length; i++){
                newTable[i] = null;
            }
            for (let i = 0; i < this.length; i++){
                if (this.hashTable[i] != null){
                    let tempKey = this.hashTable[i].key;
                    let tempItem = this.hashTable[i];
                    let newIndex = this.hashCode(tempKey);
                    for (let tempCounter = 0; tempCounter < this.length; tempCounter++){
                        if (newTable[newIndex % this.length] === null){
                            newTable[newIndex % this.length] = tempItem;
                            console.log(this.hashTable[i].key + ": " + this.hashTable[i].value.toString() + " has been rehashed to index " + (newIndex % this.length));
                            break;
                        }
                        else{
                            newIndex++;
                        }
                    }
                }
            }
        }
        else{
            console.log("key to delete " + key + " is not found");
        }
    }*/

    // @todo - YOU MUST DEFINE THIS METHOD
    /*putValue(key, item) {
        let KVPtoInsert = new KeyValuePair(key, item);
        let index = this.hashCode(key);
        let replacedIndex = false;
        for (let i = 0; i < this.length; i++){
            if (this.hashTable[index % this.length] != null && key === this.hashTable[index % this.length].key){
                console.log(key + ": "  + this.hashTable[index % this.length].value.toString() + " has been replaced with "
                + item.toString() + " at index " + (index % this.length));
                replacedIndex = true;
                this.hashTable[index % this.length] = KVPtoInsert;
                break;
            }
            else{
                index++;
            }
        }
        if (this.size === this.length && !replacedIndex){
            let originalLength = this.length;
            this.length = this.length*2;
            console.log("hashtable is full, so capacity is expanded");
            let newTable = [this.length];
            for (let i = 0; i < this.length; i++){
                newTable[i] = null;
            }
            for (let i = 0; i < originalLength; i++){
                if (this.hashTable[i] != null){
                    let tempKey = this.hashTable[i].key;
                    let tempItem = this.hashTable[i];
                    let tempIndex = this.hashCode(tempKey);
                    for (let tempCounter = 0; tempCounter < this.length; i++){
                        if (newTable[tempIndex % this.length] === null){
                            newTable[tempIndex % this.length] = tempItem;
                            console.log(tempItem.toString() + " rehashed at index " + (tempIndex % this.length));
                            break;
                        }
                        else{
                            tempIndex++;
                        }
                    }
                }
            }
            this.hashTable = newTable;
        }
        if (!replacedIndex){
            for (let counter = 0; counter < this.length; counter++){
                if (this.hashTable[index % this.length] === null){
                    this.hashTable[index % this.length] = KVPtoInsert;
                    console.log(item.toString() + " placed at index " + (index % this.length));
                    this.size++;
                    break;
                }
                else{
                    index++;
                }
            }
        }
    }*/
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};