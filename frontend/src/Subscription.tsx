import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  price?: number;
}

export const Subscription: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [daysPerWeek, setDaysPerWeek] = useState<5 | 7>(5);
  const [mealsPerDay, setMealsPerDay] = useState<3 | 5>(3);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/meals');
      setMeals(res.data);
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  };

  const toggleMealSelection = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(selectedMeals.filter(id => id !== mealId));
    } else {
      setSelectedMeals([...selectedMeals, mealId]);
    }
  };

  const getFixedPrice = () => {
    // Fixed pricing based on plan
    if (daysPerWeek === 5 && mealsPerDay === 3) return 149;
    if (daysPerWeek === 5 && mealsPerDay === 5) return 249;
    if (daysPerWeek === 7 && mealsPerDay === 3) return 199;
    if (daysPerWeek === 7 && mealsPerDay === 5) return 329;
    return 0;
  };

  const calculateMonthlyPrice = () => {
    return getFixedPrice().toFixed(2);
  };

  const calculateSavings = () => {
    // Calculate savings based on average meal price of $12
    const avgMealPrice = 12;
    const totalMealsPerMonth = daysPerWeek * mealsPerDay * 4;
    const regularPrice = avgMealPrice * totalMealsPerMonth;
    const subscriptionPrice = getFixedPrice();
    
    return (regularPrice - subscriptionPrice).toFixed(2);
  };

  const handleSubscribe = async () => {
    if (selectedMeals.length === 0) {
      alert('Please select at least one meal for your subscription');
      return;
    }

    setOrdering(true);
    try {
      // Store subscription in localStorage
      const subscriptionData = {
        daysPerWeek,
        mealsPerDay,
        selectedMealCount: selectedMeals.length,
        monthlyPrice: calculateMonthlyPrice(),
        savings: calculateSavings(),
        createdAt: new Date().toISOString(),
        selectedMealIds: selectedMeals
      };
      
      localStorage.setItem('mealPlannerSubscription', JSON.stringify(subscriptionData));
      
      // In a real app, you'd have a subscription endpoint
      // For now, we'll just show success
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        setSelectedMeals([]);
      }, 3000);
    } catch (err) {
      console.error('Error creating subscription:', err);
      alert('Failed to create subscription. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '0.5rem' }}>Monthly Meal Subscriptions</h2>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Fixed pricing - Choose your schedule and save money!
        </p>
      </div>

      {/* Pricing Overview */}
      <div style={{
        padding: '2rem 0',
        marginBottom: '2rem'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: '#8B5A4D', fontSize: '1.3rem', textAlign: 'center' }}>
          Monthly Plans
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.05rem', color: '#666', marginBottom: '0.5rem' }}>5 Days × 3 Meals</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E8A89A' }}>$149</div>
            <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.25rem' }}>60 meals/month</div>
          </div>
          <div style={{
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.05rem', color: '#666', marginBottom: '0.5rem' }}>5 Days × 5 Meals</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E8A89A' }}>$249</div>
            <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.25rem' }}>100 meals/month</div>
          </div>
          <div style={{
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.05rem', color: '#666', marginBottom: '0.5rem' }}>7 Days × 3 Meals</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E8A89A' }}>$199</div>
            <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.25rem' }}>84 meals/month</div>
          </div>
          <div style={{
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.05rem', color: '#666', marginBottom: '0.5rem' }}>7 Days × 5 Meals</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E8A89A' }}>$329</div>
            <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.25rem' }}>140 meals/month</div>
          </div>
        </div>
      </div>

      {orderSuccess ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#d4edda',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{ color: '#155724', marginBottom: '0.5rem', fontSize: '2rem' }}>Subscription Created!</h3>
          <p style={{ color: '#155724', fontSize: '1.1rem' }}>Your monthly meal plan is all set.</p>
        </div>
      ) : (
        <>
          {/* Plan Selection */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333', fontSize: '1.5rem' }}>
              Choose Your Plan
            </h3>

            {/* Days per Week */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                Days per Week
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => setDaysPerWeek(5)}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: daysPerWeek === 5 ? '#E8A89A' : 'white',
                    color: daysPerWeek === 5 ? 'white' : '#333',
                    border: `2px solid ${daysPerWeek === 5 ? '#E8A89A' : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  5 Days/Week
                  <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
                    (Weekdays Only)
                  </div>
                </button>
                <button
                  onClick={() => setDaysPerWeek(7)}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: daysPerWeek === 7 ? '#E8A89A' : 'white',
                    color: daysPerWeek === 7 ? 'white' : '#333',
                    border: `2px solid ${daysPerWeek === 7 ? '#E8A89A' : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  7 Days/Week
                  <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
                    (Full Week)
                  </div>
                </button>
              </div>
            </div>

            {/* Meals per Day */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                Meals per Day
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => setMealsPerDay(3)}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: mealsPerDay === 3 ? '#E8A89A' : 'white',
                    color: mealsPerDay === 3 ? 'white' : '#333',
                    border: `2px solid ${mealsPerDay === 3 ? '#E8A89A' : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  3 Meals/Day
                  <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
                    (Breakfast, Lunch, Dinner)
                  </div>
                </button>
                <button
                  onClick={() => setMealsPerDay(5)}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: mealsPerDay === 5 ? '#E8A89A' : 'white',
                    color: mealsPerDay === 5 ? 'white' : '#333',
                    border: `2px solid ${mealsPerDay === 5 ? '#E8A89A' : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  5 Meals/Day
                  <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
                    (Includes Snacks)
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Meal Selection */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333', fontSize: '1.5rem' }}>
              Select Your Meals
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Choose the meals you'd like to receive. We'll rotate them throughout the month.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {meals.map(meal => (
                <button
                  key={meal.id}
                  onClick={() => toggleMealSelection(meal.id)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedMeals.includes(meal.id) ? '#FFF5F0' : 'white',
                    border: `2px solid ${selectedMeals.includes(meal.id) ? '#E8A89A' : '#ddd'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                    {meal.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {meal.calories} cal | {meal.protein}g protein
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div style={{
            padding: '2rem 0',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#8B5A4D', fontSize: '1.5rem' }}>
              Summary
            </h3>
            <div style={{ display: 'grid', gap: '1rem', color: '#8B5A4D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                <span>Plan:</span>
                <span style={{ fontWeight: '600' }}>
                  {daysPerWeek} days/week × {mealsPerDay} meals/day
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                <span>Total meals per month:</span>
                <span style={{ fontWeight: '600' }}>
                  {daysPerWeek * mealsPerDay * 4} meals
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                <span>Selected meals for rotation:</span>
                <span style={{ fontWeight: '600' }}>
                  {selectedMeals.length} meal{selectedMeals.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div style={{ 
                borderTop: '1px solid #E8A89A', 
                paddingTop: '1rem', 
                marginTop: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <span>You save vs. ordering individually:</span>
                  <span style={{ fontWeight: '600', color: '#E8A89A' }}>
                    ${calculateSavings()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#E8A89A' }}>
                    ${calculateMonthlyPrice()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={ordering || selectedMeals.length === 0}
            style={{
              width: '100%',
              padding: '1.5rem',
              backgroundColor: ordering || selectedMeals.length === 0 ? '#ccc' : '#E8A89A',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.3rem',
              fontWeight: '700',
              cursor: ordering || selectedMeals.length === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              fontFamily: "'Poppins', sans-serif",
            }}
            onMouseOver={(e) => {
              if (!ordering && selectedMeals.length > 0) {
                e.currentTarget.style.backgroundColor = '#D68A7C';
              }
            }}
            onMouseOut={(e) => {
              if (!ordering && selectedMeals.length > 0) {
                e.currentTarget.style.backgroundColor = '#E8A89A';
              }
            }}
          >
            {ordering ? 'Processing...' : selectedMeals.length === 0 ? 'Select Meals to Subscribe' : `Subscribe Now - $${calculateMonthlyPrice()}/month`}
          </button>
        </>
      )}
    </div>
  );
};
