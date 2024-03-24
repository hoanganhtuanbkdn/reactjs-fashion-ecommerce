import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { App as Theme } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		<ConfigProvider
			theme={{
				token: { colorPrimary: '#000a12', borderRadius: 0 },
				components: {
					Button: {
						primaryShadow: 'none',
					},
				},
			}}
		>
			<StyleProvider hashPriority="high">
				<Theme>
					<App />
				</Theme>
			</StyleProvider>
		</ConfigProvider>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
