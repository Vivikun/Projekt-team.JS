const save = (key, value) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? [] : JSON.parse(data);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Remove state error: ', error.message);
  }
};

export default {
  save,
  load,
  remove,
};
