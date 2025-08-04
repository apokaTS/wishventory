import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BottomBarNavigationProps = {
  onPressHome: () => void;
  onPressAdd: () => void;
};

const BottomNavigation = ({onPressHome, onPressAdd}: BottomBarNavigationProps) => {
  return (
    <View style={styles.containerBottomNavigation}>
      <TouchableOpacity onPress={onPressHome}>
        <Ionicons name="home" size={32} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd}>
        <Ionicons name="add-circle" size={32} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  containerBottomNavigation: {
    width: "100%",
    height: 90,
    position: "absolute",
    backgroundColor: "#000",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
    marginBottom: 10,
  },
});