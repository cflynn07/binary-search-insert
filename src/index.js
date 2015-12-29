/**
 * Insert elements into sorted array using binary search to indentify correct index
 * @module lib/index
 */

module.exports = binarySearchInsert

/**
 * @param {Array} sortedArray
 * @param {*} item
 * @param {Function} comparator
 * @return Number
 */
function binarySearchInsert (sortedArray, item, comparator) {
  var low = 0;
  var high = sortedArray.length - 1;
  var lastIndex = high;

  if (high === -1) {
    sortedArray.push(item);
    return 0;
  }

  if (high === 0) {
    let cmp = comparator(sortedArray[0], item);
    if (cmp < 0.0) {
      sortedArray.push(item);
      return 1;
    } else {
      sortedArray.unshift(item);
      return 0;
    }
  }

  var mid;
  while (low <= high) {
    // https://github.com/darkskyapp/binary-search
    // http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
    mid = low + (high - low >> 1);
    let cmp = comparator(sortedArray[mid], item);
    if (cmp <= 0.0) {
      // searching too low
      low = mid + 1;
    } else {
      // searching too high
      high = mid - 1;
    }
  }

  sortedArray.splice(mid, 0, item)
  return mid;
}
