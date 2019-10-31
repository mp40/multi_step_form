const dishes = {
  BreakfastPlace1: [
    "Breakfast Dish 1a",
    "Breakfast Dish 1b",
    "Breakfast Dish 1c"
  ],
  BreakfastPlace2: [
    "Breakfast Dish 2a",
    "Breakfast Dish 2b",
    "Breakfast Dish 2c"
  ],
  BreakfastPlace3: [
    "Breakfast Dish 3a",
    "Breakfast Dish 3b",
    "Breakfast Dish 3c"
  ],
  LunchPlace1: ["Lunch Dish 1a", "Lunch Dish 1b", "Lunch Dish 1c"],
  LunchPlace2: ["Lunch Dish 2a", "Lunch Dish 2b", "Lunch Dish 2c"],
  LunchPlace3: ["Lunch Dish 3a", "Lunch Dish 3b", "Lunch Dish 3c"],
  DinnerPlace1: ["Dinner Dish 1a", "Dinner Dish 1b", "Dinner Dish 1c"],
  DinnerPlace2: ["Dinner Dish 2a", "Dinner Dish 2b", "Dinner Dish 2c"],
  DinnerPlace3: ["Dinner Dish 3a", "Dinner Dish 3b", "Dinner Dish 3c"]
};

const showValidDishes = restaurant => {
  return dishes[restaurant.replace(/\s+/g, "")];
};

export default showValidDishes;
