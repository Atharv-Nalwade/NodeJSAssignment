// function ArrayChallenge(arr) {
//     const totalSum = arr.reduce((sum, num) => sum + num, 0);
//     if (totalSum % 2 !== 0) {
//       return -1; // Total sum is not divisible by 2, impossible to split into two equal sets
//     }
    
//     const targetSum = totalSum / 2;
//     const sortedArr = arr.sort((a, b) => a - b);
//     const set1 = [];
//     const set2 = [];
    
//     function findSets(index, sum1, sum2) {
//       if (sum1 === targetSum && sum2 === targetSum) {
//         return true; // Found a valid split
//       }
      
//       if (index === sortedArr.length) {
//         return false; // Reached the end of the array, no valid split found
//       }
      
//       const num = sortedArr[index];
      
//       // Try adding the number to the first set
//       if (sum1 + num <= targetSum) {
//         set1.push(num);
//         if (findSets(index + 1, sum1 + num, sum2)) {
//           return true;
//         }
//         set1.pop();
//       }
      
//       // Try adding the number to the second set
//       if (sum2 + num <= targetSum) {
//         set2.push(num);
//         if (findSets(index + 1, sum1, sum2 + num)) {
//           return true;
//         }
//         set2.pop();
//       }
      
//       // Skip the number and continue searching
//       return findSets(index + 1, sum1, sum2);
//     }
    
//     if (!findSets(0, 0, 0)) {
//       return -1; // No valid split found
//     }
    
//     const result = [...set1, ...set2].join(',');
//     return result;
//   }

function ArrayChallenge(arr) {
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    if (totalSum % 2 !== 0) {
      return -1; // Total sum is not divisible by 2, impossible to split into two equal sets
    }
  
    const targetSum = totalSum / 2;
    const sortedArr = arr.sort((a, b) => a - b);
    const set1 = [];
    const set2 = [];
  
    function findSets(index, sum1, sum2) {
      if (sum1 === targetSum && sum2 === targetSum) {
        return true; // Found a valid split
      }
  
      if (index === sortedArr.length) {
        return false; // Reached the end of the array, no valid split found
      }
  
      const num = sortedArr[index];
  
      // Try adding the number to the first set
      if (sum1 + num <= targetSum) {
        set1.push(num);
        if (findSets(index + 1, sum1 + num, sum2)) {
          return true;
        }
        set1.pop();
      }
  
      // Try adding the number to the second set
      if (sum2 + num <= targetSum) {
        set2.push(num);
        if (findSets(index + 1, sum1, sum2 + num)) {
          return true;
        }
        set2.pop();
      }
  
      // Skip the number and continue searching
      return findSets(index + 1, sum1, sum2);
    }
  
    if (!findSets(0, 0, 0)) {
      return -1; // No valid split found
    }
  
    const result = [...set1, ...set2];
    return result;
  
  }
  
  console.log(ArrayChallenge([1, 2, 3, 4]));
  console.log(ArrayChallenge([16, 22, 35, 8, 20, 1, 21, 11]));
  console.log(ArrayChallenge([1, 2, 1, 5]));
  