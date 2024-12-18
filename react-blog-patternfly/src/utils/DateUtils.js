import { format } from "date-fns";
const currentDate = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // 自定义格式
  console.log(formattedDate);
  return formattedDate;
};
export default currentDate;
