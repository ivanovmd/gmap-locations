export function injectScript(url: string) {
  const node = document.createElement('script');
  node.src = url;
  node.type = 'text/javascript';
  node.async = false;
  document.getElementsByTagName('head')[0].appendChild(node);
  return new Promise((resolve, reject) => {
    node.addEventListener('load', () => {
      resolve();
    });
  });
}
