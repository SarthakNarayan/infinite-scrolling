import React from "react";
import { Waypoint } from "react-waypoint";

const Person = ({ entries, onLoadMore }) => {
  window.onscroll = function (ev) {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      // console.log("calling");
      onLoadMore();
    }
  };

  return (
    <div>
      <h1>List</h1>
      {entries.map((entry, index) => (
        <React.Fragment key={entry.author}>
          <p>{entry.author}</p>
          {/* using waypoint if you want limited entries which donot induce a scroll bar
              if the contents induce a scroll bar then above logic is enough and this part can be removed*/}
          {(index + 1) % entries.length === 0 && (
            <Waypoint
              onEnter={() => {
                onLoadMore();
                // console.log("calling");
                // console.log(index);
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Person;
