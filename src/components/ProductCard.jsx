export default function ProductCard({ title,image, price, onAdd }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img src={image} alt={title} className="h-48 w-full object-contain mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-xl font-bold text-green-600 mt-2">${price.toFixed(2)}</p>

            
            <button 
                onClick={onAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Agregar al Carrito
            </button>
        </div>
    );
}


