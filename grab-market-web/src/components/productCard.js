
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import {API_URL} from '../config/constants.js';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function ProductCard(props) {
    const product = props.product;
    return (
        <div className="product-card">
        {
            product.soldout === 1 && <div className='product-blur'/>
        }
        <Link className='product-link' to={`/products/${product.id}`}>
            <div>
                <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt='상품 이미지'/>
            </div>
            <div>
                <div className='product-contents'>
                    <span className='product-name'>
                        {product.name}
                    </span>
                    <span className='product-price'>
                        {product.price}원
                    </span>
                    <div className='product-footer'>
                        <div className='product-seller'>
                            <img className='product-avatar' src='/images/icons/avatar.png' alt='상품 설명 아이콘'/>
                            <span className='product-date'>{product.seller}</span>
                        </div>
                        <span>{dayjs(product.createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
        </Link>
    </div>
    )
}

export default ProductCard;