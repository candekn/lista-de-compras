import React from 'react';

const JSONFileHandlerPage = ({ products, setProducts }) => {
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
            <div className="input-group gap-5">
                <button className="btn btn-primary" onClick={exportProducts}>
                    Exportar Productos
                </button>
                <label className="input-group-text btn btn-outline-primary">
                    Importar Productos (Json)
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
        </div>
    );
}

export default JSONFileHandlerPage;