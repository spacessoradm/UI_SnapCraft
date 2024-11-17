import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ImageUploader from '../components/ImageUploader';
import MultiImageUploader from '../components/MultiImageUploader';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(''); // State for the selected image

  // Find the product based on the id parameter from the URL
  const product = products.find(p => p.id === id);
  
  // Handle case when the product is not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-rose-50 to-pink-50 global-font">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Get required number of images based on product type
  const getRequiredImages = () => {
    switch (product.id) {
      case 'set-of-3':
        return 3;
      case 'set-of-6':
        return 6;
      case 'set-of-9':
        return 9;
      case 'puzzle':
        return 1;
      default:
        return 1;
    }
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    const requiredImages = getRequiredImages();
    
    if (uploadedImages.length === requiredImages) {
      addToCart({
        productId: product.id,
        quantity,
        images: uploadedImages,
        price: product.price
      });
      navigate('/cart');
    } else {
      alert(`Please upload ${requiredImages} image${requiredImages > 1 ? 's' : ''} before adding to cart`);
    }
  };

  // Handle Tab Switching
  const [activeTab, setActiveTab] = useState(1); // 1 for the first tab, 2 for the second tab

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Display selected image */}
          <img
            src={selectedImage || product.image} // Default to the first image if selectedImage is not set
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />

          {/* Image Thumbnail Gallery */}
          <div className="mt-4 flex space-x-4">
            {(product.images || []).map((image, index) => (  // Ensure product.images is an array
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover cursor-pointer rounded-md border"
                onClick={() => setSelectedImage(image)} // Set selected image
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-indigo-600">RM {product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          
          {/* Quantity Controls */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Image Upload Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Upload Your {product.type === 'puzzle' ? 'Image' : 'Images'}
            </h3>
            {product.type === 'puzzle' ? (
              <ImageUploader
                maxWidth={product.dimensions.width}
                maxHeight={product.dimensions.height}
                isPuzzle={true}
                onImageUpdate={(image) => setUploadedImages([image])}
              />
            ) : (
              <MultiImageUploader
                maxWidth={product.dimensions.width}
                maxHeight={product.dimensions.height}
                maxImages={getRequiredImages()}
                onImagesUpdate={setUploadedImages}
              />
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add to Cart - RM {(product.price * quantity).toFixed(2)}
          </button>
        </div>
      </div>

      {/* Tab Section */}
      <div className="mt-8">
        <div className="flex space-x-8 border-b">
          <button
            onClick={() => setActiveTab(1)}
            className={`pb-2 ${activeTab === 1 ? 'border-b-2 border-indigo-600' : ''}`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`pb-2 ${activeTab === 2 ? 'border-b-2 border-indigo-600' : ''}`}
          >
            Reviews
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 1 && (
            <div>
              {/* Product details or description */}
              <p className="text-gray-700">{product.longDescription}</p>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              {/* Reviews Section */}
              <p className="text-gray-700">No reviews yet, be the first to leave a review!</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* Render related products */}
          {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map((relatedProduct) => (
            <div key={relatedProduct.id} className="border rounded-lg p-4">
              <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
              <p className="text-indigo-600">RM {relatedProduct.price}</p>
              <button
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
