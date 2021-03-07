const initialNodes = [
  {
    type: "text",
    id: 0,
    width: 150,
    height: 60,
    text: [""],
    x: 100,
    y: 300,
    backgroundColor: "#FFFFFF",
    strokeColor: "#000000",
    textColor: "#000000",
    textSize: 15,
  },
  {
    type: "circle",
    id: 1,
    width: 150,
    height: 40,
    text: [""],
    x: 300,
    y: 200,
    storedInfo: {
      url: "https://www.google.com",
      info:
        "Join Coursera for free and learn online. Build skills with courses from top universities like Yale, Michigan, Stanford, and leading companies like Google and IBM. Advance your career with degrees, certificates, Specializations, &amp; MOOCs in data science, computer science, business, and dozens of o",
      picture:
        "https://forked-besticon.herokuapp.com//icon?url=http://www.google.com&size=80..120..200",
      title:
        "Coursera | Build Skills with Online Courses from Top InstitutionsListLoupe CopyLoupe CopyLoupe CopyChevron LeftChevron Right",
    },
    backgroundColor: "#FFFFFF",
    strokeColor: "#000000",
  },
  {
    type: "circle",
    id: 2,
    width: 150,
    height: 40,
    text: [""],
    x: 300,
    y: 150,
    storedInfo: {
      url: "https://www.google.com",
      info: "Join Coursera for free and learn online. Buil",
      picture: "",
      title: "",
    },
    backgroundColor: "#FFFFFF",
    strokeColor: "#000000",
  },
];

const initialLinks = [
  {
    source: 0,
    target: 1,
    linkDistance: 250,
    linkColor: "#000000",
  },
];

export { initialNodes as nodes, initialLinks as links };
