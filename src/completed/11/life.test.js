import {Man} from './life.js';

describe('Проверка жизни мужчины', function() {

  let man = null;

  beforeAll(function() {
    man = new Man('Piter');
    jest.spyOn(man, 'plantTree');
    jest.spyOn(man, 'raiseSon');
    jest.spyOn(man, 'buildHouse');
  });

  afterEach(function() {
    jest.resetAllMocks();
  });

  test('Посадил дерево', function() {
    man.liveMansLife();
    expect(man.plantTree).toHaveBeenCalledTimes(1);
  });

  test('Вырастил сына', function() {
    man.liveMansLife();
    expect(man.raiseSon).toHaveBeenCalledTimes(1);
  });

  test('Построил дом', function() {
    man.liveMansLife();
    expect(man.buildHouse).toHaveBeenCalledTimes(1);
  });

});