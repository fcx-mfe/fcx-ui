import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useData } from "../../../../contexts/DataProvider";
import "./CategoriesSection.css";

const CategoriesSection = () => {
  // const { state, dispatch } = useData();
  const [categories, setCategories] = useState([]);
  // const dispatch = ({ type, payload}) => console.log(type, payload);

  useEffect(() => {
    const encryptedKey = MessageEncryptionService.getEncryptedKey();
    const aesKey = MessageEncryptionService.decryptAESKeyWithRSA(encryptedKey);

    PubSub.publish("EVENTS.CATEGORIES_GET");
    PubSub.subscribe("EVENTS.CATEGORIES_GET_SUCCEEDED", async (type, { encryptedData, iv }) => {
      const decryptedData = await MessageEncryptionService.decryptData({ encryptedData, iv }, aesKey);
      const { categories } = JSON.parse(decryptedData);

      setCategories(categories);
    });
  }, []);

  return (
    <div>
      <h1 className="categories-heading">Shop By Categories</h1>
      <div className="categories-container">
        {categories.map(({ _id, categoryName, img }) => (
          <Link
            onClick={() =>
              dispatch({
                type: "ADD_CATEGORIES_FROM_HOME",
                payload: categoryName,
              })
            }
            to="/product-listing"
            className="category-card"
            key={_id}
          >
            <h3>{categoryName}'s</h3>
            <div className="img-cont">
              <img src={img} alt={categoryName} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
