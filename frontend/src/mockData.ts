// Mock data for testing without database
export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string;
  image_url: string;
}

export const mockMeals: Meal[] = [
  {
    id: 1,
    name: 'Grilled Chicken Bowl',
    calories: 580,
    protein: 45,
    carbs: 52,
    fat: 18,
    ingredients: 'Grilled Chicken Breast, Brown Rice, Steamed Broccoli, Carrots, Teriyaki Glaze',
    image_url: '/images/meals/chicken-bowl.jpg',
  },
  {
    id: 2,
    name: 'Caesar Salad with Grilled Chicken',
    calories: 420,
    protein: 35,
    carbs: 28,
    fat: 18,
    ingredients: 'Romaine Lettuce, Grilled Chicken, Parmesan, Caesar Dressing, Croutons',
    image_url: '/images/meals/caesar-salad.jpg',
  },
  {
    id: 3,
    name: 'Grilled Salmon with Quinoa',
    calories: 520,
    protein: 42,
    carbs: 38,
    fat: 22,
    ingredients: 'Atlantic Salmon, Quinoa, Asparagus, Lemon Butter Sauce, Cherry Tomatoes',
    image_url: '/images/meals/salmon-quinoa.jpg',
  },
  {
    id: 4,
    name: 'Veggie Buddha Bowl',
    calories: 450,
    protein: 18,
    carbs: 62,
    fat: 15,
    ingredients: 'Chickpeas, Sweet Potato, Kale, Quinoa, Tahini Dressing, Avocado',
    image_url: '/images/meals/buddha-bowl.jpg',
  },
  {
    id: 5,
    name: 'Protein Power Bowl',
    calories: 620,
    protein: 55,
    carbs: 50,
    fat: 20,
    ingredients: 'Grilled Chicken, Black Beans, Brown Rice, Avocado, Salsa, Greek Yogurt',
    image_url: '/images/meals/protein-bowl.jpg',
  },
  {
    id: 6,
    name: 'Mediterranean Wrap',
    calories: 480,
    protein: 28,
    carbs: 52,
    fat: 18,
    ingredients: 'Whole Wheat Wrap, Grilled Chicken, Hummus, Feta, Cucumber, Tomato',
    image_url: '/images/meals/med-wrap.jpg',
  },
  {
    id: 7,
    name: 'Steak & Sweet Potato',
    calories: 650,
    protein: 48,
    carbs: 55,
    fat: 24,
    ingredients: 'Sirloin Steak, Sweet Potato Mash, Green Beans, Garlic Butter',
    image_url: '/images/meals/steak-potato.jpg',
  },
  {
    id: 8,
    name: 'Poke Bowl',
    calories: 540,
    protein: 38,
    carbs: 58,
    fat: 16,
    ingredients: 'Sushi Rice, Ahi Tuna, Edamame, Seaweed, Cucumber, Soy Ginger Dressing',
    image_url: '/images/meals/poke-bowl.jpg',
  },
  {
    id: 9,
    name: 'Turkey & Avocado Sandwich',
    calories: 460,
    protein: 32,
    carbs: 42,
    fat: 18,
    ingredients: 'Whole Grain Bread, Turkey Breast, Avocado, Lettuce, Tomato, Mustard',
    image_url: '/images/meals/turkey-sandwich.jpg',
  },
  {
    id: 10,
    name: 'Vegan Burrito Bowl',
    calories: 520,
    protein: 22,
    carbs: 68,
    fat: 16,
    ingredients: 'Black Beans, Brown Rice, Corn, Peppers, Guacamole, Salsa',
    image_url: '/images/meals/burrito-bowl.jpg',
  },
  {
    id: 11,
    name: 'Greek Chicken Bowl',
    calories: 490,
    protein: 40,
    carbs: 45,
    fat: 18,
    ingredients: 'Grilled Chicken, Rice, Tzatziki, Tomato, Cucumber, Olives, Feta',
    image_url: '/images/meals/greek-bowl.jpg',
  },
  {
    id: 12,
    name: 'Shrimp Stir Fry',
    calories: 440,
    protein: 35,
    carbs: 48,
    fat: 14,
    ingredients: 'Shrimp, Mixed Vegetables, Brown Rice, Soy Sauce, Ginger',
    image_url: '/images/meals/shrimp-stirfry.jpg',
  },
  {
    id: 13,
    name: 'BBQ Chicken Pizza',
    calories: 620,
    protein: 38,
    carbs: 62,
    fat: 22,
    ingredients: 'Whole Wheat Crust, BBQ Chicken, Red Onion, Mozzarella, Cilantro',
    image_url: '/images/meals/bbq-pizza.jpg',
  },
  {
    id: 14,
    name: 'Breakfast Power Bowl',
    calories: 520,
    protein: 28,
    carbs: 55,
    fat: 18,
    ingredients: 'Scrambled Eggs, Turkey Bacon, Sweet Potato Hash, Avocado, Spinach',
    image_url: '/images/meals/breakfast-bowl.jpg',
  },
  {
    id: 15,
    name: 'Miso Glazed Cod',
    calories: 460,
    protein: 42,
    carbs: 35,
    fat: 18,
    ingredients: 'Cod Fillet, Jasmine Rice, Bok Choy, Miso Glaze, Sesame Seeds',
    image_url: '/images/meals/miso-cod.jpg',
  },
  {
    id: 16,
    name: 'Falafel Bowl',
    calories: 540,
    protein: 20,
    carbs: 65,
    fat: 20,
    ingredients: 'Falafel, Hummus, Tabbouleh, Pita, Tahini Sauce, Mixed Greens',
    image_url: '/images/meals/falafel-bowl.jpg',
  },
  {
    id: 17,
    name: 'Chicken Fajita Bowl',
    calories: 580,
    protein: 42,
    carbs: 52,
    fat: 20,
    ingredients: 'Fajita Chicken, Peppers, Onions, Black Beans, Rice, Sour Cream',
    image_url: '/images/meals/fajita-bowl.jpg',
  },
  {
    id: 18,
    name: 'Tuna Poke Bowl',
    calories: 500,
    protein: 36,
    carbs: 54,
    fat: 14,
    ingredients: 'Sushi Rice, Ahi Tuna, Mango, Edamame, Seaweed Salad, Ponzu',
    image_url: '/images/meals/tuna-poke.jpg',
  },
  {
    id: 19,
    name: 'Asian Noodle Bowl',
    calories: 560,
    protein: 32,
    carbs: 68,
    fat: 16,
    ingredients: 'Rice Noodles, Grilled Chicken, Vegetables, Peanut Sauce, Lime',
    image_url: '/images/meals/noodle-bowl.jpg',
  },
  {
    id: 20,
    name: 'Margherita Flatbread',
    calories: 480,
    protein: 24,
    carbs: 58,
    fat: 16,
    ingredients: 'Flatbread, Fresh Mozzarella, Tomato, Basil, Olive Oil, Balsamic',
    image_url: '/images/meals/margherita.jpg',
  },
];

export interface Order {
  id: number;
  meal_id: number;
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  customization: string;
  ordered_at: string;
}

export const mockOrders: Order[] = [];

// Mock API mode flag
let useMockData = false;

export const setMockMode = (enabled: boolean) => {
  useMockData = enabled;
};

export const isMockMode = () => useMockData;
