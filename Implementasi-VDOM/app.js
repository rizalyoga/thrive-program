const AnimeBio = () => {
  return dataCharacter.map((data) =>
    React.createElement("div", { className: "card" }, [
      React.createElement("img", { className: "image", src: data.imageProfile }),
      React.createElement("h1", {}, data.name),
      React.createElement("h2", {}, data.age),
      React.createElement("h2", {}, data.city),
    ])
  );
};

const App = () => {
  return React.createElement("div", { className: "container" }, AnimeBio());
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));

{
  /* <div class="container">
      <div class="card">
        <img class="image" src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" />
        <h1>Doraemon</h1>
        <h2>40</h2>
        <h3>Toyama</h3>
      </div>
      <div class="card">
        <img class="image" src="https://pbs.twimg.com/profile_images/493416454104969216/2gt_nClw_400x400.jpeg" />
        <h1>Goku</h1>
        <h2>11</h2>
        <h3>West City</h3>
      </div>
      <div class="card">
        <img class="image" src="https://pbs.twimg.com/media/DyXR3quXQAUBo81.jpg" />
        <h1>Itachi</h1>
        <h2>8</h2>
        <h3>Konoha</h3>
      </div>
    </div> */
}
