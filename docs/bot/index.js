var code = "/";
const params = getUrlParams();

getDataFromJson(params.cmd).then(data => {
  if (params.cmd != null) console.log(data)
  code += params.cmd;

  const extractedItems = {};
  for (const key in data.param) {
    if (data.param && data.param.hasOwnProperty(key)) {
      var str = key;

      extractedItems[key] = data.param[key];

      const ext2 = data.param[key].require;
      if (!ext2) {
        str += "?"
      }

      code += " " + "{" + str + "}";
    }
  }
  
  document.getElementById("s0-c").innerHTML = code;
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