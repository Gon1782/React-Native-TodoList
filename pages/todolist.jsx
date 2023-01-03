import styled from "@emotion/native";
import Tabs from "../components/Tabs";
import Lists from "../components/Lists";
import Forms from "../components/Forms";

const ToDoList = () => {
  return (
    <StView>
      <Tabs />
      <Forms />
      <Lists />
    </StView>
  );
};

const StView = styled.SafeAreaView`
  width: 100%;
  align-items: center;
`;

export default ToDoList;
