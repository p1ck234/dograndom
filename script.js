const imageElement = document.querySelector(".container");
const buttonElement = document.querySelector(".button");
const loadingElement = document.querySelector(".loading");
const checkboxElement = document.querySelector(".checkbox");
const fetchPromiseGet = (url = "https://dog.ceo/api/breeds/image/random") => {
  const fetchPromise = fetch(url, {
    method: "GET",
  });

  return fetchPromise
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else if (res.status === 500) {
        throw new Error("Сервер упал");
      } else {
        throw new Error("Что-то пошло не так");
      }
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      if (error.message === "Сервер упал") {
        alert("Сервер упал");
      } else {
        alert("Что-то пошло не так");
      }
    });
};
fetchPromiseGet().then((responseData) => {
  imageElement.style.backgroundImage = `url("${responseData.message}")`;
});
buttonElement.addEventListener("click", () => {
  if (checkboxElement.checked) {
    loadingElement.style.display = "block";
    imageElement.style.display = "none";
    fetchPromiseGet(
      `https://dog.ceo/api/breeds/affenpinscher/images/random`
    ).then((responseData) => {
      imageElement.style.backgroundImage = `url("${responseData.message}")`;
      loadingElement.style.display = "none";
      imageElement.style.display = "block";
    });
  } else {
    loadingElement.style.display = "block";
    imageElement.style.display = "none";
    fetchPromiseGet().then((responseData) => {
      imageElement.style.backgroundImage = `url("${responseData.message}")`;
      loadingElement.style.display = "none";
      imageElement.style.display = "block";
    });
  }
});
