var code = "/";
const params = getUrlParams();

getDataFromJson(params.cmd).then(data => {
  if (params.cmd != null) console.log(data)
  code += params.cmd;

  const extractedItems = {};
  for (const key in data.param) {
    if (data.param && data.param.hasOwnProperty(key)) {
      document.getElementById("param").innerHTML = "Params: ";

      var str = key;

      extractedItems[key] = data.param[key];

      const ext2 = data.param[key].require;
      if (!ext2) {
        str += "?"
      }

      code += " " + "{" + str + ": " + data.param[key].type + "}";

      const newElement = document.createElement("li");
      newElement.id = "params-" + key;
      newElement.innerHTML = "<code>{" + str + ": " + data.param[key].type +"}</code>" + " - " + extractedItems[key].description;
      document.getElementById("params").appendChild(newElement);

      if (extractedItems[key].hasOwnProperty("enum")) {
        const enums = extractedItems[key].enum;
        const enumLocation = document.createElement("ul");
        document.getElementById("params").appendChild(enumLocation);

        for (const enumKey in enums) {
          if (enums.hasOwnProperty(enumKey)) {
            const enumElement = document.createElement("li");
            enumElement.innerHTML = `<code>${enumKey}</code>: ${enums[enumKey]}`;
            enumLocation.appendChild(enumElement);
          }
        }
      }
    }
  }

  for (const key in data.ex)
  {
    document.getElementById("ex").innerHTML = "Exceptions: ";
    const ex = data.ex[key];
    const newElement = document.createElement("li");
    newElement.innerHTML = ex;
    document.getElementById("exs").appendChild(newElement);
  }

  var ps;
  if (data.permission == 0) ps = "Everyone";
  if (data.permission == 1) ps = "Administrator";
  
  document.getElementById("s0-c").innerHTML = code;
  document.getElementById("description").innerHTML = "Description: " + data.description;
  document.getElementById("permission").innerHTML = "Permission: " + ps;

}).catch(error => {
  if (params.cmd != null) console.error(error);
});

function getUrlParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }
  if (params.cmd != null) console.log(params);
  return params;
}

async function getDataFromJson(cmd) {
  try {
    const response = await fetch('cmd.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    if (jsonData.hasOwnProperty(cmd)) {
      return jsonData[cmd];
    } else {
      throw new Error(`No data found for command: ${cmd}`);
    }
  } catch (error) {
    if (params.cmd == null) {
      document.getElementById("s0-a").hidden = true;
    } else {
      console.error('Error fetching JSON data:', error);
      throw error;
    }
  }
}

const links = document.querySelectorAll('a[href]');
links.forEach(link => {
  const href = link.getAttribute('href');
  if (href.endsWith(params.cmd)) {
    link.classList.add('active');
  }
});

if (params.cmd != null) document.getElementById('s0-b').hidden = true;
