export const isMobile = state => {
  switch (state.browser.mediaType) {
    case "small":
    case "extraSmall":
      return true;
    default:
      return false;
  }
};
