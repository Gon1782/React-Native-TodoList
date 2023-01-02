import { Text } from "react-native";
import styled from "@emotion/native";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../redux/modules/tabSlice";

const Tabs = () => {
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.tab.name);

  const tabHandler = (name) => {
    dispatch(changeTab(name));
  };

  return (
    <StBtnBox>
      <StToggleBtn background={tab === "Javascript" ? "yellow" : "gray"} onPress={() => tabHandler("Javascript")}>
        <Text>Javascript</Text>
      </StToggleBtn>
      <StToggleBtn background={tab === "React" ? "yellow" : "gray"} onPress={() => tabHandler("React")}>
        <Text>React</Text>
      </StToggleBtn>
      <StToggleBtn background={tab === "Coding Test" ? "yellow" : "gray"} onPress={() => tabHandler("Coding Test")}>
        <Text>Coding Test</Text>
      </StToggleBtn>
    </StBtnBox>
  );
};

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

export default Tabs;
