/**
 * Insert elements into sorted array using binary search to indentify correct index
 */

module.exports = binarySearchInsert

/**
 * @param {Array} sortedArray
 * @param {*} item
 * @param {Function} comparator
 * @return {Array}
 */
function binarySearchInsert (sortedArray, item, comparator) {
  var low = 0;
  var high = sortedArray.length - 1;
  var lastIndex = high;

  if (high === -1) {
    sortedArray.push(item);
    return sortedArray;
  }

  while (low <= high) {
    // https://github.com/darkskyapp/binary-search
    // http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
    let mid = low + (high - low >> 1);
    let cmp = comparator(sortedArray[mid], item);
    if (cmp < 0.0) {
      // searching too low
      if (mid + 1 > lastIndex) {
        // place item at end of array
        sortedArray.push(item);
        return sortedArray;
      }

      let cmp2 = comparator(sortedArray[mid + 1], item);
      if (cmp2 >= 0.0) {
        // right item is too high or equal, insert in item to right of mid
        sortedArray.splice(mid + 1, 0, item);
        return sortedArray;
      }

      low = mid + 1;
    } else if (cmp > 0.0) {
      // searching too high
      if (mid === 0) {
        // place item at beginning of array
        sortedArray.splice(0, 0, item);
        return sortedArray;
      }

      let cmp2 = comparator(sortedArray[mid - 1], item);
      if (cmp2 <= 0.0) {
        // left item is too low or equal, insert in item to left of mid
        sortedArray.splice(mid - 1, 0, item);
        return sortedArray;
      }

      high = mid - 1;
    } else {
      // mid equals item
      sortedArray.splice(mid, 0, item);
      return sortedArray;
    }
  }
}
