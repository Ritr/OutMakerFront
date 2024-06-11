import React, { useRef, useEffect } from 'react';  
  
const FormDataGoogle = ({ payUrl, formData }) => {
  const formRef = useRef(null);  
  
  useEffect(() => {  
    if (formRef.current) {  
      // 构造表单数据  
      const form = formRef.current;  
      Object.entries(formData).forEach(([key, value]) => {  
        const input = document.createElement('input');  
        input.type = 'hidden';  
        input.name = key;  
        input.value = value;  
        form.appendChild(input);  
      });  
  
      // 提交表单  
	if(payUrl){
	  console.log('google submit!');
	  form.submit();  	
	}
    }
  }, [payUrl, formData]);  
  
  return (  
    <form  
      ref={formRef}  
      style={{ display: 'none' }}  
      action={payUrl}  
      method="post"  
    />  
  );  
};  
export default FormDataGoogle;
  