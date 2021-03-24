import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Brithday = ({ brithday, deleteBrithday }) => {
  const pasat = brithday.days > 0 ? true : false;
  const days = brithday.days;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat
          ? styles.pasat
          : brithday.days === 0
          ? styles.actual
          : styles.current,
      ]}
      onPress={() => deleteBrithday(brithday)}
    >
      <Text style={styles.text}>{brithday.name}</Text>
      <Text style={styles.text}>
        {pasat
          ? "Ya paso el cumpleaños"
          : -days === 0
          ? "Hoy es su cumpleaños"
          : -days === 1
          ? `Falta ${-days} dia`
          : `Faltan ${-days} dias`}
      </Text>
    </TouchableOpacity>
  );
};

export default Brithday;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  actual: {
    backgroundColor: "#559204",
  },
  current: {
    backgroundColor: "#1ae1f2",
  },
  pasat: {
    backgroundColor: "#820000",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
