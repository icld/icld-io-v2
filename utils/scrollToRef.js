export const scrollToRef = (ref) => {
  window.scrollTo({
    top: (0, ref.current.offsetTop),
    behavior: 'smooth',
  });
};
