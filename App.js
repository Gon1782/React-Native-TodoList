import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [text, onChangeText] = useState("");
  const [toggleBtn, setToggleBtn] = useState({
    name: "",
    onPress: false,
  });

  const toggleHanler = (name) => {
    setToggleBtn({ ...toggleBtn, name: name, onPress: true });
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
      <StTextInput placeholder="할일을 입력해주세요" onChangeText={onChangeText} value={text} />
      <StatusBar style="auto" />
      <StScrollView>
        <TodoList>
          <Text>신나는 실행컨텍스트 공부</Text>
          <TDLBtnBox>
            <TDLBtn>
              <FontAwesome name="check-square" size={33} color="black" />
            </TDLBtn>
            <TDLBtn>
              <FontAwesome name="pencil-square" size={33} color="black" />
            </TDLBtn>
            <TDLBtn>
              <FontAwesome name="trash" size={33} color="black" />
            </TDLBtn>
          </TDLBtnBox>
        </TodoList>
        <TodoList>
          <Text>너무 좋은 ES6 최신문법 공부</Text>
          <TDLBtnBox>
            <TDLBtn>
              <FontAwesome name="check-square" size={33} color="black" />
            </TDLBtn>
            <TDLBtn>
              <FontAwesome name="pencil-square" size={33} color="black" />
            </TDLBtn>
            <TDLBtn>
              <FontAwesome name="trash" size={33} color="black" />
            </TDLBtn>
          </TDLBtnBox>
        </TodoList>
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

const TDLBtnBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TDLBtn = styled.TouchableOpacity`
  margin-right: 8px;
`;
