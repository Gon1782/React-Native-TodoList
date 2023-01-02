import { Text, Alert } from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { offEdit, toggleEdit } from "../redux/modules/editSlice";

const Lists = ({ getList, lists }) => {
  const dispatch = useDispatch();
  const tabName = useSelector((state) => state.tab.name);
  const edit = useSelector((state) => state.edit);
  const [editingText, onChangeEditText] = useState();

  // 수정
  const editHandler = (id) => {
    dispatch(toggleEdit(id));
  };

  const editToDo = async (id) => {
    const listRef = doc(db, "ToDoList", id);
    try {
      await updateDoc(listRef, { toDo: editingText });
      dispatch(offEdit(id));
      getList();
    } catch (error) {
      console.log(error);
    }
  };

  // 삭제
  const deleteToDo = (id) => {
    Alert.alert("삭제", "삭제하시겠습니까?", [
      {
        text: "삭제",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "ToDoList", id));
            getList();
          } catch (error) {
            alert(error);
          }
        },
      },
      {
        text: "취소",
      },
    ]);
  };

  // 완료
  const changeDoneHandler = async (id) => {
    const listRef = doc(db, "ToDoList", id);
    let list = await getDoc(listRef);
    try {
      await updateDoc(listRef, { isDone: !list.data().isDone });
      getList();
    } catch (error) {}
  };

  return (
    <StScrollView>
      {lists.map((x) => {
        if (tabName === x.category) {
          return (
            <TodoList key={x.id}>
              <DisplayView display={edit.isEdit && edit.id === x.id ? "none" : "flex"}>
                <Text style={{ textDecorationLine: `${x.isDone ? "line-through" : "none"}` }}>{x.toDo}</Text>
              </DisplayView>
              <DisplayView display={edit.isEdit && edit.id === x.id ? "flex" : "none"}>
                <StEditInput onChangeText={onChangeEditText} onSubmitEditing={() => editToDo(x.id)} defaultValue={x.toDo} />
              </DisplayView>
              <TDLBtnBox>
                <TDLBtn onPress={() => changeDoneHandler(x.id)}>
                  <FontAwesome name="check-square" size={33} color="black" />
                </TDLBtn>
                <TDLBtn onPress={() => editHandler(x.id)}>
                  <FontAwesome name="pencil-square" size={33} color="black" />
                </TDLBtn>
                <TDLBtn onPress={() => deleteToDo(x.id)}>
                  <FontAwesome name="trash" size={33} color="black" />
                </TDLBtn>
              </TDLBtnBox>
            </TodoList>
          );
        }
      })}
    </StScrollView>
  );
};

const StScrollView = styled.ScrollView`
  width: 90%;
  height: 70%;
  border-top-width: 2px;
`;

const TodoList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  background-color: #d9d9d9;
`;

const DisplayView = styled.View`
  display: ${(x) => x.display};
`;

const StEditInput = styled.TextInput`
  background: white;
  width: 250px;
`;

const TDLBtnBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TDLBtn = styled.TouchableOpacity`
  margin-right: 8px;
`;

export default Lists;
