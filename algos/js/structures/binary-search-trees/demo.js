const { BST } = require('./bst') 

var tree = new BST();
tree.insert(23);
tree.insert(45);
tree.insert(16);
tree.insert(37);
tree.insert(3);
tree.insert(99);
tree.insert(22);

console.log("Inorder traversal: ");
tree.inOrder(tree.root);

console.log("Preorder traversal: ");
tree.preOrder(tree.root);

console.log("Postorder traversal: ");
tree.postOrder(tree.root);

console.log("Get minimum: ");
console.log(tree.getMin());