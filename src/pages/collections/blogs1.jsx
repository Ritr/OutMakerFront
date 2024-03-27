import React from "react";
import img1 from "../../assets/images/blog1.png";
import img2 from "../../assets/images/blog2.png";
import img3 from "../../assets/images/blog3.png";
import img4 from "../../assets/images/blog4.png";
import SingleBlog from "../../shared/Blog/SingleBlog";
import useCollections from "../../Hooks/useCollections";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import useCategories from "../../Hooks/useCategories";
import { useLocation } from "react-router-dom";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

const Blogs = () => {
  const { collections } = useCollections();
  const { categories } = useCategories();
  const location = useLocation();
  console.log(categories);
  console.log(location?.pathname);

  return (
    <section className="w-full">
      <div className="md:hidden bg-primary text-white text-center text-3xl font-bold uppercase py-6">
        COLLECTIONS.
      </div>
      <div className="px-4">
        <div className="md:hidden bg-[#FAFAFA] mt-4 mb-6 p-4">
          <div>
            <BiSolidQuoteLeft className="xl" />
          </div>
          <div className="text-sm px-4">
            Outmaker offers 9 collections of outdoor furniture with unic designs
            which will meet your special needs
          </div>
          <div className="flex justify-end">
            <BiSolidQuoteRight className="xl" />
          </div>
        </div>
        <div className="text-center pt-5 md:pt-10">
          {/* <h2 className="text-4xl font-medium text-black">
            {location?.pathname === "/categories"
              ? "CATEGORIES"
              : "COLLECTIONS"}
          </h2> */}
          {/* <h4 className="text-2xl font-medium text-[#002B5B] pt-2">OUTMAKER</h4> */}
          {/* <p className="py-4 md:py-10 text-base font-light">
            Outmaker offers {collections?.length}
            {location?.pathname === "/categories"
              ? "categories"
              : "collections"}
            of outdoor furniture with unic designs which will meet your special
            needs
          </p> */}
        </div>
        {location?.pathname === "/categories"
          ? categories?.map((category, index) => (
              <SingleBlog
                key={category?.category_id}
                contactPage={false}
                image={ImgBaseUrl(category?.category_pic)}
                name={category?.category_name}
                description={category?.category_desc}
                id={category?.category_id}
                category={true}
                className={index % 2 === 1 ? "order-last" : ""}
              />
            ))
          : collections?.map((collection, index) => (
              <SingleBlog
                key={collection?.collection_id}
                contactPage={false}
                image={ImgBaseUrl(collection?.collection_pic)}
                name={collection?.collection_name}
                description={collection?.collection_desc}
                id={collection?.collection_id}
                className={index % 2 === 1 ? "order-last" : ""}
              />
            ))}
      </div>
      {/* <SingleBlog
        contactPage={false}
        image={img1}
        name="KAMA"
        description="The cushioning concept revisited, tables with their ergonomic
					waist-high tops. An innovative and modular approach to outdoor
					furniture.Let's push the boundaries in order to make life more fun!"
      />
      <SingleBlog
        className="order-last"
        image={img2}
        name="EXTRADOS"
        description="Like an albatross floating in the azure… Dining sets with aerial and pure lines.Accessorize your table according to your desire by creating your own table runner.Design EGO Paris."
      />
      <SingleBlog
        image={img3}
        name="SUTRA"
        description="Sutra revisits the Kama collection with a graphic design and takes modularity a step further.By alternating wood and aluminum, Sutra plays with light and shadows.Design Studio 5.5"
      />
      <SingleBlog
        className="order-last"
        image={img4}
        name="MARUMI"
        description="Praising the roundness, Marumi invites you to softness and serenity.Design Thomas Sauvage"
      /> */}
    </section>
  );
};

export default Blogs;
