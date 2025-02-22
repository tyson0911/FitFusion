import { useState } from "react";

const foodItems = [
  { name: "Egg", protein: 6, calories: 70, cost: 5, type: "nonveg" },
  { name: "Chicken Breast", protein: 31, calories: 165, cost: 50, type: "nonveg" },
  { name: "Tofu", protein: 8, calories: 76, cost: 20, type: "veg" },
  { name: "Lentils", protein: 9, calories: 116, cost: 10, type: "veg" },
  { name: "Milk", protein: 8, calories: 103, cost: 12, type: "veg" },
  { name: "Paneer", protein: 18, calories: 265, cost: 40, type: "veg" },
  { name: "Fish", protein: 22, calories: 206, cost: 60, type: "nonveg" },
  { name: "Almonds", protein: 21, calories: 576, cost: 80, type: "veg" },
  { name: "Whey Protein", protein: 24, calories: 120, cost: 100, type: "veg" },
  { name: "Soybeans", protein: 36, calories: 446, cost: 30, type: "veg" },
];

export default function FitnessDietPlanner() {
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");
  const [dietType, setDietType] = useState("mixed");
  const [costEfficient, setCostEfficient] = useState(true);
  const [dietPlan, setDietPlan] = useState([]);
  const [bmi, setBmi] = useState(null);
  
  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const generateDiet = () => {
    const filteredFoods = foodItems.filter(food => dietType === "mixed" || food.type === "veg");
    const sortedFoods = [...filteredFoods].sort((a, b) => 
      costEfficient ? (b.protein / b.cost) - (a.protein / a.cost) : b.protein - a.protein
    );
    
    const mealTimes = ["Breakfast", "Lunch", "Snack", "Dinner"];
    const structuredDiet = mealTimes.map((meal, index) => ({ meal, food: sortedFoods[index] }));
    
    setDietPlan(structuredDiet);
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">Fitness Diet Planner</h1>

      <div className="grid gap-4 bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <label className="block">
          Gender:
          <select onChange={(e) => setGender(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 text-white border rounded-lg">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label className="block">
          Weight (kg):
          <input type="number" onChange={(e) => setWeight(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 text-white border rounded-lg" />
        </label>

        <label className="block">
          Height (cm):
          <input type="number" onChange={(e) => setHeight(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 text-white border rounded-lg" />
        </label>

        <button onClick={calculateBMI} className="bg-blue-500 text-black py-3 rounded-lg hover:bg-blue-700 transition">
          Calculate BMI
        </button>

        {bmi && (
          <div className="text-center text-lg font-bold text-orange-400">Your BMI: {bmi}</div>
        )}

        <label className="block">
          Exercise Time:
          <select onChange={(e) => setExerciseTime(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 text-white border rounded-lg">
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="block">
          Diet Type:
          <select onChange={(e) => setDietType(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 text-white border rounded-lg">
            <option value="mixed">Mixed Diet (Veg + Non-Veg)</option>
            <option value="veg">Vegetarian</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={costEfficient} onChange={() => setCostEfficient(!costEfficient)} className="w-5 h-5" />
          Cost-Efficient Diet
        </label>

        <button onClick={generateDiet} className="bg-orange-500 text-black py-3 rounded-lg hover:bg-orange-700 transition">
          Generate Diet Plan
        </button>
      </div>

      {dietPlan.length > 0 && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">Personalized Diet Plan</h2>
          <div className="grid gap-4">
            {dietPlan.map(({ meal, food }, index) => (
              <div key={index} className="p-4 bg-gray-700 border-l-4 border-orange-500 rounded-lg shadow-md">
                <p className="text-lg font-bold text-orange-400">{meal}</p>
                <p className="text-white">{food.name}</p>
                <p className="text-sm text-gray-300">Protein: {food.protein}g | Calories: {food.calories} kcal | Cost: ₹{food.cost}</p>
                <p className="text-sm text-gray-400">Type: {food.type === "veg" ? "Vegetarian" : "Non-Vegetarian"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}