import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JSONFileHandlerPage from '../JSONFileHandler/JSONFileHandlerPage';
const HomePage = () => {
    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : [];
    });

    const [newProduct, setNewProduct] = useState({ nombre: '', precio: '', cantidad: '' });

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = () => {
        if (newProduct.nombre) {
            const updatedProducts = [
                ...products,
                {
                    ...newProduct,
                    precio: newProduct.precio ? parseFloat(newProduct.precio) : 0,
                    cantidad: newProduct.cantidad ? parseInt(newProduct.cantidad) : 1
                }
            ];
            setProducts(updatedProducts);
            setNewProduct({ nombre: '', precio: '', cantidad: '' });
        }
    };

    const handleProductChange = (index, name, value) => {
        const updatedProducts = products.map((product, i) =>
            i === index ? { ...product, [name]: value } : product
        );
        setProducts(updatedProducts);
    };

    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <div className="container my-4">
            <h2 className="mb-4">Productos</h2>
            <div className='container'>
                <JSONFileHandlerPage products={products} setProducts={setProducts} />
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered mx-auto">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Total</th>
                            <th scope="col">Seleccionar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.nombre}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={product.precio}
                                        onChange={(e) => handleProductChange(index, 'precio', parseFloat(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={product.cantidad}
                                        onChange={(e) => handleProductChange(index, 'cantidad', parseInt(e.target.value))}
                                    />
                                </td>
                                <td>${product.precio ? (product.precio * product.cantidad).toFixed(2) : 0}</td>
                                <td><input type="checkbox" className="form-check-input" /></td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(index)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="nombre"
                                    value={newProduct.nombre}
                                    onChange={handleNewProductChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio"
                                    name="precio"
                                    value={newProduct.precio}
                                    onChange={handleNewProductChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Cantidad"
                                    name="cantidad"
                                    value={newProduct.cantidad}
                                    onChange={handleNewProductChange}
                                />
                            </td>
                            <td colSpan="2">
                                <button className="btn btn-success w-100" onClick={addProduct}>
                                    Agregar Producto
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePage;
