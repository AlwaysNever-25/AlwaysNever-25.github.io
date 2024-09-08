const desiredRepo = "AlwaysNever-25.github.io";
const dateTagClass = ".date"; // The HTML element you want to update
const monthList = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function()
{
  if (this.readyState == 4 && this.status == 200)
  {
      let repos = JSON.parse(this.responseText);

      repos.forEach((repo)=>{
      if (repo.name == desiredRepo)
      {
          var lastUpdated = new Date(repo.pushed_at);
          var day = lastUpdated.getUTCDate();
          var month = lastUpdated.getUTCMonth();
          var year = lastUpdated.getUTCFullYear();
          var hour = addZero(lastUpdated.getUTCHours());
          var minutes = addZero(lastUpdated.getUTCMinutes());
          let monthText = monthList[month]
          $(dateTagClass).text(`Last updated: ${hour}:${minutes} UTC, ${monthText} ${day}, ${year}`);
      }
      });
  }
};

xhttp.open("GET", "https://api.github.com/users/alwaysnever-25/repos", true);
xhttp.send();