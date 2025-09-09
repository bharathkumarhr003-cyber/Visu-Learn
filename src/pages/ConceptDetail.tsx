import ConceptPage from "@/components/ConceptPage";

// Sample concept data - in a real app this would come from an API
const sampleConcept = {
  title: "Binary Search Trees",
  subject: "Data Structures",
  difficulty: "Intermediate" as const,
  duration: "45 min",
  rating: 4.8,
  learners: 12453,
  tags: ["Trees", "Recursion", "Search", "BST", "Data Structures"],
  definition: `A Binary Search Tree (BST) is a hierarchical data structure where each node has at most two children, 
    arranged such that the left child's value is less than the parent's value, and the right child's value is greater. 
    This property makes BSTs incredibly efficient for searching, insertion, and deletion operations, with average time 
    complexity of O(log n). BSTs are fundamental to many advanced data structures and algorithms, forming the backbone 
    of databases, file systems, and expression parsing.`,
  
  steps: [
    {
      title: "Understanding BST Properties",
      description: "Every BST follows the binary search property: for any node, all values in the left subtree are smaller, and all values in the right subtree are larger.",
      code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}`
    },
    {
      title: "Insertion Operation", 
      description: "To insert a new node, compare its value with the current node and recursively insert into the appropriate subtree.",
      code: `function insert(root, val) {
  if (!root) return new TreeNode(val);
  
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else {
    root.right = insert(root.right, val);
  }
  
  return root;
}`
    },
    {
      title: "Search Operation",
      description: "Searching in a BST is efficient because we can eliminate half the tree at each step by comparing values.",
      code: `function search(root, target) {
  if (!root || root.val === target) {
    return root;
  }
  
  if (target < root.val) {
    return search(root.left, target);
  }
  
  return search(root.right, target);
}`
    },
    {
      title: "Tree Traversals",
      description: "Different traversal methods reveal different patterns: inorder gives sorted sequence, preorder shows structure.",
      code: `function inorderTraversal(root, result = []) {
  if (root) {
    inorderTraversal(root.left, result);
    result.push(root.val);
    inorderTraversal(root.right, result);
  }
  return result;
}`
    }
  ],
  
  analogy: {
    title: "BST as a Family Tree",
    description: `Think of a Binary Search Tree like a well-organized family tree where generations are arranged by age. 
      Every person (node) has at most two children, and there's a clear rule: the left child is always younger than 
      the parent, while the right child is always older.`,
    comparison: `Just like you can quickly find someone in a family tree by knowing their approximate age and following 
      the "younger goes left, older goes right" rule, you can efficiently search a BST by comparing values and 
      choosing the correct path. If you're looking for someone born in 1985 and you're currently at someone born 
      in 1990, you know to go left (younger) rather than exploring the entire family tree!`
  },
  
  quiz: [
    {
      question: "What is the time complexity of searching in a balanced Binary Search Tree?",
      options: [
        "O(1) - Constant time",
        "O(log n) - Logarithmic time", 
        "O(n) - Linear time",
        "O(n²) - Quadratic time"
      ],
      correct: 1
    },
    {
      question: "In a BST, where would you find the minimum value?",
      options: [
        "At the root node",
        "In the rightmost leaf node",
        "In the leftmost leaf node",
        "At any leaf node"
      ],
      correct: 2
    },
    {
      question: "What traversal method gives you elements in sorted order for a BST?",
      options: [
        "Preorder traversal",
        "Postorder traversal", 
        "Inorder traversal",
        "Level-order traversal"
      ],
      correct: 2
    }
  ]
};

const ConceptDetail = () => {
  return <ConceptPage concept={sampleConcept} />;
};

export default ConceptDetail;