import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
function Detail() {
	let { id } = useParams();
	const { state } = useLocation();

	const [detail, setDetail] = useState({});

	const getData = async () => {
		const response = await axios.get(
			'https://api.code4change.dev/newsletters/' + id
		);

		if (response.status === 200) {
			setDetail(response.data);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="container">
			<div className="card">
				<Link to={`/update/` + id}>Update</Link>
				<div className="list">
					<div className="item">
						{detail && (
							<h1
								style={{
									color:
										detail.status === 1
											? 'rgba(54, 207, 0, 1)'
											: 'black',
								}}
							>
								{detail.email}
							</h1>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Detail;
