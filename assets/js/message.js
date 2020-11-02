/*
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-09-04 11:53:42
 * @LastEditTime: 2020-09-04 11:54:27
 * @Descripttion: 全局配置$message
 */
import ElementUI from "element-ui";
const $message = function(options) {
  if (typeof options === "string") {
    options = {
      message: options,
      showClose: true,
      duration: 1800,
      offset: 60
    };
  }
  ElementUI.Message(options);
};
["success", "warning", "info", "error"].forEach(type => {
  $message[type] = options => {
    if (typeof options === "string") {
      options = {
        showClose: true,
        duration: 1800,
        message: options,
        offset: 60
      };
    }
    return ElementUI.Message[type](options);
  };
});
export default $message;