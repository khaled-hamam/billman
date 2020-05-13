import React from "react";
import { Image } from "react-native";

const Avatar = ({ size, source }) => {
  const avatarStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };

  return <Image style={avatarStyle} source={source} />;
};

export default Avatar;
