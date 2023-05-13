async function fetchGet(url:string) {
  try {
    let response = await fetch(url);
    if (response.status === 403) {
      return { data: null };
    }
    let data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}

export { fetchGet };
