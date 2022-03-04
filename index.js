const timer = ms => new Promise(res => setTimeout(res, ms))

function downloadFile(id, name) {
  let a = document.createElement("a");
  a.href = assetBaseUrl.replace("[[id]]", id);
  a.setAttribute("download", `${name}.jpg`);
  a.click();
}

let pages = await fetch(pagesUrl).then(res => res.json());

async function downloader() {
  for (let i = 0; i < pages.length; i++) {
    downloadFile(pages[i].objectId, i + 1);
    await timer(1000);
  }
}

if (confirm(`This will download ${pages.length} files. Do you want to continue?`)) {
  downloader();
}