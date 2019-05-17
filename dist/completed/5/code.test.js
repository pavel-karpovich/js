
import { __RewireAPI__ } from './code.js';
import * as iFetch from 'isomorphic-fetch';
window.fetch = iFetch.default;

const receiveUserData = __RewireAPI__.__get__('receiveUserData');
const getRandomName = __RewireAPI__.__get__('getRandomName');
__RewireAPI__.__Rewire__('proxyFetch', async function (url, options) {
  const response = await fetch(url, options);
  const data = await response.json();  
  return data;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Server responded with status 200', async () => {
  const data = await receiveUserData();
  expect(data).toBeDefined();
});

test('Valid random name received', async () => {
  const testUserData = {
    lname: 'Шалдыбин',
    fname: 'Семен',
    patronymic: 'Константинович',
    gender: 'm',
    date: '3 сентября 1978',
  };
  const fakeResponse = {
    json: () => testUserData
  };
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => new Promise(resolve => resolve(fakeResponse)));
  const randomName = await getRandomName();
  expect(randomName).toMatch(/(?:[А-ЯЁ][а-яё]+ ){2}[А-ЯЁ][а-яё]+/);
});

test('Makes only one request', async () => {
  const fakeResponse = {
    json: () => "mock"
  };
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => new Promise(resolve => resolve(fakeResponse)));
  await getRandomName();
  expect(fetch).toBeCalledTimes(1);
});