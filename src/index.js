/**
 * Insert elements into sorted array using binary search to indentify correct index
 * @module lib/index
 */

module.exports = binarySearchInsert

/**
 * @param {Array} sortedArray
 * @param {Function} comparator
 * @param {*} item
 * @return Number
 */
function binarySearchInsert (sortedArray, comparator, item) {
  var high = sortedArray.length - 1;
  var lastIndex = high;
  var low = 0;
  var mid = 0;

  if (sortedArray.length === 0) {
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

  let cmp = comparator(sortedArray[mid], item);
  if (cmp <= 0.0) {
    mid++;
  }

  sortedArray.splice(mid, 0, item)
  return mid;
}
