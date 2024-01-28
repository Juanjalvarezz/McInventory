import React from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Logo from './Assets/Logo.png';

const App = () => {
  return (
    <div>
      <div className="flex items-center -mb-12 px-10 py-5">
        <img src={Logo} alt="Logo" className="-mt-12 w-40" />
        <h1 className="text-5xl -mt-8 -pl-12 font-bold">Inventario</h1>
      </div>
      <div id="juan" className="container mx-auto p-7 px-12">
        {/*pan superior */}
        <div className="bg-[#B0867D] h-12 w-full mb-1 rounded-t-full"></div>
        
        
        <AddProductForm />
        <ProductList />

  
        {/*pan inferior */}
        <div className="bg-[#633B32] h-10 w-full -mt-5 rounded-b-md"></div>
        <div className="bg-[#B0867D] h-10 w-full mt-1 rounded-b-md"></div>
      </div>
    </div>
  );
};

export default App;

