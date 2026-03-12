import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MealDetail } from './MealDetail';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  ingredients?: string;
  image_url?: string;
  price?: number;
}

export const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/meals');
      setMeals(res.data);
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAdd = async () => {
    if (!name || !calories) {
      alert('Please enter meal name and calories');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/meals', {
        name,
        calories: parseInt(calories),
        protein: protein ? parseInt(protein) : 0,
        carbs: carbs ? parseInt(carbs) : 0,
        fat: fat ? parseInt(fat) : 0,
        ingredients,
        price: price ? parseFloat(price) : 0,
      });
      setName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      setIngredients('');
      setPrice('');
      setShowAddForm(false);
      fetchMeals();
    } catch (err) {
      console.error('Error adding meal:', err);
      alert('Failed to add meal');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#E8A89A',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Meal'}
        </button>
      </div>

      {/* Add Meal Form */}
      {showAddForm && (
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Add New Meal</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              placeholder="Meal name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
            />
            <input
              type="number"
              placeholder="Calories *"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price ($) *"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
            />
            <input
              type="text"
              placeholder="Ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                gridColumn: '1 / -1',
              }}
            />
          </div>
          <button
            onClick={handleAdd}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#E8A89A',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600',
              width: '100%',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Add Meal
          </button>
        </div>
      )}

      {/* Meals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {meals.map((meal) => (
          <div
            key={meal.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              overflow: 'hidden',
              border: '1px solid #F5E5E0',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 168, 154, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            }}
          >
            {/* Meal Image */}
            <div
              style={{
                width: '100%',
                height: '200px',
                background: meal.image_url
                  ? `url(${meal.image_url}) center/cover`
                  : '#FFF5F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                position: 'relative',
              }}
            >
              {!meal.image_url && <div style={{ fontSize: '2rem', color: '#E8A89A' }}>M</div>}
              {meal.image_url && (
                <img
                  src={meal.image_url}
                  alt={meal.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = '#FFF5F0';
                    e.currentTarget.parentElement!.innerHTML = '<div style="font-size: 3rem; color: #E8A89A">M</div>';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              )}
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                color: '#333', 
                fontSize: '1.25rem',
                minHeight: '3rem',
                display: 'flex',
                alignItems: 'center'
              }}>{meal.name}</h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FFF5F0',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Calories</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>{meal.calories}</div>
                </div>
                <div
                  style={{
                    backgroundColor: '#FFF5F0',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Protein</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>{meal.protein || 0}g</div>
                </div>
                <div
                  style={{
                    backgroundColor: '#FFF5F0',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Carbs</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>{meal.carbs || 0}g</div>
                </div>
                <div
                  style={{
                    backgroundColor: '#FFF5F0',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Fat</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>{meal.fat || 0}g</div>
                </div>
              </div>

              {/* Price Display */}
              <div style={{
                textAlign: 'center',
                marginBottom: '1rem',
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#E8A89A' }}>
                  ${(meal.price || 0).toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => setSelectedMeal(meal)}
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#E8A89A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background-color 0.2s',
                  fontFamily: "'Poppins', sans-serif",
                }}
                onMouseOver={(e) => {
                  e.stopPropagation();
                  e.currentTarget.style.backgroundColor = '#D68A7C';
                }}
                onMouseOut={(e) => {
                  e.stopPropagation();
                  e.currentTarget.style.backgroundColor = '#E8A89A';
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {meals.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <p style={{ fontSize: '1.1rem', margin: 0 }}>No meals available. Add your first meal to get started!</p>
        </div>
      )}

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealDetail
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onOrderSuccess={fetchMeals}
        />
      )}
    </div>
  );
};
