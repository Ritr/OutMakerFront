import React, {
	useEffect,
	useState,
	useRef
} from 'react';
function OceanGoogle() {

	const scriptUrl = 'https://pay.google.com/gp/p/js/pay.js';
	const scriptRef = useRef(null);
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {

		if (!scriptRef.current && !loaded) {
			const script = document.createElement('script');
			script.src = scriptUrl;
			script.async = true;
			script.onload = () => {
                //api版本
				const baseRequest = {
					apiVersion: 2,
					apiVersionMinor: 0
				};
				//卡类型
				const allowedCardNetworks = ["MASTERCARD", "VISA"];
				//卡认证
				const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
                //支付类型
				const tokenizationSpecification = {
					type: 'PAYMENT_GATEWAY',
					parameters: {
						'gateway': 'oceanpayment',
						'gatewayMerchantId': '239428'
					}
				};
				const baseCardPaymentMethod = {
					type: 'CARD',
					parameters: {
						allowedAuthMethods: allowedCardAuthMethods,
						allowedCardNetworks: allowedCardNetworks
					}
				};

				const cardPaymentMethod = Object.assign({},
					baseCardPaymentMethod, {
					tokenizationSpecification: tokenizationSpecification
				}
				);
				let paymentsClient = null;
 
				function getGoogleIsReadyToPayRequest() {
					return Object.assign({},
						baseRequest, {
						allowedPaymentMethods: [baseCardPaymentMethod]
					}
					);
				}
				function getGooglePaymentDataRequest() {
					const paymentDataRequest = Object.assign({}, baseRequest);
					paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
					paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
					paymentDataRequest.merchantInfo = {
						// @todo a merchant ID is available for a production environment after approval by Google
						// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
						// merchantId: '01234567890123456789',
						merchantName: 'Example Merchant'
					};
					return paymentDataRequest;
				}
				function getGooglePaymentsClient() {
					if (paymentsClient === null) {
						paymentsClient = new google.payments.api.PaymentsClient({
							environment: 'TEST'
						});
					}
					return paymentsClient;
				}
				function onGooglePayLoaded() {
					const paymentsClient = getGooglePaymentsClient();
					paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
						.then(function (response) {
							if (response.result) {
								addGooglePayButton();
								// @todo prefetch payment data to improve performance after confirming site functionality
								// prefetchGooglePaymentData();
							}
						})
						.catch(function (err) {
							// show error in developer console for debugging
							console.error(err);
						});
				}
				function addGooglePayButton() {
					const paymentsClient = getGooglePaymentsClient();
					const button =
						paymentsClient.createButton({
							onClick: onGooglePaymentButtonClicked
						});
					document.getElementById('container').appendChild(button);
				}
				function getGoogleTransactionInfo() {
					return {
						countryCode: 'US',
						currencyCode: 'USD',
						totalPriceStatus: 'FINAL',
						// set to cart total
						totalPrice: '1.00'
					};
				}
 
				function prefetchGooglePaymentData() {
					const paymentDataRequest = getGooglePaymentDataRequest();
					// transactionInfo must be set but does not affect cache
					paymentDataRequest.transactionInfo = {
						totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
						currencyCode: 'USD'
					};
					const paymentsClient = getGooglePaymentsClient();
					paymentsClient.prefetchPaymentData(paymentDataRequest);
				}
 
				function onGooglePaymentButtonClicked() {
					const paymentDataRequest = getGooglePaymentDataRequest();
					paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

					const paymentsClient = getGooglePaymentsClient();
					paymentsClient.loadPaymentData(paymentDataRequest)
						.then(function (paymentData) {
							// handle the response
							processPayment(paymentData);
						})
						.catch(function (err) {
							// show error in developer console for debugging
							console.error(err);
						});
				}
				function processPayment(paymentData) {
					// show returned data in developer console for debugging
					console.log(paymentData);
					// @todo pass payment token to your gateway to process payment
					paymentToken = paymentData.paymentMethodData.tokenizationData.token;
				}

			};

			script.onerror = error => {
				console.error('OceanpayGoogle load error:', error);
			};

			// 将脚本添加到DOM中，这会触发脚本的加载
			document.body.appendChild(script);

			// 清理函数，组件卸载时移除脚本
			return () => {
				if (scriptRef.current) {
					document.body.removeChild(script);
					scriptRef.current = null; // 清理引用
				}
			};
		}
	}, [scriptUrl]); // 如果scriptUrl会变化，请将其加入依赖数组
}

export default OceanGoogle;