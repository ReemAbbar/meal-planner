import React, { useState } from 'react';
import { MealList } from './MealList';
import { OrderHistory } from './OrderHistory';
import { Subscription } from './Subscription';
import { MySubscriptionPlan } from './MySubscriptionPlan';

type TabType = 'meals' | 'orders' | 'subscription' | 'myplan';

function App() {
  const [activeTab, setActiveTab] = React.useState<TabType>('meals');
  const mealsRef = React.useRef<HTMLDivElement>(null);
  const subscriptionRef = React.useRef<HTMLDivElement>(null);

  const scrollToMeals = () => {
    mealsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTab('meals');
  };

  const scrollToSubscriptions = () => {
    mealsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTab('subscription');
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: '100vh',
        backgroundColor: '#FFF5F0',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          backgroundColor: '#F5D5C8',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '5rem',
          overflow: 'hidden',
        }}
      >
        {/* Hero Text */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1
            style={{
              fontSize: '8rem',
              fontWeight: '900',
              color: 'white',
              margin: 0,
              lineHeight: '1',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            MEAL
            <br />
            PLANNER
          </h1>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={scrollToMeals}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.5rem',
                fontWeight: '600',
                backgroundColor: 'white',
                color: '#E8A89A',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Nutritious Choices
            </button>
            <button
              onClick={scrollToSubscriptions}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.5rem',
                fontWeight: '600',
                backgroundColor: '#E8A89A',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#D68A7C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#E8A89A';
              }}
            >
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Watermelon - Top Right */}
        <img
          src="/images/r.png"
          alt="Watermelon"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '850px',
            height: 'auto',
            transition: 'transform 0.4s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        {/* Salad Bowl with Chopsticks - Bottom Center-Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            transition: 'transform 0.4s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <img
            src="/images/dish.png"
            alt="Salad Bowl"
            style={{
              width: '950px',
              height: 'auto',
            }}
          />
          <img
            src="/images/chopstick.png"
            alt="Chopsticks"
            style={{
              position: 'absolute',
              top: '140px',
              right: '120px',
              width: '780px',
              height: 'auto',
            }}
          />
        </div>

        {/* Tomatoes - Bottom Left */}
        <img
          src="/images/tom.png"
          alt="Tomatoes"
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '800px',
            height: 'auto',
            transition: 'transform 0.4s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>

      {/* Main Content Container */}
      <div ref={mealsRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('meals')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'meals' ? '#E8A89A' : 'transparent',
                color: activeTab === 'meals' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Meals
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'subscription' ? '#E8A89A' : 'transparent',
                color: activeTab === 'subscription' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'orders' ? '#E8A89A' : 'transparent',
                color: activeTab === 'orders' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('myplan')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === 'myplan' ? '#E8A89A' : 'transparent',
                color: activeTab === 'myplan' ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              My Plan
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          minHeight: '500px',
        }}
      >
        {activeTab === 'meals' && <MealList />}
        {activeTab === 'subscription' && <Subscription />}
        {activeTab === 'orders' && <OrderHistory />}
        {activeTab === 'myplan' && <MySubscriptionPlan />}
      </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#E8A89A',
          color: 'white',
          padding: '3rem 5rem',
          marginTop: '4rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '2rem',
          }}
        >
          {/* About Section */}
          <div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Meal Planner
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                opacity: 0.9,
              }}
            >
              Delivering nutritious and delicious meals to your doorstep.
              Choose from our curated selection or create your custom meal plan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('meals');
                }}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                Browse Meals
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('subscription');
                }}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                Subscription Plans
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('orders');
                }}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                Order History
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('myplan');
                }}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                My Plan
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.9 }}>
              <p style={{ margin: 0 }}>Email: hello@mealplanner.com</p>
              <p style={{ margin: 0 }}>Phone: (555) 123-4567</p>
              <p style={{ margin: 0 }}>Hours: Mon-Fri, 9AM-6PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            opacity: 0.8,
          }}
        >
          <p style={{ margin: 0 }}>
            © 2026 Meal Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
