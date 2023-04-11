import React, { useEffect, useState } from "react";
import "../../styles/Game.scss";
import { ImageElements } from "../Home/ImageElements";

function Game() {
  const [boardImage] = useState(() => {
    if (!!localStorage.getItem("boardId")) {
      return ImageElements[localStorage.getItem("boardId")];
    } else return ImageElements[0];
  });
  const [isLoading, setLoading] = useState(true);
  const [shuffledBoard, setShuffledBoard] = useState(null);
  const [solvedBoard, setSolvedBoard] = useState([]);

  const [isFinished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);

  const [touchedElementId, setTouchedElementId] = useState(null);

  const handleDragStart = (e, order) => {
    // console.log("DRAG ID: ", e.target.id, " order: ", order.id);
    // console.log("shuffledBoard.indexOf(order)", shuffledBoard.indexOf(order));

    const dt = e.dataTransfer;
    dt.setData("text/plain", shuffledBoard.indexOf(order));
    dt.effectAllowed = "move";
  };

  const handleTouchStart = (e, order) => {
    // console.log("TOUCH ID: ", e.target.id, " order: ", order.id);
    // console.log("shuffledBoard.indexOf(order)", shuffledBoard.indexOf(order));
    setTouchedElementId(shuffledBoard.indexOf(order));
  };

  const handleTouchMove = (e) => {
    // console.log("MOVE", e);

    var touchLocation = e.targetTouches[0];
    // console.log("touchLocation", touchLocation);

    var obj = e.target;
    var height = obj.offsetHeight / 2;
    var width = obj.offsetWidth / 2;
    obj.style.left = touchLocation.clientX - width + "px";
    obj.style.top = touchLocation.clientY - height + "px";
    obj.style.position = "absolute";
  };

  const handleDragOver = (e) => {
    console.log("handleDragOver");
    e.preventDefault();
    e.stopPropagation();
  };
  const handleTouchEnd = (e) => {
    console.log("handleTouchOver");
    e.preventDefault();
    e.target.style.left = null;
    e.target.style.top = null;
    e.target.style.position = null;

    const element = touchedElementId;
    // console.log(
    //   "handleDrop ",
    //   shuffledBoard[element],
    //   " to: ",
    //   e.targetTouches.id
    // );
    // console.log("element", element);

    var destination = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
    // console.log("destination", destination);
    // console.log("shuffledBoard[element].id", shuffledBoard[element].id);
    if (
      parseInt(shuffledBoard[element].id) === parseInt(destination.id) &&
      destination.className === "solvedPiece"
    ) {
      var solvedBoardNew = [...solvedBoard];
      solvedBoardNew[parseInt(destination.id)] = shuffledBoard[element];
      setSolvedBoard(solvedBoardNew);

      var shuffledBoardNew = [...shuffledBoard];
      if (element > -1) {
        shuffledBoardNew.splice(element, 1);
      }
      setShuffledBoard(shuffledBoardNew);
    } else console.log("niewłaściwy ruch: ", e);

    e.stopPropagation();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const element = dt.getData("text/plain", "order");
    // console.log("handleDrop ", shuffledBoard[dt], " to: ", e.target.id);
    // console.log("element", element);
    //
    // console.log("shuffledBoard[element].id", shuffledBoard[element].id);
    if (parseInt(shuffledBoard[element].id) === parseInt(e.target.id)) {
      var solvedBoardNew = [...solvedBoard];
      solvedBoardNew[parseInt(e.target.id)] = shuffledBoard[element];
      setSolvedBoard(solvedBoardNew);

      var shuffledBoardNew = [...shuffledBoard];
      if (element > -1) {
        shuffledBoardNew.splice(element, 1);
      }
      setShuffledBoard(shuffledBoardNew);
    } else console.log("niewłaściwy ruch");

    dt.clearData();
    e.stopPropagation();
  };

  function splitImage() {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      parts = [],
      img = new Image();

    img.onload = split_12;

    function split_12() {
      var w2 = Math.floor(img.width / 3),
        h2 = Math.floor(img.height / 4);
      console.log("w2=", w2, "h2=", h2);

      var i = 0;
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 3; col++) {
          var x = -w2 * col;
          var y = -h2 * row;
          canvas.width = w2;
          canvas.height = h2;

          console.log("x,y :", x, y);

          ctx.drawImage(this, x, y, w2 * 3, h2 * 4);

          parts.push({ url: canvas.toDataURL(), id: i++ });
        }
      }

      shuffle(parts);
      setShuffledBoard(parts);
      setLoading(false);

      // console.log(parts);
    }

    function shuffle(a) {
      for (
        var j, x, i = a.length;
        i;
        j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x
      );
      return a;
    }

    img.src = boardImage.image;
  }

  useEffect(() => {
    const fillEmptySolvedBoard = () => {
      var defaultBoard = [];
      var i = 0;
      while (defaultBoard.length < 12) {
        defaultBoard.push({ url: null, id: i++ });
      }
      setSolvedBoard(defaultBoard);
    };
    fillEmptySolvedBoard();
    splitImage();
  }, [boardImage]);

  useEffect(() => {
    const checkIsFinish = () => {
      if (!!shuffledBoard && !!solvedBoard && endTime === null) {
        if (shuffledBoard.length === 0 && solvedBoard.length === 12) {
          setFinished(true);
          setEndTime(Date.now());
        }
      }
    };
    checkIsFinish();
  }, [shuffledBoard]);

  const renderTime = () => {
    if (isFinished)
      return (
        <div className="finishText">
          Your time: {new Date(endTime - startTime).getTime() / 1000} sec
        </div>
      );
  };

  if (isLoading) {
    return (
      <>
        <div data-testid="game" />
        <div className="finishText">Loading</div>
      </>
    );
  } else
    return (
      <>
        <div data-testid="game" />
        <div className="boardsBox">
          <div className="solvedBoard">
            {solvedBoard.map((item, index) => (
              <div
                className="solvedPiece"
                id={item.id}
                key={item.id}
                // draggable={true}
                onDragOver={(e) => handleDragOver(e)}
                onTouchEnd={(e) => handleTouchEnd(e)}
                onDrop={(e) => handleDrop(e, item)}
              >
                {item.url !== null && (
                  <img
                    src={item.url}
                    id={item.id}
                    key={item.id}
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="shuffledBoard" id="shuffledBoard">
            {renderTime()}
            {shuffledBoard.map((item, index) => (
              <img
                src={item.url}
                className="piece"
                id={item.id}
                key={item.id}
                draggable={true}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchEnd={(e) => handleTouchEnd(e)}
                onTouchMove={(e) => handleTouchMove(e)}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, item)}
              />
            ))}
          </div>
        </div>
      </>
    );
}

export default Game;
