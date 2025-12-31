import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import RightButton from "./RightButton";
import LeftButton from "./LeftButton";
import "./ProductGallery.css";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "../../../Hook/product/view-products-detalis-hook";
function ProductGallery() {
  const { id } = useParams();
  const { images } = ViewProductsDetalisHook(id);

  return (
    <div className="product-gallery-wrapper">
      {images && images.length > 0 ? (
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          isRTL={true}
          showPlayButton={false}
          showThumbnails={false}
          renderRightNav={(onClick, disabled) => (
            <RightButton onClick={onClick} disabled={disabled} />
          )}
          renderLeftNav={(onClick, disabled) => (
            <LeftButton onClick={onClick} disabled={disabled} />
          )}
          showBullets={true}
        />
      ) : (
        <div className="text-center p-5">جاري تحميل الصور...</div>
      )}
    </div>
  );
}

export default ProductGallery;
// lazyLoad={true}
// showThumbnails={true}
// thumbnailPosition="bottom"
// showThumbnails={false}
// defaultImage={mobile}//returns by default
// import mobile from "../../../Assets/Images/mobile.png";
// renderRightNav={RightButton}
// renderLeftNav={LeftButton}
