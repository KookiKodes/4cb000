import pipe from "./pipe";
const pipeInto = (arg, ...fns) => pipe(...fns)(arg);
export default pipeInto;
