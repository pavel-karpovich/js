import { sum } from "./index.js";

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
})
