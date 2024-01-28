class InventoryData {
    constructor() {
      this.products = JSON.parse(localStorage.getItem('products')) || [];
      this.listeners = [];
    }
  
    addProduct(product) {
      this.products.push(product);
      this.notifyListeners();
      this.saveToLocalStorage();
    }
  
    removeProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId);
      this.notifyListeners();
      this.saveToLocalStorage();
    }
  
    registerListener(listener) {
      this.listeners.push(listener);
    }
  
    unregisterListener(listener) {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  
    notifyListeners() {
      this.listeners.forEach((listener) => listener(this.products));
    }
  
    saveToLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
  
  const inventoryData = new InventoryData();
  
  export default inventoryData;
  