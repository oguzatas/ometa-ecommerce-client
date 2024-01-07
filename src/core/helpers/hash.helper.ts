export class HashHelper {
  public static customHash(inputString) {
    let hash = 0;
    if (inputString.length === 0) return hash;

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32bit integer
    }

    return hash;
  }

  public static getHash(inputString) {
    // Get a consistent hash value using the custom hash function
    const hash = HashHelper.customHash(inputString);

    // Convert the hash into a pattern ID (e.g., by taking the absolute value and truncating)
    const patternId = Math.abs(hash).toString().slice(0, 8);

    return patternId;
  }
}
