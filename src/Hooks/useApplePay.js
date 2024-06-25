import React, {
	useEffect,
	useState,
	useRef
} from 'react';

function OceanPayment() {
	const scriptUrl = 'https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js';
	const scriptRef = useRef(null);
	const [loaded, setLoaded] = useState(false);
	if (window?.ApplePaySession) {
		useEffect(() => {

			if (!scriptRef.current && !loaded) {
				const script = document.createElement('script');
				script.src = scriptUrl;
				script.async = true;
				script.onload = () => {
					console.log('ApplePay onLoad');

				};

				script.onerror = error => {
					console.error('ApplePay load error:', error);
				};
				document.body.appendChild(script);

				// 清理函数，组件卸载时移除脚本
				return () => {
					if (scriptRef.current) {
						document.body.removeChild(script);
						scriptRef.current = null; // 清理引用
						//显示按钮
						('<apple-wallet-button buttonstyle="black"compact="true"locale="en-US" onclick="addOrder();"/>')
					}
				};
			}
		}, [scriptUrl]); // 如果scriptUrl会变化，请将其加入依赖数组	
	}

}
export default OceanPayment;