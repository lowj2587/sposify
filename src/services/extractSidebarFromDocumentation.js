const extractSidebarCategoriesFromDocumentation = documentation => {
  return documentation.endpoints.map(({ category }) => category).filter((category, pos, arr) => {
    return arr.indexOf(category) == pos;
  }).sort();
};

const extractSidebarFromDocumentation = documentation => {
  return extractSidebarCategoriesFromDocumentation(documentation);
};

export {
  extractSidebarFromDocumentation
};