import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Screens/Home";
import AddInventory from "./Screens/AddInventory";
import BottomNavigation from "./components/BottomNavigation";

export default function App() {
  const [navigate, setNavigate] = useState("Home");
  const [inventario, setInventario] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // Cargar inventario al iniciar la app
  useEffect(() => {
    const cargarInventario = async () => {
      const data = await AsyncStorage.getItem("inventario");
      if (data) setInventario(JSON.parse(data));
    };
    cargarInventario();
  }, []);

  // Guardar inventario cada vez que cambie
  useEffect(() => {
    AsyncStorage.setItem("inventario", JSON.stringify(inventario));
  }, [inventario]);

  const agregarInventario = (producto) => {
    if (editItem) {
      setInventario(inventario.map(item =>
        item.id === editItem.id ? producto : item
      ));
      setEditItem(null);
    } else {
      setInventario([...inventario, producto]);
    }
    setNavigate("Home");
  };

  const eliminarInventario = (id) => {
    setInventario(inventario.filter(item => item.id !== id));
  };

  const editarInventario = (item) => {
    setEditItem(item);
    setNavigate("AddInventory");
  };

  return (
    <View style={styles.container}>
      {navigate === "Home" && (
        <Home
          inventario={inventario}
          onDelete={eliminarInventario}
          onEdit={editarInventario}
        />
      )}
      {navigate === "AddInventory" && (
        <AddInventory
          agregarInventario={agregarInventario}
          editItem={editItem}
        />
      )}
      <BottomNavigation
        onPressHome={() => setNavigate("Home")}
        onPressAdd={() => setNavigate("AddInventory")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});