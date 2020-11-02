import Cookies from "js-cookie";

function getDomain() {
  if (window.location.hostname !== "localhost") {
    return `.${document.domain
      .split(".")
      .slice(-2)
      .join(".")}`;
  } else {
    return document.domain
      .split(".")
      .slice(-2)
      .join(".");
  }
}

export function addCookie(name, value, day) {
  Cookies.set(name, value, { expires: day, domain: getDomain() });
}

export function getCookie(name) {
  let value = unescape(Cookies.get(name));
  if (!value || value === "undefined") {
    value = "";
  }
  return value;
}

export function removeCookie(name) {
  //   console.log("删除cookie", name);
  //   //获取当前时间
  //   var date = new Date();

  //   //将date设置为过去的时间
  //   date.setTime(date.getTime() - 10000);

  //   //将name这个cookie删除
  //   document.cookie = name+ "=111; expires=" + date.toGMTString();
  Cookies.remove(name, { domain: getDomain() });
}
