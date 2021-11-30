const _pipe = (f, g) => (arg) => f(g(arg));
const pipe = (...fns) => fns.reduce(_pipe);

export default pipe;
