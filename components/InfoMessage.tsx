import { StyleSheet, Text } from "react-native";
import { IMessageProps } from "../types/message";

export const InfoMessage: React.FC<IMessageProps> = ({ message }) => {
  return <Text style={styles.infoMessage}>{message}</Text>;
};

const styles = StyleSheet.create({
  infoMessage: {
    color: 'green',
    fontSize: 18,
    backgroundColor: 'white',
    padding: 10,
  },
});