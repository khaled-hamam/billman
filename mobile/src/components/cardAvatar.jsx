import React from "react";
import { Text, View } from "react-native";
import colors from "../../constants/colors";

const CardAvatar = ({ size, letterSign }) => {
  const avatarStyle = {
    height: size,
    width: size,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  };
  const textStyle = {
    color: "white",
    fontSize: 26,
  };
  return (
    <View style={avatarStyle}>
      <Text style={textStyle}>{letterSign}</Text>
    </View>
  );
};

export default CardAvatar;
