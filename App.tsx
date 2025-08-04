import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import Home from "./Screens/Home";
import AddInventory from "./Screens/AddInventory";
import BottomNavigation from "./components/BottomNavigation";

const API_URL = "http://192.168.3.111:3000/inventory"; // Cambia localhost por tu IP si usas dispositivo físico

export default function App() {
  const [navigate, setNavigate] = useState("Home");
  const [inventario, setInventario] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // GET: Cargar inventario desde el backend al iniciar la app
  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setInventario(data);
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      }
    };
    fetchInventario();
  }, []);

  // POST: Agregar producto
  const agregarInventario = async (producto) => {
    if (editItem) {
      await editarInventario(producto);
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const data = await res.json();
      setInventario([...inventario, data]);
      setNavigate("Home");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // DELETE: Eliminar producto
  const eliminarInventario = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setInventario(inventario.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // PUT: Editar producto
  const editarInventario = async (producto) => {
    try {
      const res = await fetch(`${API_URL}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const data = await res.json();
      setInventario(inventario.map(item => item.id === producto.id ? data : item));
      setEditItem(null);
      setNavigate("Home");
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  // Preparar edición
  const prepararEdicion = (item) => {
    setEditItem(item);
    setNavigate("AddInventory");
  };

  return (
    <View style={styles.container}>
      {navigate === "Home" && (
        <Home
          inventario={inventario}
          onDelete={eliminarInventario}
          onEdit={prepararEdicion}
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
        onPressAdd={() => {
          setEditItem(null);
          setNavigate("AddInventory");
        }}
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