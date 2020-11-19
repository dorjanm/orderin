import { getRelevanceNumber, getSortedRestaurants } from "../utils";

describe("getRelevanceNumber", () => {
  it("should return corrent number of items in `MenuItems`", () => {
    const input = {
      MenuItems: [1, 2, 3],
      Categories: [
        {
          MenuItems: [1, 2],
        },
        {
          MenuItems: [1],
        },
      ],
    };
    const expected = 6;
    const actual = getRelevanceNumber(input);
    expect(actual).toBe(expected);
  });
});

describe("getSortedRestaurants", () => {
  it("should return restaurant list sorted by `rank`", () => {
    const sortMethod = "rank";
    const restaurants = [
      {
        Name: "restaurant-1",
        Rank: 2,
      },
      {
        Name: "restaurant-2",
        Rank: 1,
      },
    ];
    const expected = [
      {
        Name: "restaurant-2",
        Rank: 1,
      },
      {
        Name: "restaurant-1",
        Rank: 2,
      },
    ];
    const actual = getSortedRestaurants(sortMethod, restaurants);
    expect([...actual]).toMatchObject(expected);
  });
});
