"use client";

import { useState } from 'react';

// Static data for the marketplace
const marketItems = [
  { id:   1, name: 'Tomato Seeds', price: '$10', imageUrl: '/tomato.png' },
  { id:   2, name: 'Corn Seeds', price: '$15', imageUrl: '/corn.png' },
  { id:   3, name: 'Wheat Seeds', price: '$20', imageUrl: '/wheat.png' },
  { id:   1, name: 'Tomato Seeds', price: '$10', imageUrl: '/tomato.png' },
  { id:   2, name: 'Corn Seeds', price: '$15', imageUrl: '/corn.png' },
  { id:   3, name: 'Wheat Seeds', price: '$20', imageUrl: '/wheat.png' },
  { id:   1, name: 'Groundnut Seeds', price: '$10', imageUrl: '/groundnut.png' },
  { id:   2, name: 'Cotton Seeds', price: '$15', imageUrl: '/cotton.png' },
  { id:   3, name: 'Soyabean Seeds', price: '$20', imageUrl: '/soyabean.png' },
  // Add more items as needed
];

const Marketplace = () => {
  const [cart, setCart] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] ||   0) +   1
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      if (prevCart[itemId] >   1) {
        return { ...prevCart, [itemId]: prevCart[itemId] -   1 };
      } else {
        const { [itemId]: _, ...rest } = prevCart;
        return rest;
      }
    });
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity *   10,   0);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container mx-auto px-4 relative">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {marketItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center justify-center">
            <img src={item.imageUrl} alt={item.name} className="object-cover w-20 h-20" />
            <div className="p-2">
              <p className="text-xs font-semibold truncate">{item.name}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                  -
                </button>
                <span className="text-xs">{cart[item.id] ||   0}</span>
                <button onClick={() => addToCart(item)} className="bg-green-500 text-white px-2 py-1 rounded-md">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className={`fixed top-0 right-0 w-64 h-full bg-green-500 p-4 overflow-y-scroll transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? '' : 'translate-x-full'}`} id="sidebar">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <ul className="divide-y divide-gray-200">
          {Object.keys(cart).map((itemId) => {
            const item = marketItems.find(i => i.id === parseInt(itemId));
            return (
              <li key={itemId} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {cart[item.id]}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-8">
          <p className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
        </div>
        <div>
            <button className='p-3 rounded-md bg-white' onClick={()=>alert("Your order is placed. Sit back and chill, your crop will be delivered to you in a few days :)")}>Buy Now</button>
        </div>
      </aside>
      <footer className="fixed bottom-0 left-0 right-0 bg-green-800 p-4 text-white">
        <button onClick={toggleSidebar} className="w-full">
          Checkout
        </button>
      </footer>
    </div>
  );
};

export default Marketplace;
