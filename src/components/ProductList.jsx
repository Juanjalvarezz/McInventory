import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import inventoryData from './inventoryData';
import SearchBar from './SearchBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const updateProducts = (newProducts) => {
      setProducts([...newProducts]);
      if (!showSearchResult && !selectedCategory) {
        setFilteredProducts([...newProducts]);
      } else if (selectedCategory) {
        setFilteredProducts([...newProducts.filter(product => product.category === selectedCategory)]);
      }
    };

    inventoryData.registerListener(updateProducts);
    updateProducts(inventoryData.products);

    return () => inventoryData.unregisterListener(updateProducts);
  }, [showSearchResult, selectedCategory]);

  const handleRemoveProduct = (productId) => {
    try {
      inventoryData.removeProduct(productId);
      toast.success('Producto eliminado con éxito', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error al eliminar el producto', { autoClose: 3000 });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price.toString());
    setEditedCategory(product.category);
  };

  const handleSaveEdit = () => {
    const editedProduct = {
      ...editingProduct,
      name: editedName,
      price: parseFloat(editedPrice),
      category: editedCategory,
    };

    try {
      inventoryData.removeProduct(editingProduct.id);
      inventoryData.addProduct(editedProduct);

      setEditingProduct(null);
      toast.success('Producto editado con éxito', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error al editar el producto. Verifica todos los campos.', { autoClose: 3000 });
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() !== '') {
      // Búsqueda de productos
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSearchResult(true);

      // Restablecer los productos después de 5 segundos
      setTimeout(() => {
        setShowSearchResult(false);
        setFilteredProducts([...products]);
        toast.info(`Búsqueda finalizada. Mostrando todos los productos.`, { autoClose: 3000 });
      }, 5000);

      // Mostrar alerta de búsqueda realizada
      toast.info(`Búsqueda realizada: "${searchTerm}"`, { autoClose: 3000 });
    } else {
      // Mostrar alerta de término de búsqueda no válido
      toast.warn('Ingresa un término de búsqueda válido', { autoClose: 3000 });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterByCategory = () => {
    if (selectedCategory) {
      const newFilteredProducts = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(newFilteredProducts);
      setShowSearchResult(true);

      setTimeout(() => {
        setShowSearchResult(false);
        setFilteredProducts([...products]); // Restablece a todos los productos
        toast.info(`Filtrado por categoría: ${selectedCategory}`, { autoClose: 3000 });
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className='bg-red-700 p-5 rounded mb-2 flex'>
      <SearchBar onSearch={handleSearch} />
      <div>
        <label className="ml-12 mr-2 text-white font-bold">Filtrar por Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas las categorías</option>
          <option value="salado">Salado</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </select>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded ml-2 transition duration-300 ease-in-out hover:bg-yellow-500"
          onClick={handleFilterByCategory}
        >
          Filtrar
        </button>
      </div>
      </div>
      {showSearchResult && (
        <div className="bg-green-700 p-4 mb-4 rounded shadow">
          <h2 className="text-white text-2xl font-bold mb-2">Resultados del filtrado:</h2>
        </div>
      )}

      {(showSearchResult ? filteredProducts : products).map((product, index) => (
        <div key={product.id} className="relative mb-6">
          <div className="bg-green-700 p-4 mb-4 rounded shadow">
            <h2 className="bg-yellow-500 w-fit p-2 rounded text-2xl text-white font-bold mb-2">{product.name}</h2>
            <p className="text-white text-lg mb-2 ">Precio: ${product.price.toFixed(2)}</p>
            <p className="text-white text-lg mb-2">Categoría: {product.category}</p>
            <div className="flex">
              <button
                className="bg-red-700 text-white font-bold px-2  text-lg  py-1 rounded mr-2 transition duration-300 ease-in-out hover:bg-yellow-500"
                onClick={() => handleRemoveProduct(product.id)}
              >
                Eliminar
              </button>
              <button
                className="bg-yellow-500 font-bold text-white px-2  text-lg py-1 rounded transition duration-300 ease-in-out hover:bg-red-700"
                onClick={() => handleEditProduct(product)}
              >
                Editar
              </button>
            </div>
          </div>
          {editingProduct && editingProduct.id === product.id && (
  <div className="bg-green-700 p-4 mb-4 rounded shadow position-relative top-full left-0">
    <h2 className="bg-yellow-500 w-fit p-2 rounded text-2xl text-white font-bold mb-2">Editar Producto</h2>
    <div className="mb-2">
      <label className="text-white text-lg mb-2 mr-6 font-bold">Nombre:</label>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
    <div className="mb-2">
      <label className="text-white text-lg mb-2 mr-10 font-bold">Precio:</label>
      <input
        type="text"
        value={editedPrice}
        onChange={(e) => setEditedPrice(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
    <div className="mb-2">
      <label className="text-white text-lg mb-2 mr-3 font-bold">Categoría:</label>
      <select
        value={editedCategory}
        onChange={(e) => setEditedCategory(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="salado">Salado</option>
        <option value="postre">Postre</option>
        <option value="bebida">Bebida</option>
      </select>
    </div>
    <button
      className="bg-red-700 text-white font-bold px-4 py-2 rounded mr-2"
      onClick={handleSaveEdit}
    >
      Guardar
    </button>
  </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;