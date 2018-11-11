import { slugify } from "../helpers";

const documentationByCategories = ({ endpoints }) => {
  const categories = {};
  
  endpoints.forEach(endpoint => {
    const { category } = endpoint;
    
    if(!categories[category]) {
      categories[category] = [endpoint];
    } else {
      categories[category].push(endpoint);
    }
  });
  
  return categories;
};

export {
  documentationByCategories
};