const restaurants = {
  Breakfast: ["Breakfast Place 1", "Breakfast Place 2", "Breakfast Place 3"],
  Lunch: ["Lunch Place 1", "Lunch Place 2", "Lunch Place 3"],
  Dinner: ["Dinner Place 1", "Dinner Place 2", "Dinner Place 3"]
};

const showValidRestaurants = meal => {
  return restaurants[meal];
};

export default showValidRestaurants;
