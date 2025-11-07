# Airavat B2B E-commerce Platform - Static HTML Version

This is a complete, standalone HTML/CSS/JavaScript implementation of the Airavat B2B E-commerce platform with two main pages: Home Page and Product Detail Page.

## 📁 File Structure

```
project/
├── index.html              # Home page
├── product-detail.html     # Product detail page
├── css/
│   └── style.css          # All styles (color palette, typography, responsive design)
├── js/
│   ├── products.js        # Product data (5 demo products)
│   ├── home.js            # Home page logic (carousel, product loading, cart)
│   └── product.js         # Product page logic (details, reviews, tabs)
└── images/
    └── (placeholder images - currently using emoji icons)
```

## 🎨 Design Specifications

### Color Palette
- **Primary Teal**: #0DC4CB
- **Royal Gold**: #F0BF69
- **Regal Blue**: #054A4E
- **Soft Stone Grey**: #424242
- **White Background**: #FFFFFF
- **Light Grey**: #F5F5F5

### Typography
- Font Family: 'Inter', 'Segoe UI', or similar modern sans-serif
- Headers: Bold, 24-32px
- Body: Regular, 14-16px
- Small text: 12-14px

## 🚀 How to Run

### Option 1: Direct File Opening
Simply open `index.html` in your web browser:
```bash
# Open with default browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### Option 2: Using a Local Server (Recommended)
Using a local server prevents CORS issues and provides a better development experience:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to: `http://localhost:8000`

## ✨ Features

### Home Page (index.html)
- **Sticky Header** with search bar and navigation
- **Category Carousel** with 8 product categories
- **Product Grid** displaying 5 demo products
- **Interactive Product Cards** with:
  - Quantity selectors
  - Add to cart functionality
  - Compare functionality
  - Click to view details
- **Responsive Design** for mobile, tablet, and desktop
- **Search Functionality** to filter products

### Product Detail Page (product-detail.html)
- **Image Gallery** with thumbnail navigation
- **Product Information** including:
  - Rating and reviews
  - Supplier information
  - MOQ (Minimum Order Quantity)
  - Pricing
  - Customization options
  - Shipping details
- **Tabbed Interface** with:
  - Attributes table
  - Customer reviews
  - Supplier card
  - About company
- **Similar Products** section
- **Add to Cart** with customization selection
- **Share Product** functionality

## 🛠️ Interactive Features

1. **Category Carousel Navigation**: Click arrows to scroll through categories
2. **Product Search**: Type in search bar and press Enter or click Search
3. **Quantity Controls**: Use +/- buttons to adjust quantity
4. **Add to Cart**: Adds products to localStorage cart
5. **Product Navigation**: Click any product card to view details
6. **Image Gallery**: Click thumbnails to change main image
7. **Tab Switching**: Click tabs to view different product information
8. **Responsive Menu**: Hamburger menu on mobile devices

## 📦 Demo Products

The platform includes 5 fully detailed demo products:

1. **Grey Black 600x600 Yellow Tile** - Construction & Real Estate
2. **High End Luxury Perfume Bottle** - Packaging
3. **Industrial LED Panel Light** - Electronics & Technology
4. **Stainless Steel Water Bottle** - Home & Garden
5. **Cotton T-Shirt Bulk Pack** - Fashion & Apparel

Each product includes:
- Complete specifications
- Customization options
- Sample reviews
- Supplier information
- Packaging details

## 🔄 Navigation Flow

```
Home Page (index.html)
    ↓ (Click product card)
Product Detail Page (product-detail.html?id=1)
    ↓ (Click similar product or back to home)
Home Page (index.html)
```

## 💾 Local Storage

The application uses `localStorage` to maintain:
- Shopping cart items
- Product quantities
- Customization selections

To clear the cart:
```javascript
localStorage.removeItem('cart');
```

## 📱 Responsive Breakpoints

- **Desktop**: 1400px max-width container
- **Tablet**: 992px and below
- **Mobile**: 768px and below
- **Small Mobile**: 480px and below

## 🎯 Key Classes & IDs

### Home Page
- `#categoryCarousel` - Category scroll container
- `#productsGrid` - Main product grid
- `.product-card` - Individual product card
- `.category-card` - Category items

### Product Detail Page
- `#mainImage` - Main product image
- `#thumbnailContainer` - Image thumbnails
- `.tab-btn` - Tab navigation buttons
- `.tab-content` - Tab content areas
- `#attributesTable` - Product specifications
- `#reviewsList` - Customer reviews

## 🔧 Customization

### Adding New Products
Edit `js/products.js` and add new product objects to the `products` array:

```javascript
{
  id: 6,
  name: "Your Product Name",
  shortName: "Short Name",
  price: 100,
  moq: 10,
  supplier: "Supplier Name",
  location: "City",
  rating: 4.5,
  reviews: 100,
  description: "Product description...",
  category: "Category Name",
  // ... additional fields
}
```

### Modifying Colors
Update CSS variables in `css/style.css`:

```css
:root {
  --primary-teal: #0DC4CB;
  --royal-gold: #F0BF69;
  /* ... other colors */
}
```

### Adding Real Images
Replace emoji icons with actual images in the product data and update the rendering logic in `home.js` and `product.js`.

## 🌐 Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- Currently using emoji icons as placeholders for images
- Cart data persists in localStorage
- All interactive features are fully functional
- No backend required - pure frontend implementation
- Can be easily deployed to any static hosting (GitHub Pages, Netlify, Vercel, etc.)

## 🚀 Deployment

To deploy to a static hosting service:

1. **GitHub Pages**: Push to a GitHub repo and enable Pages
2. **Netlify**: Drag and drop the folder to Netlify
3. **Vercel**: Connect to your Git repository
4. **Any web server**: Upload all files maintaining the directory structure

## 📄 License

This is a demo project for the Airavat B2B E-commerce Platform.

---

**Built with**: HTML5, CSS3, Vanilla JavaScript
**Date**: November 2025
**Version**: 1.0.0
