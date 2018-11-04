const extractSidebarFromDocumentation = documentation => {
  return documentation.endpoints.map(endpoint => endpoint.category).filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
};

export {
  extractSidebarFromDocumentation
};