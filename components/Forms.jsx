import styled from "@emotion/native";
import { useState } from "react";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const Forms = ({getList}) => {
  const tabName = useSelector((state) => state.tab.name);
  const [text, onChangeText] = useState("");

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  const plusToDo = async () => {
    let id = uuidv4();
    const docRef = doc(db, "ToDoList", `${id}`);
    try {
      await setDoc(docRef, {
        id: id,
        createdAt: `${year}.${month}.${day} ${hour > 9 ? hour : "0" + hour}:${minute > 9 ? minute : "0" + minute}`,
        toDo: text,
        category: tabName,
        isDone: false,
      });
      onChangeText("");
      getList();
    } catch (error) {
      console.log(error);
    }
  };
  return <StTextInput placeholder="할일을 입력해주세요" onChangeText={onChangeText} onSubmitEditing={plusToDo} value={text} />;
};

const StTextInput = styled.TextInput`
  width: 90%;
  height: 50px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
`;

export default Forms;
