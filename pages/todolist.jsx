import styled from "@emotion/native";
import Tabs from "../components/Tabs";
import Lists from "../components/Lists";
import Forms from "../components/Forms";
import { db } from "../firebase";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";

const ToDoList = () => {
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

  return (
    <StView>
      <Tabs />
      <Forms getList={getList} />
      <Lists lists={lists} getList={getList} />
    </StView>
  );
};

const StView = styled.SafeAreaView`
  width: 100%;
  align-items: center;
`;

export default ToDoList;
