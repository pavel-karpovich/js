import { sum } from "./index.js";
import { tsConstructorType } from "@babel/types";

console.log(sum);
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("dawd", () => {
  expect("dawd").not.toContain("e");
});
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["плита", "духовка", "стиральная машина"],
    area: 20,
    wallColor: "белый"
  }
};

test("the house has my desired features", function() {
  const desiredHouse = {
    bath: true,
    kitchen: {
      amenities: expect.arrayContaining(["плита"]),
      wallColor: expect.stringMatching(/белый|желтый/)
    }
  };
  expect(houseForSale).toMatchObject(desiredHouse);
});

test("the number of elements must match exactly", () => {
  const expectedResult = [{ foo: "bar" }, { baz: 1 }];
  const actualResult = [{ foo: "bar" }, { baz: 1 }];
  expect(actualResult).toMatchObject(expectedResult);
});

test(".toMatchObject is called for each elements, so extra object properties are okay", () => {
  expect([{ foo: "bar" }, { baz: 1, extra: "quux" }]).toMatchObject([
    { foo: "bar" },
    { baz: 1 }
  ]);
});

let compile = function() {
  console.log([].join.call(arguments, " -> "));
};
function drink(something) {
  if (something === "чернила осьминога") {
    compile = function() {
      if (arguments.length === 3) {
        const includes = [].includes.bind(arguments);
        if (
          includes("волосы козы") &&
          includes("гнилая груша") &&
          includes("муравьиный яд")
        ) {
          throw Error("Ктулху");
        }
      }
    };
  } else {
    console.log("Bueeeh..");
  }
}

test("вызов Ктулху", function() {
  expect(function() {
    drink("чернила осьминога");
    compile("волосы козы", "гнилая груша", "муравьиный яд");
  }).toThrow("Ктулху");
});

function getDataById(id) {
  if (id === 1) {
    return { name: "The Great Gatsby", year: 1925, genre: "novel" };
  } else if (id === 2) {
    return { name: "Ulysses", year: 1918, genre: "modernist novel" };
  } else {
    return null;
  }
}

test("Получение данных по id", function() {
  const id = 2;
  const data = getDataById(id);
  expect(data).toMatchInlineSnapshot(`
    Object {
      "genre": "modernist novel",
      "name": "Ulysses",
      "year": 1918,
    }
  `);
});

test('dwadad', function() {
  const id = 1;
  const data = getDataById(id);
  expect(data).toMatchSnapshot();
});


class DataStorage {
  constructor(maxElements, locale) {
    this.maxElements = maxElements;
    this._count = 0;
    this._locale = locale;
    this._innerStorage = {array: []};
    this._blocked = true;
  }

  open() {
    this._blocked = false;
  }

  close() {
    this._blocked = true;
  }

  isOpen() {
    return !this._blocked;
  }

  addNext(value) {
    if (this._blocked || this._count === this.maxElements) {
      return false;
    }
    this._innerStorage.array.push(value);
    this._count++;
    return true;
  }

  addByKey(key, value) {
    if (this._blocked || this._innerStorage.hasOwnProperty(key) || this._count === this.maxElements) {
      return false;
    }
    this._innerStorage[key] = value;
    this._count++;
    return true;
  }

  isEmpty() {
    return this._count === 0;
  }

  clearAllData() {
    if (this._blocked) {
      return false;
    }
    this._innerStorage = {array: []};
    this._count = 0;
    return true;
  }
}


describe('Тестирование класса DataStorage', function() {

  let storage;

  beforeAll(function() {
    const locale = 'ru-RU';
    const maxElements = 5;
    storage = new DataStorage(maxElements, locale);
  });

  test('По умолчанию хранилище закрыто', function() {
    expect(storage.isOpen()).toBeFalsy();
  });

  describe('Закрытое хранилище', function() {

    afterEach(function() {
      storage.close();
    });

    test('Нельзя добавлять в массив', function() {
      const testValue = 22;
      const result = storage.addNext(testValue);
      expect(result).toBeFalsy();
      expect(storage._count).toBe(0);
    });

    test('Нельзя добавлять по ключу', function() {
      const testKey = 'alpha';
      const testValue = 22;
      const result = storage.addByKey(testKey, testValue);
      expect(result).toBeFalsy();
      expect(storage._count).toBe(0);
    });

    test('Нельзя очистить', function() {
      const result = storage.clearAllData();
      expect(result).toBeFalsy();
      expect(storage._count).toBe(0);
    });

    test('Можно открыть', function() {
      storage.open();
      expect(storage.isOpen()).toBeTruthy();
    });
  });

  describe('Открытое хранилище', function() {

    beforeEach(function() {
      storage.open();
    });

    test('Добавление в массив', function() {
      const testValue = 432;
      const currentCount = storage._count;
      storage.addNext(testValue);
      expect(storage._count).toBe(currentCount + 1);
      expect(storage._innerStorage.array[0]).toBe(testValue);
    });

    test('Добавление по ключу', function() {
      const testKey = 'echo';
      const testValue = 432;
      const currentCount = storage._count;
      storage.addByKey(testKey, testValue);
      expect(storage._count).toBe(currentCount + 1);
      expect(storage._innerStorage[testKey]).toBe(testValue);
    });

    test('Можно закрыть', function() {
      const countBeforeClosing = storage._count;
      storage.close();
      expect(storage.isOpen()).toBeFalsy();
      expect(storage._count).toBe(countBeforeClosing);
    });

    describe('Хранилище с данными', function() {

      beforeEach(function() {
        storage.clearAllData();
        storage.addNext('четверг');
        storage.addNext('пятница');
        storage.addByKey('interval', 7);
      });

      test('Очистка удаляет все данные', function() {
        const result = storage.clearAllData();
        expect(result).toBeTruthy();
        expect(storage._count).toBe(0);
      });

      test('Нельзя добавить повторяющийся ключ', function() {
        const testKey = 'interval';
        const testValue = 14;
        const currentCount = storage._count;
        const result = storage.addByKey(testKey, testValue);
        expect(result).toBeFalsy();
        expect(storage._count).toBe(currentCount);
      });
    });

    describe('Хранилище переполнено', function() {

      beforeAll(function() {
        storage.clearAllData();
        for (let i = 0; i < storage.maxElements; ++i) {
          storage.addNext(i);
        }
      });

      test('Нельзя больше добавлять в массив', function() {
        const testValue = 22;
        const currentCount = storage._count;
        const result = storage.addNext(testValue);
        expect(result).toBeFalsy();
        expect(storage._count).toBe(currentCount);
      });
  
      test('Нельзя больше добавлять по ключу', function() {
        const testKey = 'alpha';
        const testValue = 22;
        const currentCount = storage._count;
        const result = storage.addByKey(testKey, testValue);
        expect(result).toBeFalsy();
        expect(storage._count).toBe(currentCount);
      });

    });
  });
});

test('Деление 8 на 2', function() {
  const a = 8;
  const b = 2;
  const expectedResult = 4;
  const result = a / b;
  expect(result).toBeCloseTo(expectedResult);
});
test('Деление -11 на 3', function() {
  const a = -11;
  const b = 3;
  const expectedResult = -3.666666;
  const result = a / b;
  expect(result).toBeCloseTo(expectedResult);
});
test('Деление -200 на 0', function() {
  const a = -200;
  const b = 0;
  const expectedResult = -Infinity;
});

test.each([
  [8, 2, 4],
  [-11, 3, -3.666666],
  [-200, 0, -Infinity]
])('Деление чисел', function(a, b, expectedResult) {
  const result = a / b;
  expect(result).toBeCloseTo(expectedResult);
});


describe.each([
  [[1, 2, 3, 4, 5, 6], 4],
  [['str1', 'str2', 'str3', 'str4', 'str5', 'str6'], 'str4']
])('Тестирование функций Array для разных типов', function(array, value) {

  test('Функция поиска', function() {
    const result = array.find((el) => el === value);
    expect(result).toBeDefined();
  });

  test('Функция фильтрации', function() {
    const result = array.filter((el) => el !== value);
    expect(result).toMatchSnapshot();
  });

  test('Функция проверки вхождения', function() {
    const result = array.includes(value);
    expect(result).toBeTruthy();
  });

});

function fetchData(url) {
  return new Promise(function(resolve) {
    let returnedData = null;
    switch (url) {
      case 'sweets':
        returnedData = 'candys';
        break;
      case 'veggies':
        returnedData = 'potato';
        break;
      case 'fruits':
        returnedData = 'apricot';
        break;
      default:
        returnedData = 'nothing';
        break;
    }
    setTimeout(resolve, 3333, returnedData);
  });
}

describe.skip('Тестирование асинхронных запросов', function() {

  test('Запрос на получение фрукта', function() {
    return expect(fetchData('fruits')).resolves.toBe('apricot');
  });

  test.each([
    ['diamonds'],
    ['phones'],
    ['combs'],
    ['drug']
  ])('Запрос на получение того, чего нет', function(item) {
    return expect(fetchData(item)).resolves.toBe('nothing');
  });

  // Повышенный уровень опасности взрыва мозга!
  test.each('Запросы на получение овощей, фруктов и сладостей вместе', function() {
    return expect(
      Promise.all([
        fetchData('veggies'),
        fetchData('fruits'),
        fetchData('sweets')
      ]).then(results => results.join(', '))
    ).toBe('potato, apricot, candys');
  });

});

const module1 = { fetchData };
test('Тестирование спаев', function() {
  jest.spyOn(module1, 'fetchData');
  return module1.fetchData('electronics').then(function(data) {
    expect(data).toBe('nothing');
    expect(module1.fetchData).toBeCalledTimes(1);
  });
});

const myModule = {
  soldSomething: function() {
    if (arguments.length === 0) {
      return false;
    }
    console.log('И что же мы продаём?');
    console.log('Мы продаём:');
    for (const item of arguments) {
      console.log(item);
    }
    return true;
  },
  buySomething: function() {
    const itemsToSold = ['Велосипед', 'Телевизор', 'Холодильник', 'Машина', 'Дача', 'Квартира'];
    const solded = [];
    const buyedItems = [];
    console.log('И что же мы покупаем?');
    if (arguments.length === 0) {
      console.log('Мы покупаем баобаб!');
      itemsToSold.forEach((item) => solded.push(item));
      buyedItems.push('Баобаб вот такой ширины!');
    } else {
      console.log('Мы покупаем:');
      for (let i = 0; i < arguments.length; ++i) {
        console.log(arguments[i]);
        if (i < itemsToSold.length) {
          solded.push(itemsToSold[i]);
        }
        buyedItems.push(arguments[i]);
      }
    }
    myModule.soldSomething(...solded);
    return buyedItems;
  }
}

describe.only('Спаи', function() {

  test('Чтобы купить что-нибудь ненужное, нужно сначала продать что-нибудь ненужное', function() {
    jest.spyOn(myModule, 'soldSomething');
    myModule.buySomething('Гири');
    expect(myModule.soldSomething).toBeCalledWith('Велосипед');
  });
  test('Покупаем - значит продаём', function() {
      jest.spyOn(myModule, 'soldSomething');
      myModule.buySomething();
      expect(myModule.soldSomething).toHaveBeenCalled();
  });

  test('Покупаем 1 раз - значит продаём 1 раз', function() {
      const spy = jest.spyOn(myModule, 'soldSomething');
      spy.clearMock();
      myModule.buySomething();
      expect(myModule.soldSomething).toHaveBeenCalledTimes(1);
  });

  test('Продажа совершается успешно', function() {
    jest.spyOn(myModule, 'soldSomething');
    myModule.buySomething('груша');
    expect(myModule.soldSomething).toHaveReturnedWith(true);
  });

  test('Получение купленных вещей', function() {
    jest.spyOn(myModule, 'buySomething');
    myModule.buySomething('чернила', 'какаду', 'удочка');
    expect(myModule.buySomething).toHaveReturnedWith(['чернила', 'какаду', 'удочка']);
  });
});


function longAndComplexQueryToDatabase() {
  const types = ['el', 'qu', 're', 'co'];
  types.forEach((value, index) => {
    if (value.length === index) {
      value = value.repeat(12);
      let codes = [];
      for (const char of value) {
        codes.push(char.charCodeAt(0));
      }
      return codes
        .filter((n) => n % 2)
        .map((n) => n += 5 - Math.random() * 10)
        .reduce((result, n) => result += n);
    }
  });
}

function checkDatabaseCount() {
  let num = longAndComplexQueryToDatabase();
  if (num > 1000) {
    return true;
  } else {
    return false;
  }
}

test('Проверка заполненности БД', function() {
  longAndComplexQueryToDatabase = jest.fn(function() {
    return 2000;
  });
  const result = checkDatabaseCount();
  expect(result).toBeTruthy();
});

test('Проверка заполненности БД', function() {
  longAndComplexQueryToDatabase = jest.fn(function() {
    return 400;
  });
  const result = checkDatabaseCount();
  expect(result).toBeFalsy();
});
