const wrapper = {
  wrapperWidth: window.innerWidth * .7,
//   wrapperWidth: 700,
  wrapperHeight: window.innerHeight * .8,
  margin: {
    top: 60,
    right: 100,
    bottom: 100,
    left: 140,
  },
  marginTop: 60,
  marginRight: 100,
  marginBottom: 100,
  marginLeft: 140
};

const bounded = {
  width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
  height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};

export { wrapper, bounded };