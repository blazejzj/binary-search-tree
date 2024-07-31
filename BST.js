const node = (value) => {
    return {
        value: value,
        left: null,
        right: null
    }
}

const BST = (array) => {

    const sortAndRemoveDuplicates = (array) => {
        return array.sort((a, b) => a - b).filter((value, index, self) => self.indexOf(value) === index);
    }

    // expects a sorted array with unique values
    const buildTree = (array) => {

        if (array.length === 0) { 
            return null;
        };

        const mid = Math.floor(array.length / 2);
        const root = node(array[mid]);
        root.left = buildTree(array.slice(0, mid));
        root.right = buildTree(array.slice(mid + 1));

        return root;
    };

    const insert = (value) => {
        let currentNode = root;

        while (true) {

            if (value > currentNode.value) {
                if (!currentNode.right) {
                    currentNode.right = node(value);
                    return;
                } 
                currentNode = currentNode.right;
            }
            else {
                if (!currentNode.left) {
                    currentNode.left = node(value);
                    return;
                }
                currentNode = currentNode.left;
            };
        };
    };

    const deleteItem = (value) => {

        const deleteNode = (node, value) => {

            if (node === null) {
                return null;
            }

            if (value < node.value) {
                node.left = deleteNode(node.left, value);
            } 
            else if (value > node.value) {
                node.right = deleteNode(node.right, value);
            } 
            else {
                // node with only one child or no child
                if (node.left === null) {
                    return node.right;
                }
                else if (node.right === null) {
                    return node.left;
                };
                
                // node with two children
                node.value = minValue(node.right);
                node.right = deleteNode(node.right, node.value);
            };
            return node;
        };

        const minValue = (node) => {
            let current = node;

            while (current.left !== null) {
                current = current.left;
            }

            return current.value;
        };

        root = deleteNode(root, value);
    };

    const find = (value) => {
        let currentNode = root;

        while(currentNode) {
            if (value === currentNode.value) { // found
                return currentNode;
            }
            else if (value > currentNode.value) { // go right
                currentNode = currentNode.right;
            }
            else { // go left
                currentNode = currentNode.left;
            }
        };

        return null;
    };

    array = sortAndRemoveDuplicates(array);
    let root = buildTree(array);

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    const levelOrder = (callback) => {

        if (!root) {
            return;
        };

        let queue = [root];

        while (queue.length) {
            let currentNode = queue.shift();
            callback(currentNode.value);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    };

    const inOrder = (node, result = []) => {
        if (node !== null) {
            inOrder(node.left, result);
            result.push(node.value);
            inOrder(node.right, result);
        }
        return result;
    };

    const preOrder = (node, result = []) => {
        if (node !== null) {
            result.push(node.value);
            preOrder(node.left, result);
            preOrder(node.right, result);
        }
        return result;
    }

    const postOrder = (node, result = []) => {
        if (node !== null) {
            postOrder(node.left, result);
            postOrder(node.right, result);
            result.push(node.value);
        }
        return result;
    };

    const height = (node) => {
        if (node === null) {
            return 0;
        }

        let leftHeight = height(node.left);
        let rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    };

    const isBalanced = (node) => {
        if (node === null) {
            return true;
        }

        let leftHeight = height(node.left);
        let rightHeight = height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        };

        return isBalanced(node.left) && isBalanced(node.right);
    };
    
    const rebalance = () => {
        const inOrderArray = inOrder(root);
        return buildTree(inOrderArray);
    };


    return {
        root,
        prettyPrint,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        isBalanced,
        rebalance,
    }
};


// Testing

const randomArray = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
const randomTree = BST(randomArray);
randomTree.prettyPrint(randomTree.root);
console.log(randomTree.isBalanced(randomTree.root));

console.log("Level Order");
randomTree.levelOrder(console.log);
console.log("In Order");
console.log(randomTree.inOrder(randomTree.root));
console.log("Pre Order");
console.log(randomTree.preOrder(randomTree.root));
console.log("Post Order");
console.log(randomTree.postOrder(randomTree.root));

randomTree.insert(101);
randomTree.insert(102);
randomTree.insert(103);

console.log(randomTree.isBalanced(randomTree.root));

randomTree.rebalance();
console.log(randomTree.isBalanced(randomTree.root));

console.log("Level Order");
randomTree.levelOrder(console.log);
console.log("In Order");
console.log(randomTree.inOrder(randomTree.root));
console.log("Pre Order");
console.log(randomTree.preOrder(randomTree.root));
console.log("Post Order");
console.log(randomTree.postOrder(randomTree.root));

