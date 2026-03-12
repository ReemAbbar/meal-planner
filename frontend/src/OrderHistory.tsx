import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  meal_id: number;
  meal_name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  customization: string;
  ordered_at: string;
}

export const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>Order History</h2>
      
      {orders.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            color: '#666',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#E8A89A' }}>No Orders</div>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>No orders yet. Start ordering meals!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                borderLeft: '4px solid #E8A89A',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.25rem' }}>
                    {order.meal_name}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Ordered: {formatDate(order.ordered_at)}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: '#FFF5F0',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    color: '#E8A89A',
                  }}
                >
                  {order.calories} cal
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  marginBottom: order.customization ? '1rem' : 0,
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Protein: <strong style={{ color: '#333' }}>{order.protein || 0}g</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Carbs: <strong style={{ color: '#333' }}>{order.carbs || 0}g</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Fat: <strong style={{ color: '#333' }}>{order.fat || 0}g</strong>
                </div>
              </div>

              {order.customization && (
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    marginTop: '1rem',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                    Customization:
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#333' }}>{order.customization}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
