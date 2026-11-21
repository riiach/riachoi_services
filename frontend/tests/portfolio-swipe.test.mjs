import assert from "node:assert/strict";
import test from "node:test";
import { getSwipeDirection, getWrappedImageIndex } from "../lib/util/portfolio-swipe.js";

test("swiping left advances and swiping right goes to the previous thumbnail", () => {
  assert.equal(getSwipeDirection(-85, 6, 320), 1);
  assert.equal(getSwipeDirection(85, 6, 320), -1);
  assert.equal(getSwipeDirection(-80, 6, 120), 1);
});

test("normal taps and vertical page scrolling do not change the thumbnail", () => {
  assert.equal(getSwipeDirection(15, 2, 320), 0);
  assert.equal(getSwipeDirection(25, 140, 320), 0);
  assert.equal(getSwipeDirection(70, 80, 320), 0);
  assert.equal(getSwipeDirection(Number.NaN, 0, 320), 0);
});

test("both directions wrap seamlessly for a carousel of any length", () => {
  assert.equal(getWrappedImageIndex(0, 4), 3);
  assert.equal(getWrappedImageIndex(1, 4), 0);
  assert.equal(getWrappedImageIndex(4, 4), 3);
  assert.equal(getWrappedImageIndex(5, 4), 0);
  assert.equal(getWrappedImageIndex(-1, 4), 2);
  assert.equal(getWrappedImageIndex(1, 1), 0);
});
