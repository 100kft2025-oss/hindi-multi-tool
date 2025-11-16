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
function openTool(type) {
  localStorage.setItem("tool", type);
  window.location.href = "tools.html";
}
async function findWord() {
  const word = document.getElementById("userInput").value.trim();
  const tool = localStorage.getItem("tool");

  if (!word) return alert("कृपया शब्द लिखें");

  // bucket file load
  const res = await fetch("public/data/bucket1.json");
  const data = await res.json();

  // अगर शब्द bucket में नहीं है:
  if (!data[word]) {
    document.getElementById("resultBox").innerHTML =
      "<p>❌ डेटा नहीं मिला</p>";
    return;
  }

  // WORD मिल गया
  let result = data[word];

  if (tool === "synonym") {
    document.getElementById("resultBox").innerHTML =
      "<h3>पर्यायवाची</h3><p>" + result.synonym + "</p>";
  }

  if (tool === "antonym") {
    document.getElementById("resultBox").innerHTML =
      "<h3>विलोम</h3><p>" + result.antonym + "</p>";
  }

  if (tool === "matra") {
    document.getElementById("resultBox").innerHTML =
      "<h3>मात्रा सुधार</h3><p>" + result.matra + "</p>";
  }

  if (tool === "sandhi") {
    document.getElementById("resultBox").innerHTML =
      "<h3>संधि विच्छेद</h3><p>" + result.sandhi + "</p>";
  }
}
