import { useQuery } from '@tanstack/react-query';

const useSubCategories = () => {

  const { data } = useQuery(["subcategory"], () =>
    fetch("https://api.theoutmaker.com/api/get/subcategory/all").then(
      (res) => res.json(),
    ),
    {
      cacheTime: 60000, // 设置缓存时间为 60 秒
      staleTime: 30000, // 设置数据过期时间为 30 秒
    }
  );

  return { subCategories: data ? data.Subcategories : [] };

};

export default useSubCategories;