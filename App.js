import { useState } from "react";

export default function App() {

  const [list, setList] = useState([]);

  console.table(list);
  const add = (newVal) => {
    setList([...list, { key: uniqueID(), val: newVal, sublist: [] }]);
  };

  return (
    <>
      <Input placeholder={"add list item"} add={add} />
      <br />
      {list.map((e, i) => (
        <ListItem
          key={e.key}
          index={i}
          item={e}
          list={list}
          setList={setList}
        />
      ))}
    </>
  );
}

function ListItem({ index, item, list, setList }) {
  const copy = [...list];
  const del = () => {
    copy.splice(index, 1);
    setList(copy);
  };

  const updateSublist = (newSublist) => {
    copy[index].sublist = newSublist;
    setList(copy);
    // console.log(newSublist);
  };

  const add = (newVal) => {
    copy[index].sublist.push({ key: uniqueID(), subVal: newVal });
    setList(copy);
  };

  const update = (newVal) => {
    copy[index].val = newVal;
    setList(copy);
  };

  return (
    <>
      <Input value={item.val} update={update} />
      <Button del={del} />
      <div>
        {item.sublist.map((subE, subI) => (
          <SublistItem
            key={subE.key}
            subIndex={subI}
            subItem={subE}
            subList={item.sublist}
            updateSublist={updateSublist}
          />
        ))}
      </div>
      <Input placeholder={"add sublist item"} add={add} />
      <br />
      <div>--------------</div>
    </>
  );
}

function SublistItem({ subIndex, subItem, subList, updateSublist }) {
  const copy = [...subList];

  const del = () => {
    copy.splice(subIndex, 1);
    updateSublist(copy);
  };
  const update = (newVal) => {
    copy[subIndex].subVal = newVal;
    updateSublist(copy);
  };
  return (
    <>
      <Input value={subItem.subVal} update={update} />
      <Button del={del} />
    </>
  );
}

function Button({ del }) {
  return (
    <>
      <button onClick={del}>X</button>
    </>
  );
}

function Input({ placeholder, value, update, add }) {
  const [inputVal, setInputVal] = useState(value);
  console.log("value: " + value, "inuptVal: " + inputVal);
  // console.log(add !== undefined)
  const submit = (e) => {
    if (e.keyCode === 13) {
      if (add !== undefined) {
        add(inputVal);
        setInputVal("");
      }
    }
  };

  return (
    <>
      <input
        // key={value}
        value={inputVal}
        //delete work if value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const newVal = e.target.value;
          if (add === undefined) {
            update(newVal);
          }
          setInputVal(newVal);
        }}
        onKeyDown={(e) => {
          submit(e);
        }}
      />
    </>
  );
}


const uniqueID = () => {
  return (((1 + Math.random()) * 0x10000000000000) | 0)
    .toString(32)
    .substr(1);
};
