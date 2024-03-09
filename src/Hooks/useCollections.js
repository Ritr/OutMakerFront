import { useQuery } from '@tanstack/react-query';

const useCollections = () => {
  const { data } = useQuery(["collections"], () =>
    fetch("https://www.theoutmaker.com/api/get/collection/all").then(
      (res) => res.json(),
    ),
    {
      cacheTime: 60000, // 设置缓存时间为 60 秒
      staleTime: 30000, // 设置数据过期时间为 30 秒
    }
  );

  return { collections: data ? data.Collections : [] };
};

export default useCollections;
