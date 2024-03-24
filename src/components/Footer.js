import React, { memo } from 'react';

export default memo(function Footer() {
	return (
		<div className="border-t border-[#d8c5c5] w-full">
			<div className="container flex flex-row items-center justify-between h-16 mx-auto ">
				<div className="flex flex-row items-center gap-4">
					<a
						href="https://code4change.dev"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="22"
							height="22"
							viewBox="0 0 22 22"
							fill="none"
						>
							<path
								d="M16 1H6C3.23858 1 1 3.23858 1 6V16C1 18.7614 3.23858 21 6 21H16C18.7614 21 21 18.7614 21 16V6C21 3.23858 18.7614 1 16 1Z"
								stroke="#989898"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M15 10.3698C15.1234 11.2021 14.9812 12.052 14.5937 12.7988C14.2062 13.5456 13.5931 14.1512 12.8416 14.5295C12.0901 14.9077 11.2384 15.0394 10.4077 14.9057C9.57708 14.7721 8.80971 14.3799 8.21479 13.785C7.61987 13.1901 7.22768 12.4227 7.09402 11.592C6.96035 10.7614 7.09202 9.90971 7.47028 9.15819C7.84854 8.40667 8.45414 7.79355 9.20094 7.40605C9.94773 7.01856 10.7977 6.8764 11.63 6.99981C12.4789 7.1257 13.2648 7.52128 13.8716 8.12812C14.4785 8.73496 14.8741 9.52089 15 10.3698Z"
								stroke="#989898"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M16.5 5.5H16.51"
								stroke="#989898"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</a>
					<a
						href="https://code4change.dev"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<rect
								width="20"
								height="20"
								rx="1"
								fill="#989898"
							></rect>
							<path
								d="M17.35 3H14.8C13.6728 3 12.5918 3.44777 11.7948 4.2448C10.9978 5.04183 10.55 6.12283 10.55 7.25V9.8H8V13.2H10.55V20H13.95V13.2H16.5L17.35 9.8H13.95V7.25C13.95 7.02457 14.0396 6.80837 14.199 6.64896C14.3584 6.48955 14.5746 6.4 14.8 6.4H17.35V3Z"
								fill="white"
							></path>
						</svg>
					</a>
					<a
						href="https://code4change.dev"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="20"
							viewBox="0 0 25 20"
							fill="none"
						>
							<path
								d="M24.5212 0.0112081C23.4538 0.764094 22.272 1.33993 21.0213 1.71654C20.35 0.944696 19.4579 0.39763 18.4656 0.149336C17.4733 -0.0989584 16.4286 -0.0365016 15.4729 0.328259C14.5173 0.69302 13.6967 1.34249 13.1221 2.18882C12.5476 3.03515 12.2469 4.03751 12.2606 5.06034V6.17494C10.3018 6.22573 8.36091 5.79131 6.61069 4.91037C4.86048 4.02942 3.35529 2.72931 2.2292 1.12581C2.2292 1.12581 1 3.5 2.2292 6.17494C1.84168 7.94199 2.2292 10 4 11C3.5 12.5 5.13673 14.4309 7.80219 15.6156C5.5067 17.1738 2.77218 17.9551 0 17.8448C10.0314 23.4178 22.292 17.8448 22.292 5.0269C22.2909 4.71643 22.2611 4.40673 22.2028 4.10178C23.3404 2.97993 24.1431 1.56352 24.5212 0.0112081Z"
								fill="#989898"
							></path>
						</svg>
					</a>
					<a
						href="https://code4change.dev"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="23"
							height="15"
							viewBox="0 0 23 15"
							fill="none"
						>
							<rect
								width="23"
								height="15"
								rx="4"
								fill="#989898"
							></rect>
							<path
								d="M16 7.5L10 10.5311V4.46891L16 7.5Z"
								fill="#FEFCFB"
							></path>
						</svg>
					</a>
				</div>
				<div>
					Develop By{' '}
					<a
						href="https://code4change.dev"
						target="_blank"
						rel="noreferrer"
					>
						<strong>Code4Change</strong>
					</a>
				</div>
				<div></div>
			</div>
		</div>
	);
});
