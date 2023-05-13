import { AXIOS_INSTANCE } from "@/api/mutator/custom-instance";
import { useUserStore } from "@/store";
import { useCounter } from "@mantine/hooks";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This hook is used to intercept axios responses and check for 401 status code
// This hook also intercepts axios requests and adds the access token to the request header
// This is done in a hook, instead of a pure axios inteceptor so we can use react-router-dom's navigate function
// Pleeasee note that interceptor need some time to initialize, so we need to wait for it to finish
// Thats why we use the useCounter hook to check if the interceptor is ready
const useAxiosAuthInterceptorHook = () => {
  const navigate = useNavigate();
  const accessToken = useUserStore((state) => state.accessToken);
  const [initCounter, initHandler] = useCounter(0, { max: 2 });

  // Mount the response interceptor
  useEffect(() => {
    const responseInterceptor = (response: AxiosResponse) => {
      if (response.status === 401) {
        navigate("/");
      }

      return response;
    };

    const interceptor =
      AXIOS_INSTANCE.interceptors.response.use(responseInterceptor);

    initHandler.increment();

    return () => {
      initHandler.decrement();
      AXIOS_INSTANCE.interceptors.response.eject(interceptor);
    };
  }, []);

  // Remount the request interceptor when the access token changes
  useEffect(() => {
    const requestInterceptor = (config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    };

    const interceptor =
      AXIOS_INSTANCE.interceptors.request.use(requestInterceptor);

    initHandler.increment();

    return () => {
      initHandler.decrement();
      AXIOS_INSTANCE.interceptors.request.eject(interceptor);
    };
  }, [accessToken]);

  // Check if both interceptors (response and request) are ready
  return initCounter === 2;
};

export default useAxiosAuthInterceptorHook;
