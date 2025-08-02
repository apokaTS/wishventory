import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";

export default function AddInventory({ agregarInventario, editItem }) {
  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [minimo, setMinimo] = useState("");
  const [existencias, setExistencias] = useState("");

  useEffect(() => {
    if (editItem) {
      setId(editItem.id);
      setDescripcion(editItem.descripcion);
      setCosto(editItem.costo.toString());
      setMinimo(editItem.minimo.toString());
      setExistencias(editItem.existencias.toString());
    } else {
      setId("");
      setDescripcion("");
      setCosto("");
      setMinimo("");
      setExistencias("");
    }
  }, [editItem]);

  const handleAgregar = () => {
    const nuevoInventario = {
      id: editItem ? id : Date.now().toString(), // ID automático si es nuevo
      descripcion,
      costo: parseFloat(costo),
      minimo: parseInt(minimo),
      existencias: parseInt(existencias),
    };
    agregarInventario(nuevoInventario);
    setId("");
    setDescripcion("");
    setCosto("");
    setMinimo("");
    setExistencias("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editItem ? "Editar" : "Agregar"} Inventario</Text>
      {/* Elimina el campo de ID */}
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Costo"
        value={costo}
        onChangeText={setCosto}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mínimo de existencias"
        value={minimo}
        onChangeText={setMinimo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Existencias actuales"
        value={existencias}
        onChangeText={setExistencias}
        keyboardType="numeric"
      />
      <Button title={editItem ? "Guardar Cambios" : "Agregar"} onPress={handleAgregar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});