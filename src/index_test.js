/**
 * @module lib/index_test
 */

var Code = require('Code');
var Lab = require('lab');

var binarySearchInsert = require('./index');

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('lib/index', function () {
  var comparator = function (a, b) { return a - b; };

  it('should insert item if sortedArray is empty', function (done) {
    var sortedArray = [];
    var item = 5;
    binarySearchInsert(sortedArray, item, comparator);
    expect(sortedArray.length).to.equal(1);
    expect(sortedArray[0]).to.equal(5);
    done();
  });

  it('should insert item if sortedArray has length 1 and its item is higher', function (done) {
    var sortedArray = [10];
    var item = 5;
    binarySearchInsert(sortedArray, item, comparator);
    expect(sortedArray.length).to.equal(2);
    expect(sortedArray[0]).to.equal(5);
    expect(sortedArray[1]).to.equal(10);
    done();
  });

  it('should insert item if sortedArray has length 1 and its item is lower', function (done) {
    var sortedArray = [1];
    var item = 5;
    binarySearchInsert(sortedArray, item, comparator);
    expect(sortedArray.length).to.equal(2);
    expect(sortedArray[0]).to.equal(1);
    expect(sortedArray[1]).to.equal(5);
    done();
  });

  it('should place item in sortedArray between lower and higher values', function (done) {
    var sortedArray = [1, 3, 5, 7];
    var sortedArrayTarget = [1, 3, 4, 5, 7];
    var item = 4;
    binarySearchInsert(sortedArray, item, comparator);
    expect(sortedArray.length).to.equal(5);
    expect(sortedArray).to.deep.equal(sortedArrayTarget);
    done();
  });

  it('should place item in sortedArray which contains a single matching value', function (done) {
    var sortedArray = [1, 3, 5, 7];
    var sortedArrayTarget = [1, 3, 5, 5, 7];
    var item = 5;
    binarySearchInsert(sortedArray, item, comparator);
    expect(sortedArray.length).to.equal(5);
    expect(sortedArray).to.deep.equal(sortedArrayTarget);
    done();
  });

  it('should place item in sortedArray which contains a multiple matching values', function (done) {
    var sortedArray = [1, 3, 5, 5, 5, 7];
    var sortedArrayTarget = [1, 3, 5, 5, 5, 5, 7];
    var item = 5;
    binarySearchInsert(sortedArray, item, comparator);
    expect(sortedArray.length).to.equal(7);
    expect(sortedArray).to.deep.equal(sortedArrayTarget);
    done();
  });

  it('should handle sortedArray of length 2^18', function (done) {
    var len = Math.pow(2, 20);
    var sortedArraySequentialValues = [];
    var sortedArrayDuplicateValues = [];
    for (let i = 0; i < len; i++) {
      sortedArraySequentialValues.push(i);
    }

    for (let i = 0; i < (len / 4) | 0; i++) {
      sortedArrayDuplicateValues.push(i);
      sortedArrayDuplicateValues.push(i);
      sortedArrayDuplicateValues.push(i);
      sortedArrayDuplicateValues.push(i);
    }

    var item = 500000;
    binarySearchInsert(sortedArraySequentialValues, item, comparator);
    expect(sortedArraySequentialValues.length).to.equal(len + 1);
    expect(sortedArraySequentialValues.splice(499998, 6)).to.deep.equal([
      499998, 499999, 500000, 500000, 500001, 500002
    ]);

    item = 43750;
    binarySearchInsert(sortedArrayDuplicateValues, item, comparator);
    expect(sortedArrayDuplicateValues.length).to.equal(len + 1);
    expect(sortedArrayDuplicateValues.splice(174998, 10)).to.deep.equal([
      43749, 43749, 43750, 43750, 43750, 43750, 43750, 43751, 43751, 43751
    ]);
    done();
  });
});
