import React from 'react';

interface SubscriptionPlan {
  id: number;
  daysPerWeek: 5 | 7;
  mealsPerDay: 3 | 5;
  selectedMealCount: number;
  monthlyPrice: string;
  createdAt: string;
}

export const MySubscriptionPlan: React.FC = () => {
  const [subscription, setSubscription] = React.useState<SubscriptionPlan | null>(null);
  
  React.useEffect(() => {
    // Load subscription from localStorage
    const savedSubscription = localStorage.getItem('mealPlannerSubscription');
    if (savedSubscription) {
      try {
        const data = JSON.parse(savedSubscription);
        setSubscription({
          id: 1,
          daysPerWeek: data.daysPerWeek,
          mealsPerDay: data.mealsPerDay,
          selectedMealCount: data.selectedMealCount,
          monthlyPrice: data.monthlyPrice,
          createdAt: data.createdAt
        });
      } catch (err) {
        console.error('Error loading subscription:', err);
      }
    }
  }, []);

  const hasSubscription = subscription !== null;

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      localStorage.removeItem('mealPlannerSubscription');
      setSubscription(null);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '0.5rem' }}>My Subscription Plan</h2>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          View and manage your active meal subscription
        </p>
      </div>

      {!hasSubscription ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '2px dashed #ddd'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ color: '#666', marginBottom: '1rem', fontSize: '1.5rem' }}>No Active Subscription</h3>
          <p style={{ color: '#999', fontSize: '1.1rem', marginBottom: '2rem' }}>
            You don't have an active subscription plan yet.
          </p>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>
            💡 Visit the <strong>Subscriptions</strong> tab to create a plan and save 15%!
          </p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #e9ecef'
          }}>
            <div>
              <h3 style={{ margin: 0, color: '#333', fontSize: '1.8rem' }}>Active Subscription</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#E8A89A', fontWeight: '600' }}>
                Currently Active
              </p>
            </div>
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E8A89A' }}>
                ${subscription?.monthlyPrice || '0.00'}
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Delivery Days</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E8A89A' }}>
                {subscription?.daysPerWeek} Days/Week
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                {subscription?.daysPerWeek === 5 ? 'Weekdays Only' : 'Full Week'}
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Meals Per Day</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E8A89A' }}>
                {subscription?.mealsPerDay} Meals/Day
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                {subscription?.mealsPerDay === 3 ? 'Breakfast, Lunch, Dinner' : 'Includes Snacks'}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{
            padding: '1.5rem 0',
            marginBottom: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#8B5A4D', fontSize: '1.2rem' }}>Monthly Summary</h4>
            <div style={{ display: 'grid', gap: '0.75rem', color: '#8B5A4D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem' }}>
                <span>Total meals per month:</span>
                <span style={{ fontWeight: '600' }}>
                  {subscription ? subscription.daysPerWeek * subscription.mealsPerDay * 4 : 0} meals
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem' }}>
                <span>Meal rotation pool:</span>
                <span style={{ fontWeight: '600' }}>
                  {subscription?.selectedMealCount || 0} meals
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem' }}>
                <span>Subscription discount:</span>
                <span style={{ fontWeight: '600', color: '#E8A89A' }}>
                  15% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              style={{
                padding: '1rem',
                backgroundColor: 'white',
                color: '#E8A89A',
                border: '2px solid #E8A89A',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#E8A89A';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#E8A89A';
              }}
            >
              Modify Plan
            </button>
            <button
              onClick={handleCancelSubscription}
              style={{
                padding: '1rem',
                backgroundColor: 'white',
                color: '#dc3545',
                border: '2px solid #dc3545',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#dc3545';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#dc3545';
              }}
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h4 style={{ margin: '0 0 0.75rem 0', color: '#8B5A4D', fontSize: '1.1rem' }}>
          ℹ️ How Subscriptions Work
        </h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#8B5A4D', lineHeight: '1.8' }}>
          <li>Meals are delivered according to your selected schedule</li>
          <li>Your selected meals rotate throughout the month</li>
          <li>Save 15% compared to ordering individually</li>
          <li>Modify or cancel your plan anytime</li>
        </ul>
      </div>
    </div>
  );
};
