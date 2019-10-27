const validMeals = ["Breakfast", "Lunch", "Dinner"];

const dataIsValid = meal => {
  return validMeals.includes(meal);
};

export default dataIsValid;
