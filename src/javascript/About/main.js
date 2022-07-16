const mainAbout = () => {
    console.log('Load About Javascript')
    const root = document.querySelector("#root");
    const buildDom = (html) => {
      root.innerHTML = html;
      return root;
    };
}

window.addEventListener('load', mainAbout)