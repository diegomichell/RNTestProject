import { StyleSheet, Text } from "react-native";
import { IMessageProps } from "../types/message";

export const ErrorMessage: React.FC<IMessageProps> = ({ message }) => {
  return <Text style={styles.errorMessage}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 18,
    backgroundColor: 'white',
    padding: 10,
  },
});