
export function ObjToQueryString(query) {
  const params = [];
  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key] != null) {
        if (Array.isArray(query[key])) {
          // Remove `[]` and repeat the key for each array item
          query[key].forEach((item) => {
            params.push(`${key}=${encodeURIComponent(item)}`);
          });
        } else {
          params.push(`${key}=${encodeURIComponent(query[key])}`);
        }
      }
    });
  }
  let queryString = "";
  if (params.length) {
    queryString = `?${params.join("&")}`;
  }
  return queryString;
}


export function userDisplayName(user) {
  if (!user) {
    return "";
  }
  if (user.firstName || user.lastName) {
    return `${user.firstName ? user.firstName : ""} ${user.lastName ? user.lastName : ""}`;
  }
  if (user.email) {
    return user.email;
  }
  return "";
}