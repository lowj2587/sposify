const extractCategoryNamesFromDocumentation = documentation => {
  return documentation.endpoints.map(({ category }) => category).filter((category, pos, arr) => {
    return arr.indexOf(category) == pos;
  }).sort();
};

const sidebarFromDocumentation = documentation => {
  return extractCategoryNamesFromDocumentation(documentation).map(categoryName => ({
    categoryName,
    categoryUrl: ""
  }));
};

export {
  sidebarFromDocumentation
};