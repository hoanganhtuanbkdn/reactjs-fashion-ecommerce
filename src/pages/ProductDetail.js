import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceApi } from '../services/Api';
import { Button, Image, Rate } from 'antd';
import Price from '../components/Price';
import { TargetPrice } from './Cart';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../store/redux/CartSlice';
import { message } from '../components/Layout';
import { ROUTERS } from '../constants/Routers';
function ProductDetail() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let { slug } = useParams();
	const [detail, setDetail] = useState();

	const getProductBySlug = async () => {
		const res = await ServiceApi.getProductBySlug({
			slug: slug,
			_embed: 'categories',
		});

		if (res.ok && res.data && res.data[0]) {
			setDetail(res.data[0]);
		}
	};

	useEffect(() => {
		getProductBySlug();
	}, [slug]);

	const onAdd = () => {
		dispatch(addProductToCart(detail));
		message.success('Added product successfully');
	};

	const onBuy = () => {
		dispatch(addProductToCart(detail));
		navigate(ROUTERS.CART);
	};

	return (
		<div className="container mx-auto py-9 md:px-24">
			{detail && (
				<div className="card">
					<div className="pb-6">
						<p>Home / {detail.name}</p>
					</div>
					<div className="flex md:flex-row gap-16">
						<div className="flex md:flex-1">
							<Image src={detail.image} width={'100%'} />
						</div>
						<div className="flex md:flex-1 space-y-8 flex-col">
							<h1 className="font-semibold text-3xl">
								{detail.name}
							</h1>
							<Rate value={4} />
							<p className="text-2xl">
								<Price value={detail.price} />
							</p>
							<p className="font-bold">Color: </p>
							<p className="font-bold">Size:</p>
							<div className="space-y-6">
								<p className="font-bold">Quantity</p>
								<div className="flex flex-row items-center gap-5">
									<div className="border border-[#d0d0d0] flex flex-row items-center">
										<Button
											type="text"
											className="text-center"
											size="large"
										>
											-
										</Button>
										<div className="flex items-center justify-center flex-1">
											<p>1</p>
										</div>
										<Button
											type="text"
											className="text-center"
											size="large"
										>
											+
										</Button>
									</div>
									<Button
										type="primary"
										size="large"
										ghost
										onClick={onAdd}
									>
										Add To Cart
									</Button>
								</div>
								<Button
									type="primary"
									size="large"
									classNames="w-full"
									onClick={onBuy}
								>
									Buy Now
								</Button>
							</div>
							<div className="space-y-4">
								<p>
									<strong>Estimated Delivery:</strong> Within
									5-7 days
								</p>
								<p>
									<strong>Free shipping:</strong> On orders
									over <Price value={TargetPrice} /> and above
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetail;
