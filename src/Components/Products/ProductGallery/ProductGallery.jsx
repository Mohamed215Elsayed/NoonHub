import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import mobile from "../../../Assets/Images/mobile.png";
import RightButton from "./RightButton";
import LeftButton from "./LeftButton";
import "./ProductGallery.css";
function ProductGallery() {
  const images = [
    {
      original: `${mobile}`,
    },
    {
      original: `${mobile}`,
    },
    {
      original: `${mobile}`,
    },
  ];
  return (
    <div className="product-gallery-wrapper">
      <ImageGallery
        items={images}
        defaultImage={mobile}
        showFullscreenButton={false}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={false}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
        showBullets={true}
      />
    </div>
  );
}

export default ProductGallery;
// lazyLoad={true}
// showThumbnails={true}
// thumbnailPosition="bottom"
// showThumbnails={false}
