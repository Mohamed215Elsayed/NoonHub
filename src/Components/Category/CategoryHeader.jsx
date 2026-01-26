import { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AllCategoryHook from '../../Hook/Category/all-category-page-hook';
import './CategoryHeader.css';

const CategoryHeader = () => {
    const [category, loading] = AllCategoryHook();

    const location = useLocation();
    const currentPath = location.pathname;

    const displayCategories = useMemo(() => {
        const categoriesData = category?.data || [];
        const limited = categoriesData.slice(0, 8);

        return [
            { _id: 'all', name: 'الكل', link: '/products' },
            ...limited.map((cat) => ({
                ...cat,
                link: `/products/category/${cat._id}`,
            })),
            { _id: 'more', name: 'المزيد', link: '/allcategory' },
        ];
    }, [category]);

    const [activeCategoryId, setActiveCategoryId] = useState('all');

    useEffect(() => {
        const matched = displayCategories.find((cat) =>
            currentPath.startsWith(cat.link)
        );
        if (matched) {
            setActiveCategoryId(matched._id);
        } else if (currentPath === '/products') {
            setActiveCategoryId('all');
        }
    }, [currentPath, displayCategories]);

    return (
        <>
        <div className="category-header-wrapper">
            <Container>
                <div className="category-list">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                              <div key={i} className="category-item skeleton"></div>
                          ))
                        : displayCategories.map((cat) => (
                              <Link
                                  key={cat._id}
                                  to={cat.link}
                                  style={{ textDecoration: 'none' }}
                              >
                                  <button
                                      className={`category-item ${
                                          activeCategoryId === cat._id ? 'active' : ''
                                      }`}
                                      onClick={() => setActiveCategoryId(cat._id)}
                                  >
                                      {cat.name}
                                  </button>
                              </Link>
                          ))}
                </div>
            </Container>
        </div>
          <div className="category-header-spacer"></div>
        </>
    );
};

export default CategoryHeader;