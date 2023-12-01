// GPT
export function getRandomizedArray<T>(
  originalArray: T[],
  desiredLength: number
): T[] {
  // Function to shuffle an array
  function shuffleArray(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Clone the original array to avoid mutating it
  let randomizedArray = [...originalArray];

  // If the original array is empty or has only one element, just return it repeated
  if (originalArray.length <= 1) {
    while (randomizedArray.length < desiredLength) {
      randomizedArray = randomizedArray.concat(randomizedArray);
    }
    return randomizedArray.slice(0, desiredLength);
  }

  // Shuffle and fill the array until it reaches the desired length
  while (randomizedArray.length < desiredLength) {
    // Shuffle the original array and add it to the randomized array
    randomizedArray = randomizedArray.concat(shuffleArray([...originalArray]));
  }

  // If we've added too many items, trim the array down to the desired length
  return randomizedArray.slice(0, desiredLength);
}
