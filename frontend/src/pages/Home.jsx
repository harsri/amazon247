import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import './Home.scss';

const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹25,000', min: 5000, max: 25000 },
  { label: '₹25,000 – ₹1,00,000', min: 25000, max: 100000 },
  { label: 'Over ₹1,00,000', min: 100000, max: 0 },
];

const SORT_OPTIONS = [
  { label: 'Relevance', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Avg. Customer Review', value: 'rating_desc' },
];

const CAROUSEL_IMAGES = [
  'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x450_3.gif',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/GW-Hero-PC_BBAug23_Soft-toys_with-Apay_Lifestyle_2x._CB596817009_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/AmazonBrands/GW/2-1a_1500x600._CB531065467_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/GW/Aug/Apay/Deals-3000-PC._CB596825701_.jpg'
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));

  useEffect(() => {
    // Autoplay carousel
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const brand = searchParams.get('brand') || '';

  const isSearchActive = search || category || sort || minPrice || maxPrice || brand;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const res = await api.get(`/products${query ? `?${query}` : ''}`);
        setProducts(res.data.products || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [searchParams]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  // Extract unique brands from loaded products
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  return (
    <div className="home">
      {/* Hero Banner Carousel (only on home without search) */}
      {!isSearchActive && (
        <div className="home__carousel">
          <button className="home__carouselBtn prev" onClick={prevSlide}>&#10094;</button>
          <div className="home__carouselTrack" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {CAROUSEL_IMAGES.map((img, i) => (
              <img key={i} src={img} alt={`Banner ${i + 1}`} className="home__carouselImg" />
            ))}
          </div>
          <button className="home__carouselBtn next" onClick={nextSlide}>&#10095;</button>
        </div>
      )}

      {/* Search Results Header */}
      {isSearchActive && (
        <div className="home__searchHeader">
          <div className="home__searchInfo">
            <span className="home__resultCount">{products.length} results</span>
            {search && <span>for "<strong>{search}</strong>"</span>}
            {category && <span className="home__filterTag">{category} <FiX onClick={() => updateParam('category', '')} /></span>}
            {brand && <span className="home__filterTag">{brand} <FiX onClick={() => updateParam('brand', '')} /></span>}
            {(minPrice || maxPrice) && <span className="home__filterTag">₹{minPrice || 0} – ₹{maxPrice || '∞'} <FiX onClick={() => { updateParam('minPrice', ''); updateParam('maxPrice', ''); }} /></span>}
            <button className="home__clearBtn" onClick={clearFilters}>Clear all</button>
          </div>
          <div className="home__sortRow">
            <label>Sort by:</label>
            <select value={sort} onChange={e => updateParam('sort', e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button className="home__filterToggle" onClick={() => setShowFilters(v => !v)}>
              <FiFilter /> Filters
            </button>
          </div>
        </div>
      )}

      <div className="home__body">
        {/* Sidebar Filters */}
        {isSearchActive && (
          <aside className={`home__sidebar ${showFilters ? 'open' : ''}`}>
            <div className="home__sidebarHeader">
              <h3>Filters</h3>
              <button className="home__sidebarClose" onClick={() => setShowFilters(false)}><FiX /></button>
            </div>

            <div className="filterGroup">
              <h4>Category</h4>
              {['Electronics', 'Fashion', 'Books', 'Home & Kitchen'].map(c => (
                <label key={c} className="filterGroup__item">
                  <input type="radio" name="cat" checked={category === c} onChange={() => updateParam('category', c)} />
                  {c}
                </label>
              ))}
              {category && <button className="filterGroup__clear" onClick={() => updateParam('category', '')}>Clear</button>}
            </div>

            <div className="filterGroup">
              <h4>Price</h4>
              {PRICE_RANGES.map(r => (
                <label key={r.label} className="filterGroup__item">
                  <input type="radio" name="price"
                    checked={minPrice === String(r.min) && (r.max ? maxPrice === String(r.max) : !maxPrice)}
                    onChange={() => { updateParam('minPrice', String(r.min)); updateParam('maxPrice', r.max ? String(r.max) : ''); }} />
                  {r.label}
                </label>
              ))}
              {(minPrice || maxPrice) && <button className="filterGroup__clear" onClick={() => { updateParam('minPrice', ''); updateParam('maxPrice', ''); }}>Clear</button>}
            </div>

            {brands.length > 0 && (
              <div className="filterGroup">
                <h4>Brand</h4>
                {brands.map(b => (
                  <label key={b} className="filterGroup__item">
                    <input type="radio" name="brand" checked={brand === b} onChange={() => updateParam('brand', b)} />
                    {b}
                  </label>
                ))}
                {brand && <button className="filterGroup__clear" onClick={() => updateParam('brand', '')}>Clear</button>}
              </div>
            )}
          </aside>
        )}

        {/* Products Grid */}
        <div className="home__main">
          {loading ? (
            <div className="home__loading"><div className="home__spinner" /></div>
          ) : products.length === 0 ? (
            <div className="home__empty">
              <h3>No results found</h3>
              <p>Try different keywords or clear filters.</p>
            </div>
          ) : (
            <div className="home__row">
              {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
