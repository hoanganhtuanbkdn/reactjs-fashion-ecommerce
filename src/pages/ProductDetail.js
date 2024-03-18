import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
function ProductDetail() {
	let { id } = useParams();

	return (
		<div className="container">
			<div className="card"></div>
		</div>
	);
}

export default ProductDetail;
