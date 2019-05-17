
import {DisLike} from './DisLike.js';

test('Constructor set default 0', () => {
  const counters = new DisLike();
  expect(counters.likes).toBe(0);
  expect(counters.dislikes).toBe(0);
});

test('Constructor set counters', () => {
  const likesInit = 40;
  const dislikesInit = 20;
  const counters = new DisLike(likesInit, dislikesInit);
  expect(counters.likes).toBe(likesInit);
  expect(counters.dislikes).toBe(dislikesInit);
});

test('Reset counter to zero', () => {
  const counters = new DisLike(13, 42);
  counters.reset();
  expect(counters.likes).toBe(0);
  expect(counters.dislikes).toBe(0);
});

test('Like increases counter by 1', () => {
  const initialValue = 1;
  const expectedValue = 2;
  const counters = new DisLike(initialValue, initialValue);
  counters.like();
  expect(counters.likes).toBe(expectedValue);
});

test('Like returns new counter value', () => {
  const initialValue = 1;
  const expectedValue = 2;
  const counters = new DisLike(initialValue, initialValue);
  const actualValue = counters.like();
  expect(actualValue).toBe(expectedValue);
});

test('Dislike increases counter by 1', () => {
  const initialValue = 1;
  const expectedValue = 2;
  const counters = new DisLike(initialValue, initialValue);
  counters.dislike();
  expect(counters.dislikes).toBe(expectedValue);
});

test('Like returns new counter value', () => {
  const initialValue = 1;
  const expectedValue = 2;
  const counters = new DisLike(initialValue, initialValue);
  const actualValue = counters.dislike();
  expect(actualValue).toBe(expectedValue);
});