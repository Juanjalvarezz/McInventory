import React from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Logo from './Assets/Logo.png';

const App = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between -mb-12 px-5 md:px-10 py-5">
        <img src={Logo} alt="Logo" className="-mt-12 md:mt-0 w-40 h-auto" />
        <h1 className="text-3xl md:text-5xl font-bold text-center pb-8 md:text-left">Inventario</h1>
      </div>
      <div id="juan" className="container mx-auto p-5 md:p-7 px-10 md:px-12">
        {/*pan superior */}
        <div className="bg-[#B0867D] h-6 md:h-12 w-full mb-1 md:mb-2 rounded-t-full"></div>
        
        <AddProductForm />
        <ProductList />

        {/*pan inferior */}
        <div className="bg-[#633B32] h-6 md:h-10 w-full -mt-5 md:-mt-2 rounded-b-md"></div>
        <div className="bg-[#B0867D] h-6 md:h-10 w-full mt-1 rounded-b-md"></div>
      </div>
    </div>
  );
};

export default App;
