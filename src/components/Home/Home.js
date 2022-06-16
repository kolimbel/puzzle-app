import React from "react";
import "../../styles/Home.scss";
import { ImageElements } from "./ImageElements";
import { Link } from "react-router-dom";

function Home() {
  const setBoard = (item) => {
    console.log("localstorage set:", item);
    localStorage.setItem("boardId", item);
  };

  return (
    <>
      <div className="title">Wybierz planszę</div>
      <div className="chooseBoard" data-testid="chooseBoard">
        {ImageElements.map((item, index) => (
          <div className="boardElement" id={index} key={index}>
            <Link
              to="/game"
              onClick={() => {
                setBoard(index);
              }}
            >
              {/*{item.title}*/}
              <img src={item.image} className="boardElementMiniature" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
