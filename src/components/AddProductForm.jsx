import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import inventoryData from './inventoryData';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleAddProduct = () => {
    if (
      productName.trim() !== '' &&
      productPrice.trim() !== '' &&
      productCategory.trim() !== '' &&
      productQuantity.trim() !== ''
    ) {
      const newProduct = {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        category: productCategory,
        quantity: parseInt(productQuantity), // Agregar cantidad al producto
      };

      try {
        inventoryData.addProduct(newProduct);
        setProductName('');
        setProductPrice('');
        setProductCategory('');
        setProductQuantity('');
        toast.success('Producto agregado con éxito', { autoClose: 3000 });
      } catch (error) {
        toast.error('Error al agregar el producto. Verifica todos los campos.', { autoClose: 3000 });
      }
    } else {
      toast.error('Por favor completa todos los campos', { autoClose: 3000 });
    }
  };

  return (
    <div className="bg-yellow-500 p-5 rounded lex items-center mb-2 ">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border p-2 mr-5 rounded focus:outline-none focus:border-blue-500 mb-2"
      />
      <input
        type="text"
        placeholder="Precio"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className="border p-2 mr-5 rounded focus:outline-none focus:border-blue-500 w-20 mb-2"
      />
      <input
        type="text"
        placeholder="Cantidad"
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
        className="border p-2 mr-5 rounded focus:outline-none focus:border-blue-500 w-20 mb-2"
      />
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        className="border p-2 mr-5 rounded focus:outline-none focus:border-blue-500 mb-2"
      >
        <option value="">Seleccionar categoría</option>
        <option value="salado">Salado</option>
        <option value="postre">Postre</option>
        <option value="bebida">Bebida</option>
      </select>
      <button
        onClick={handleAddProduct}
        className="bg-red-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-green-700"
      >
        Agregar
      </button>
    </div>
  );
};

export default AddProductForm;
