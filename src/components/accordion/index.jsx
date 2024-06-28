import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getId) {
    // console.log(getId);
    setSelected(getId === selected ? null : getId);
    // console.log(getId);
    // setSelected(getId);
  }

  function handleMultiSelection(getId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getId);

    if (findIndexOfCurrentId === -1) cpyMultiple.push(getId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMultiple);
    // console.log(multiple);
    // console.log(cpyMultiple);
  }

  console.log(selected, multiple);
  return (
    <div className="wrapper">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className={`multiSelBtn ${enableMultiSelection ? "on" : "off"}`}
        // onChange={() => setSelected(null)}
      >
        {enableMultiSelection
          ? "Multi Selection Enabled"
          : "Enable Multi Selection"}
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>
                  {
                    selected === dataItem.id ||
                    multiple.indexOf(dataItem.id) === -1
                      ? // (multiple.indexOf(dataItem.id) === -1 && selected !== null)
                        String.fromCharCode(8963) // (8593) up arrow
                      : String.fromCharCode(8964) // (8595) down arrow
                  }
                </span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) === -1 && (
                    <div className="content">{dataItem.answer} </div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer} </div>
                  )}
              {/* {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content"> {dataItem.answer} </div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div> No data found!</div>
        )}
      </div>
    </div>
  );
}
