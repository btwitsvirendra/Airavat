'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '@/lib/store';
import FavoriteButton from '@/components/FavoriteButton';

interface ShopGroup {
  shop: {
    id: string;
    name: string;
    email?: string;
  };
  products: Array<{
    id: string;
    product: any;
    quantity: number;
  }>;
}

const TopBar = ({ data, onFavorite, onDelete, isFavorite }: { data: ShopGroup; onFavorite: () => void; onDelete: () => void; isFavorite: boolean }) => {

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-base mb-0 opacity-75">{data.shop.name}</p>
          <p className="text-xs mb-0 opacity-75">
            Buy {data.products.length} item(s) enjoy free shipping for Standard delivery option
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton
            isFavorite={isFavorite}
            onChange={(checked) => onFavorite()}
          />
          <button
            onClick={onDelete}
            className="p-0 inline-flex justify-center items-center text-decoration-none min-w-[35px] h-[35px] text-gray-700 hover:text-[#0D6EFD] hover:bg-gray-50 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <hr className="border-gray-200 opacity-100 my-0" />
    </>
  );
};

const SideBar = ({ selectedCount, subtotal, shipping, total }: { selectedCount: number; subtotal: number; shipping: number; total: number }) => {
  return (
    <div className="bg-white rounded-lg border-none">
      <div className="p-4 md:p-6">
        <h6 className="text-xl font-bold mb-4">Order Summary</h6>

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700">Subtotal</span>
          <span className="text-sm text-gray-700">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700">Shipping</span>
          <span className="text-sm text-gray-700">₹{shipping.toLocaleString('en-IN')}</span>
        </div>

        <hr className="border-gray-200 opacity-100 my-4" />

        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
        </div>

        <Link
          href="/checkout"
          className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center h-[42px] mt-4 md:mt-6"
        >
          BUY ({selectedCount})
        </Link>
      </div>
    </div>
  );
};

const QtyField = ({ value, onChange }: { value: number; onChange: (newValue: number) => void }) => {
  const qtyControl = (qty: number) => {
    onChange(qty < 1 ? 1 : qty);
  };

  return (
    <div className="inline-flex items-center border border-gray-300 rounded-lg w-[100px]">
      <button
        type="button"
        onClick={() => qtyControl(value - 1)}
        className="w-[30px] h-[30px] flex items-center justify-center text-gray-900 font-bold text-lg rounded-full bg-gray-50 hover:bg-gray-100 transition p-0 border-none"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => qtyControl(parseInt(e.target.value) || 1)}
        className="w-[40px] h-[30px] text-center text-sm font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
      />
      <button
        type="button"
        onClick={() => qtyControl(value + 1)}
        className="w-[30px] h-[30px] flex items-center justify-center text-gray-900 font-bold text-lg rounded-full bg-gray-50 hover:bg-gray-100 transition p-0 border-none"
      >
        +
      </button>
    </div>
  );
};

const ProductItem = ({ item, onChange }: { item: { id: string; product: any; quantity: number }; onChange: (newQty: number) => void }) => {
  const product = item.product;
  const discount = product.price.amount > 0 ? Math.round(((product.price.amount * 1.3 - product.price.amount) / (product.price.amount * 1.3)) * 100) : 0;
  const oldPrice = product.price.amount * 1.3;

  return (
    <div className="flex mb-4">
      <div className="mr-3">
        <div className="min-w-[50px] w-[50px] md:min-w-[100px] md:w-[100px] h-auto bg-gray-50 border border-gray-200 rounded overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ShoppingBag size={24} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-7">
            <div className="mb-1">
              <Link href={`/products/${product.id}`} className="text-[15px] leading-[19px] font-normal text-gray-900 hover:text-[#0D6EFD] transition">
                {product.name}
              </Link>
            </div>
            <p className="text-xs text-gray-700 mb-2">
              <span className="mr-3">
                <span className="font-semibold">Color</span>: {product.specifications?.color || 'N/A'}
              </span>
              <span>
                <span className="font-semibold">Ships From</span>: {product.supplier?.location || 'India'}
              </span>
            </p>
          </div>
          <div className="xl:col-span-3 mt-3 xl:mt-0">
            <div className="mb-3">
              <span className="text-[17px] text-gray-900 font-bold mr-2">
                ₹{product.price.amount.toLocaleString('en-IN')}
              </span>
              <div className="flex flex-wrap items-center">
                <span className="text-sm text-gray-500 line-through mr-2">
                  ₹{oldPrice.toLocaleString('en-IN')}
                </span>
                {discount > 0 && (
                  <span className="px-[5px] py-[2px] rounded text-xs font-semibold bg-red-50 text-[#0D6EFD]">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="xl:col-span-2 mt-3 xl:mt-0">
            <QtyField value={item.quantity} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  const cart = useStore((state: any) => state.cart);
  const removeFromCart = useStore((state: any) => state.removeFromCart);
  const clearCart = useStore((state: any) => state.clearCart);
  const addToCart = useStore((state: any) => state.addToCart);
  const addToFavorites = useStore((state: any) => state.addToFavorites);
  const removeFromFavorites = useStore((state: any) => state.removeFromFavorites);
  const favorites = useStore((state: any) => state.favorites);

  // Group products by supplier/shop
  const shopGroups = useMemo(() => {
    const groups: Record<string, ShopGroup> = {};
    
    cart.forEach((item: any) => {
      const shopId = item.product.supplier?.id || item.product.supplierId || 'default';
      const shopName = item.product.supplier?.name || item.product.supplierId || 'Unknown Supplier';
      
      if (!groups[shopId]) {
        groups[shopId] = {
          shop: {
            id: shopId,
            name: shopName,
            email: item.product.supplier?.email,
          },
          products: [],
        };
      }
      
      groups[shopId].products.push({
        id: item.product.id,
        product: item.product,
        quantity: item.quantity,
      });
    });
    
    return Object.values(groups);
  }, [cart]);

  const handleQuantityChange = (product: any, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(product.id);
      return;
    }
    if (newQuantity > product.stock) {
      toast.error(`Maximum available: ${product.stock}`);
      return;
    }
    const currentItem = cart.find((item: any) => item.product.id === product.id);
    if (currentItem) {
      const diff = newQuantity - currentItem.quantity;
      addToCart(product, diff);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum: number, item: any) => {
      return sum + item.product.price.amount * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const selectedCount = cart.length;

  return (
    <section className="ezy__epcart7 light bg-white text-gray-900 overflow-hidden py-[60px] md:py-[100px] relative" id="ezy__epcart7">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 justify-center">
          <div className="lg:col-span-8">

            {/* Empty Cart */}
            {cart.length === 0 && (
              <div className="bg-white rounded-lg border-none p-12 text-center">
                <ShoppingBag size={64} className="mx-auto text-[#0D6EFD] mb-4" />
                <p className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-600 mb-6">
                  Browse products or Discover clusters to add items and request consolidated quotes.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Explore Products <ArrowRight size={18} />
                </Link>
              </div>
            )}

            {/* Shop Groups */}
            {shopGroups.map((group) => {
              // Check if all products from this shop are favorited
              const allProductsFavorited = group.products.every((item) => 
                favorites.some((f: any) => f.id === item.product.id)
              );

              const handleShopFavorite = () => {
                if (allProductsFavorited) {
                  // Remove all products from favorites
                  group.products.forEach((item) => {
                    removeFromFavorites(item.product.id);
                  });
                  toast.success('Removed from favorites');
                } else {
                  // Add all products to favorites
                  group.products.forEach((item) => {
                    if (!favorites.some((f: any) => f.id === item.product.id)) {
                      addToFavorites(item.product);
                    }
                  });
                  toast.success('Added to favorites');
                }
              };

              const handleShopDelete = () => {
                if (confirm(`Are you sure you want to remove all items from ${group.shop.name}?`)) {
                  group.products.forEach((item) => {
                    removeFromCart(item.product.id);
                  });
                  toast.success('All items removed from cart');
                }
              };

              return (
                <div key={group.shop.id} className="bg-white rounded-lg border-none mb-3">
                  <div className="px-4 md:px-6 py-4">
                    <TopBar data={group} onFavorite={handleShopFavorite} onDelete={handleShopDelete} isFavorite={allProductsFavorited} />

                    {group.products.map((item) => (
                      <ProductItem
                        key={item.id}
                        item={item}
                        onChange={(newQty) => handleQuantityChange(item.product, newQty)}
                      />
                    ))}

                    <div className="text-end mt-4 md:mt-6">
                      <button className="bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition h-auto">
                        Buy From This Seller
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <SideBar
              selectedCount={selectedCount}
              subtotal={calculateSubtotal()}
              shipping={calculateShipping()}
              total={calculateTotal()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
