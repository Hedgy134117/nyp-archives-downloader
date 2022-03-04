const timer = ms => new Promise(res => setTimeout(res, ms))

function downloadFile(id, name) {
  let a = document.createElement("a");
  a.href = assetBaseUrl.replace("[[id]]", id);
  a.setAttribute("download", `${name}.jpg`);
  a.click();
}

let pages = await fetch(pagesUrl).then(res => res.json());

async function downloader(name, limit) {
  limit = limit || pages.length;
  for (let i = 0; i < limit; i++) {
    downloadFile(pages[i].objectId, `${name} ${i + 1}`);
    await timer(1000);
  }
}

if (confirm(`This will download ${pages.length} files. Do you want to continue?`)) {
  let name = prompt("Name of part: ");
  let limit = prompt("Limit number of files (leave blank for no limit): ")
  limit = parseInt(limit);
  downloader(name, limit);
}