export const validMeals = ["Breakfast", "Lunch", "Dinner"];

export const dataIsValid = meal => {
  return validMeals.includes(meal);
};
