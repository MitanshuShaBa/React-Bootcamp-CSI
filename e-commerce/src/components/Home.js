import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Items from "./Items";

const Home = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getDocs(collection(db, "items")).then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((item) => {
        items.push({ ...item.data() });
      });
      setItems(items);
    });
  }, []);

  return (
    <div>
      {items.map(({ name, price, imgURL, id }, key) => {
        return (
          <Items id={id} name={name} price={price} imgURL={imgURL} key={key} />
        );
      })}
    </div>
  );
};

export default Home;
