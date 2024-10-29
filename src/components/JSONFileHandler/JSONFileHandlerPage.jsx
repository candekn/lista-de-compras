const JSONFileHandlerPage = ({products, setProducts }) => {
    // Función para exportar productos a un archivo JSON
  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Función para manejar la importación de productos desde un archivo JSON
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("🚀 ~ handleFileChange ~ file:", file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const importedProducts = JSON.parse(event.target.result);
        setProducts(importedProducts);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="mb-3">
    <button className="btn btn-primary me-2" onClick={exportProducts}>
      Exportar Productos
    </button>
    <input type="file" accept=".json" onChange={handleFileChange} />
  </div>
  )
}

export default JSONFileHandlerPage;