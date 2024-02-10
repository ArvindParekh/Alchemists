'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TopCrops = () => {
  const [crops, setCrops] = useState([
    { name: '', price: '' },
    { name: '', price: '' },
    { name: '', price: '' },
  ]);

  const handleCropSelection = (index, name, price) => {
    const newCrops = [...crops];
    newCrops[index] = { name, price };
    setCrops(newCrops);
  };

  const handlePriceChange = (index, event) => {
    const newCrops = [...crops];
    newCrops[index].price = event.target.value;
    setCrops(newCrops);
  };

  const handleSubmit = async () => {
    // Example API call
    try {
      console.log('Inside handleSubmit');
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crops }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);
      // Handle successful API response here
    } catch (error) {
      console.error('Error sending data to API:', error);
      // Handle errors here
    }
  };

  return (
    <div className="mx-5">
      <h1 className="text-3xl font-semibold text-center mt-5">We just want you to import your top  3 crops</h1>

      {['Crop  1', 'Crop  2', 'Crop  3'].map((cropLabel, index) => (
        <div key={cropLabel} className="flex gap-2 justify-center flex-col mt-10 mb-5">
          <span className="font-semibold text-lg">{cropLabel}</span>
          <Select onValueChange={(value) => handleCropSelection(index, value, crops[index].price)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue
                placeholder={`Enter ${cropLabel}`}
                value={crops[index].name}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Bajra'>Bajra</SelectItem>
              <SelectItem value='Juwar'>Juwar</SelectItem>
              <SelectItem value='Corn'>Corn</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter Price"
            value={crops[index].price}
            onChange={(event) => handlePriceChange(index, event)}
          />
        </div>
      ))}

      <Link href='/dashboard' onClick={handleSubmit} className="bg-black rounded-lg outline-none border-none text-white font-medium p-2">
        Submit
      </Link>
    </div>
  );
};

export default TopCrops;
