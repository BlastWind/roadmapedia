export function textArrToHTML(textArr) {
  //["hi my name is", "andrew chen"] to <p>hi my name is<br>andrew chen</p>
  var initialHTML = "<p>";
  for (var i = 0; i < textArr.length; i++) {
    if (textArr[i] === "") {
      initialHTML += "<br>";
    } else initialHTML += textArr[i];

    if (i !== textArr.length - 1 && textArr[i] !== "") {
      initialHTML += "<br>";
    }
  }
  return initialHTML + "</p>";
}
