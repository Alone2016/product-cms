export const urlParams = (name: string) => {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1]);
};
