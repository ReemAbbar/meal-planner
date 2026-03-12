import React, { useState } from 'react';
import axios from 'axios';

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

interface MealDetailProps {
  meal: Meal;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const MealDetail: React.FC<MealDetailProps> = ({ meal, onClose, onOrderSuccess }) => {
  const [extraProtein, setExtraProtein] = useState(false);
  const [extraSalmon, setExtraSalmon] = useState(false);
  const [extraNuts, setExtraNuts] = useState(false);
  const [extraVeggies, setExtraVeggies] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const EXTRA_PROTEIN_PRICE = 3.50;
  const EXTRA_SALMON_PRICE = 4.50;
  const EXTRA_NUTS_PRICE = 2.00;
  const EXTRA_VEGGIES_PRICE = 1.50;

  const calculateTotal = () => {
    let total = meal.price || 0;
    if (extraProtein) total += EXTRA_PROTEIN_PRICE;
    if (extraSalmon) total += EXTRA_SALMON_PRICE;
    if (extraNuts) total += EXTRA_NUTS_PRICE;
    if (extraVeggies) total += EXTRA_VEGGIES_PRICE;
    return total.toFixed(2);
  };

  const handleOrder = async () => {
    setOrdering(true);
    
    const customizations = [];
    if (extraProtein) customizations.push('Extra 100g Chicken/Meat');
    if (extraSalmon) customizations.push('Extra 100g Salmon');
    if (extraNuts) customizations.push('Extra Nuts');
    if (extraVeggies) customizations.push('Extra Veggies');
    
    try {
      await axios.post('http://localhost:5000/api/orders', {
        mealId: meal.id,
        customization: customizations.join(', '),
      });
      setOrderSuccess(true);
      setTimeout(() => {
        onOrderSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {orderSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ color: '#E8A89A', marginBottom: '0.5rem' }}>Order Placed!</h2>
            <p style={{ color: '#666' }}>Your meal will be prepared shortly.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#333' }}>{meal.name}</h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#999',
                }}
              >
                ×
              </button>
            </div>

            {/* Nutrition Facts */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333', fontSize: '1.1rem' }}>
                Nutrition Facts
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Calories</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
                    {meal.calories}
                  </div>
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Protein</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
                    {meal.protein || 0}g
                  </div>
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Carbs</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
                    {meal.carbs || 0}g
                  </div>
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Fat</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
                    {meal.fat || 0}g
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            {meal.ingredients && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#333', fontSize: '1.1rem' }}>
                  Ingredients
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>{meal.ingredients}</p>
              </div>
            )}

            {/* Price */}
            <div style={{ 
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#E8A89A' }}>${(meal.price || 0).toFixed(2)}</span>
            </div>

            {/* Customization */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333', fontSize: '1.1rem' }}>
                Customize Your Meal
              </h3>
              
              {/* Extra Protein Button */}
              <button
                onClick={() => setExtraProtein(!extraProtein)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  backgroundColor: extraProtein ? '#E8A89A' : 'white',
                  color: extraProtein ? 'white' : '#E8A89A',
                  border: `2px solid ${extraProtein ? '#E8A89A' : '#E8A89A'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span>
                  Extra 100g Chicken/Meat
                </span>
                <span style={{ fontWeight: 'bold' }}>+${EXTRA_PROTEIN_PRICE.toFixed(2)}</span>
              </button>

              {/* Extra Salmon Button */}
              <button
                onClick={() => setExtraSalmon(!extraSalmon)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  backgroundColor: extraSalmon ? '#E8A89A' : 'white',
                  color: extraSalmon ? 'white' : '#E8A89A',
                  border: `2px solid ${extraSalmon ? '#E8A89A' : '#E8A89A'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span>
                  Extra 100g Salmon
                </span>
                <span style={{ fontWeight: 'bold' }}>+${EXTRA_SALMON_PRICE.toFixed(2)}</span>
              </button>

              {/* Extra Nuts Button */}
              <button
                onClick={() => setExtraNuts(!extraNuts)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  backgroundColor: extraNuts ? '#E8A89A' : 'white',
                  color: extraNuts ? 'white' : '#E8A89A',
                  border: `2px solid ${extraNuts ? '#E8A89A' : '#E8A89A'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span>
                  Extra Nuts
                </span>
                <span style={{ fontWeight: 'bold' }}>+${EXTRA_NUTS_PRICE.toFixed(2)}</span>
              </button>

              {/* Extra Veggies Button */}
              <button
                onClick={() => setExtraVeggies(!extraVeggies)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: extraVeggies ? '#E8A89A' : 'white',
                  color: extraVeggies ? 'white' : '#E8A89A',
                  border: `2px solid ${extraVeggies ? '#E8A89A' : '#E8A89A'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span>
                  Extra Veggies
                </span>
                <span style={{ fontWeight: 'bold' }}>+${EXTRA_VEGGIES_PRICE.toFixed(2)}</span>
              </button>

              {/* Total Price */}
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '2px solid #e9ecef'
              }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#333' }}>Total:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E8A89A' }}>${calculateTotal()}</span>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              disabled={ordering}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: ordering ? '#ccc' : '#E8A89A',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: ordering ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => {
                if (!ordering) e.currentTarget.style.backgroundColor = '#D68A7C';
              }}
              onMouseOut={(e) => {
                if (!ordering) e.currentTarget.style.backgroundColor = '#E8A89A';
              }}
            >
              {ordering ? 'Placing Order...' : 'Order This Meal'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
