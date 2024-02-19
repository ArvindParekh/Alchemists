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
    // Convert crops array to a string representation suitable for query params
    const cropsString = encodeURIComponent(JSON.stringify(crops));
  
    // Redirect to the dashboard page with crops data as query params
    window.location.href = `/dashboard?crops=${cropsString}`;
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

      <button onClick={handleSubmit} className="bg-black rounded-lg outline-none border-none text-white font-medium p-2">
        Submit
      </button>
    </div>
  );
};

export default TopCrops;
