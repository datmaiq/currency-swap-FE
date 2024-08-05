const importAll = (requireContext, validTokens) =>
  requireContext.keys().reduce((images, item) => {
    const key = item.slice(2, -4).toLowerCase();
    if (validTokens.includes(key)) {
      images[key] = requireContext(item);
    }
    return images;
  }, {});

const loadTokenImages = (validTokens) => {
  const images = importAll(
    require.context("./assets/tokens", false, /\.svg$/),
    validTokens
  );
  console.log("Loaded images:", images);
  return images;
};

export default loadTokenImages;
