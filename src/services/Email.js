import emailjs from '@emailjs/browser';

// Để sử dụng email của mình, bạn cần vào trang chủ của thư viện emailjs https://www.emailjs.com/
// và tạo tài khoản, kết nối với gmail và lấy các thông tin bên dưới
const EMAIL_SERVICE_ID = 'service_o9xzkin';
const EMAIL_TEMPLATE_ID_1 = 'template_nmp6tew';
const EMAIL_TEMPLATE_ID_2 = 'template_45r2wr1';
const EMAIL_PUBLIC_KEY = 'rmmm_AWYPrBXmj97f';

export const sentRegisterSuccessEmail = (data) => {
	emailjs.send(
		EMAIL_SERVICE_ID,
		EMAIL_TEMPLATE_ID_1,
		{
			email: data.email,
			name: data.firstname + ' ' + data.lastname,
		},
		{
			publicKey: EMAIL_PUBLIC_KEY,
		}
	);
};

export const sentOrderSuccessEmail = (data) => {
	emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID_2, data, {
		publicKey: EMAIL_PUBLIC_KEY,
	});
};
