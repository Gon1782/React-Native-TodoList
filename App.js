import { StatusBar } from "expo-status-bar";
import { Text, Alert } from "react-native";
import styled from "@emotion/native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "./firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [text, onChangeText] = useState("");
  const [editingText, onChangeEditText] = useState();

  // 카테고리 토글
  const [toggleBtn, setToggleBtn] = useState({
    name: "Javascript",
    onPress: true,
  });

  const toggleHanler = (name) => {
    setToggleBtn({ ...toggleBtn, name: name, onPress: true });
  };

  // GET Data
  const [lists, setLists] = useState([]);

  const getList = async () => {
    let data = [];
    const q = query(collection(db, "ToDoList"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((x) => {
      const Obj = {
        id: x.id,
        ...x.data(),
      };
      data.push(Obj);
    });
    setLists(data);
  };

  useEffect(() => {
    getList();
  }, []);

  // POST
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
        category: toggleBtn.name,
        isDone: false,
      });
      onChangeText("");
      getList();
    } catch (error) {
      console.log(error);
    }
  };

  // 수정
  const [editToggle, setEditToggle] = useState({
    id: 0,
    onEdit: false,
  });

  const editHandler = (id) => {
    setEditToggle({ ...editToggle, id: id, isEdit: true });
  };

  const editToDo = async (id) => {
    const listRef = doc(db, "ToDoList", id);
    try {
      await updateDoc(listRef, { toDo: editingText });
      setEditToggle({ ...editToggle, id: 0, isEdit: false });
      getList();
    } catch (error) {}
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
    <StView>
      <StBtnBox>
        <StToggleBtn background={toggleBtn.name === "Javascript" && toggleBtn.onPress ? "yellow" : "gray"} onPress={() => toggleHanler("Javascript")}>
          <Text>Javascript</Text>
        </StToggleBtn>
        <StToggleBtn background={toggleBtn.name === "React" && toggleBtn.onPress ? "yellow" : "gray"} onPress={() => toggleHanler("React")}>
          <Text>React</Text>
        </StToggleBtn>
        <StToggleBtn background={toggleBtn.name === "Coding Test" && toggleBtn.onPress ? "yellow" : "gray"} onPress={() => toggleHanler("Coding Test")}>
          <Text>Coding Test</Text>
        </StToggleBtn>
      </StBtnBox>
      <StTextInput placeholder="할일을 입력해주세요" onChangeText={onChangeText} onSubmitEditing={plusToDo} value={text} />
      <StatusBar style="auto" />
      <StScrollView>
        {lists.map((x) => {
          if (toggleBtn.name === x.category) {
            return (
              <TodoList key={x.id}>
                <DisplayView display={editToggle.isEdit && editToggle.id === x.id ? "none" : "flex"}>
                  <Text style={{ textDecorationLine: `${x.isDone ? "line-through" : "none"}` }}>{x.toDo}</Text>
                </DisplayView>
                <DisplayView display={editToggle.isEdit && editToggle.id === x.id ? "flex" : "none"}>
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
    </StView>
  );
}

const StView = styled.SafeAreaView`
  width: 100%;
  align-items: center;
`;

const StBtnBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100px;
  margin-top: 30px;
  border-bottom-width: 2px;
`;

const StToggleBtn = styled.TouchableOpacity`
  width: 110px;
  height: 60px;
  background: ${(x) => x.background};
  justify-content: center;
  align-items: center;
`;

const StTextInput = styled.TextInput`
  width: 90%;
  height: 50px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
`;

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
