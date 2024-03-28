import React, {
	useEffect,
	useState,
	useRef
} from 'react';
import $ from 'jquery';

function OceanPayment() {
	const scriptJquery = 'https://secure.oceanpayment.com/pub/js/jquery/jq.js';
	const scriptUrl = 'https://secure.oceanpayment.com/pages/js/oceanpayment.js';
	const scriptRef = useRef(null);
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		if (!scriptRef.current && !loaded) {
			const jquery = document.createElement('script');
			jquery.src = scriptJquery;
			jquery.async = true;
			const script = document.createElement('script');
			script.src = scriptUrl;
			script.async = true;
			script.onload = () => {
				console.log('Oceanpayment onLoad');
				//加载成功过一次就不加载了
				window.Oceanpayment.init(true);
			};

			script.onerror = error => {
				console.error('Oceanpayment load error:', error);
			};

			// 将脚本添加到DOM中，这会触发脚本的加载
			document.body.appendChild(jquery);
			document.body.appendChild(script);

			// 清理函数，组件卸载时移除脚本
			return () => {
				if (scriptRef.current) {
					document.body.removeChild(jquery);
					document.body.removeChild(script);
					scriptRef.current = null; // 清理引用
				}
			};
		}
	}, [scriptJquery, scriptUrl]); // 如果scriptUrl会变化，请将其加入依赖数组
}
export default OceanPayment;