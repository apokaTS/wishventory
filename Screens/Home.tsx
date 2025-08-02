import { View, Text, StyleSheet, FlatList, Button } from "react-native";

export default function Home({ inventario, onDelete, onEdit }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTextTop}>
        <Text style={styles.textHi}>Hola David</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.textInventario}>Tu Inventario</Text>
      </View>
      <FlatList
        data={inventario}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Descripción: {item.descripcion}</Text>
            <Text>Costo: {item.costo}</Text>
            <Text>Mínimo: {item.minimo}</Text>
            <Text>Existencias: {item.existencias}</Text>
            <View style={styles.buttonRow}>
              <Button title="Editar" onPress={() => onEdit(item)} />
              <Button title="Eliminar" color="red" onPress={() => onDelete(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 40, marginLeft: 16 }}>No hay productos en inventario.</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTextTop: {
    marginTop: 20,
    width: "100%",
    height: 125,
    justifyContent: "center",
  },
  textHi: {
    marginLeft: 20,
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: "bold",
  },
  textInventario: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600",
  },
  containerText: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "#f2f2f2",
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});