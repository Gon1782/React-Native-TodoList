import { StatusBar } from "expo-status-bar";
import { Text, Alert } from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [text, onChangeText] = useState("");
  const [editingText, onChangeEditText] = useState();
  const [toggleBtn, setToggleBtn] = useState({
    name: "Javascript",
    onPress: true,
  });
  const [lists, setLists] = useState([
    {
      id: 1,
      toDo: "신나는 실행컨텍스트 공부",
      category: "Javascript",
      isDone: false,
      isEdit: false,
    },
    {
      id: 2,
      toDo: "너무 좋은 ES6 최신문법 공부",
      category: "Javascript",
      isDone: false,
      isEdit: false,
    },
  ]);
  const [number, setNumber] = useState(3);

  const list = {
    id: number,
    toDo: text,
    category: toggleBtn.name,
    isDone: false,
    isEdit: false,
  };

  const toggleHanler = (name) => {
    setToggleBtn({ ...toggleBtn, name: name, onPress: true });
  };

  const plusToDo = () => {
    setLists([...lists, { ...list }]);
    setNumber(number + 1);
    onChangeText("");
  };

  const deleteToDo = (id) => {
    const newList = lists.filter((list) => list.id !== id);
    Alert.alert("삭제", "삭제하시겠습니까?", [
      {
        text: "삭제",
        onPress: () => setLists(newList),
      },
      {
        text: "취소",
      },
    ]);
  };

  const changeDoneHandler = (id) => {
    const newList = lists.map((list) => {
      if (list.id === id) {
        return { ...list, isDone: !list.isDone };
      } else {
        return { ...list };
      }
    });
    setLists(newList);
  };

  const editHandler = (id) => {
    const editText = lists.map((list) => {
      if (list.id === id) {
        return { ...list, isEdit: !list.isEdit };
      } else {
        return { ...list };
      }
    });
    setLists(editText);
  };

  const editToDo = (id) => {
    const editText = lists.map((list) => {
      if (list.id === id) {
        return { ...list, toDo: editingText ? editingText : list.toDo, isEdit: false };
      } else {
        return { ...list };
      }
    });
    setLists(editText);
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
                <DisplayView display={x.isEdit === true ? "none" : "flex"}>
                  <Text style={{ textDecorationLine: `${x.isDone ? "line-through" : "none"}` }}>{x.toDo}</Text>
                </DisplayView>
                <DisplayView display={x.isEdit === true ? "flex" : "none"}>
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
