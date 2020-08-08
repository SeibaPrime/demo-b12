let privateKey = "54d628af82f09e6008c406e46e5801766b70dc53";
let publicKey = "1c71fd1c40e7ffde38d3d52c5e2f9bc7";
let apiURL = "https://gateway.marvel.com:443/v1/public/characters";

//generate key
let key = marvelKey(privateKey, publicKey);
// console.log(key);

let fullURL = `${apiURL}?${key}`;
// console.log(fullURL)
async function getData() {
	let data = await fetch(fullURL);
	let dataJSON = await data.json();
	let results = dataJSON.data.results;

	renderData(results);
}

$("#search_button").on("click", async function () {
	let inputValue = $("#search_bar").val();
	let searchUrl = `${apiURL}?${key}&nameStartsWith=${inputValue}`;

	let data = await fetch(searchUrl);
	let searchHero = await data.json();
	let finalData = searchHero.data.results;

	renderData(finalData);
});

//renderData
function renderData(results) {
	let renderData = "";
	for (let i = 0; i < results.length; i++) {
		let name = results[i].name;
		let path = results[i].thumbnail.path;
		let extension = results[i].thumbnail.extension;
		let available = results[i].comics.available;
    let id=results[i].id;
    renderData += `
    <a href="/Marvel/detail.html?id=${id}>
    <div class="character">
      <img src=${path + "." + extension} alt="">
      <h5>${name}</h5>
      <h6>${available}</h6>
    </div>
    </a>`;


		// console.log(name, path + "." + extension, available);
	}
	$("#content").html(renderData);
}

getData();
