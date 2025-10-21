import Header from '../components/Header';
import './PageLayout.css';

export default function PageLayout({ title, children }) {
  return (
    <div className="page-layout-root">
      <Header />
      <div className="page-layout-content-wrapper">
        {title && (
          <div className="page-layout-header-section">
            <h1 className="page-layout-title">{title}</h1>
          </div>
        )}
        <div className="page-layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}
