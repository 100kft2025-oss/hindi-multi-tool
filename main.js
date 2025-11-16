let buckets = [
  "public/data/bucket1.json",
  "public/data/bucket2.json",
  "public/data/bucket3.json",
  "public/data/bucket4.json",
  "public/data/bucket5.json",
  "public/data/other.json"
];

let dictionary = {};

async function loadBuckets() {
  for (let bucket of buckets) {
    try {
      let res = await fetch(bucket);
      let json = await res.json();
      Object.assign(dictionary, json);
    } catch (e) {
      console.log("Error loading:", bucket);
    }
  }
}

loadBuckets();

function searchWord() {
  let w = document.getElementById("inputWord").value.trim();
  let resultBox = document.getElementById("result");

  if (dictionary[w]) {
    let data = dictionary[w];
    resultBox.innerHTML = `
      <h2>${w}</h2>
      <p><b>Synonyms:</b> ${data.synonyms.join(", ")}</p>
      <p><b>Antonyms:</b> ${data.antonyms.join(", ")}</p>
      <p><b>Definition:</b> ${data.definition}</p>
      <p><b>Example:</b> ${data.example}</p>
      <p><b>POS:</b> ${data.pos}</p>
    `;
  } else {
    resultBox.innerHTML = `<p>❌ शब्द database में नहीं है।</p>`;
  }
}
