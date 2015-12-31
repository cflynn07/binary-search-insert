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
  var high = sortedArray.length - 1;
  var lastIndex = high;
  var low = 0;
  var mid;

  if (high === -1) {
    sortedArray.push(item);
    return 0;
  }

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

  if (mid === lastIndex) {
    let cmp = comparator(sortedArray[mid], item);
    if (cmp <= 0.0) {
      mid++;
    }
  }

  sortedArray.splice(mid, 0, item)
  return mid;
}
