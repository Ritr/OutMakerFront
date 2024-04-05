// UserInitialization.js

import React, { useEffect } from "react";
import { useSetUserCode } from "../../Hooks/api/useSetUserCode";

const UserInitialization = ({
  onReady
}) => {
  const { mutate: setUserCode, data } = useSetUserCode();
  const storedUserCode = localStorage.getItem("usercode");
  useEffect(() => {
    if (!storedUserCode) {
      setUserCode(undefined, {
        onSuccess: (data) => {
          localStorage.setItem("usercode", data);
          onReady();
        },
      });
    }else{
      onReady();
    }
  }, [setUserCode]);

  return null;
};

export default UserInitialization;
