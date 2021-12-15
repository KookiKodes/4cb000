const getDataUrl = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", load);
    reader.addEventListener("error", error);
    function load() {
      resolve(reader.result);
      reader.removeEventListener("load", load);
    }
    function error() {
      reject(reader.error);
      reader.removeEventListener("error", error);
    }
  });
};

export default getDataUrl;
