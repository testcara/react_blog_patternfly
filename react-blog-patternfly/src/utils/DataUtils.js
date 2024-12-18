const FetchData = (name) => {
  return JSON.parse(localStorage.getItem(name)) || [];
};

const FetchTargetData = (name, id) => {
  const allItems = FetchData(name);
  return allItems.find((item) => item.id === parseInt(id));
};

const AppendData = (name, data) => {
  const savedData = FetchData(name);
  savedData.push(data);
  localStorage.setItem(name, JSON.stringify(savedData));
  return savedData;
};
const DeleteData = (name, id) => {
  const savedData = FetchData(name);
  const updatedData = savedData.filter((data) => data.id !== id);
  localStorage.setItem(name, JSON.stringify(updatedData));
  return updatedData;
};
const SaveData = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
  return;
};
const RemoveData = (name) => {
  localStorage.removeItem(name);
};

export {
  FetchData,
  FetchTargetData,
  DeleteData,
  RemoveData,
  AppendData,
  SaveData,
};
