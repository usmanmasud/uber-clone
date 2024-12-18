import { View, Text } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/types";

const GoogleTextInput = ({
  icon,
  containerStyle,
  initialLocation,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 ${containerStyle} mb-5`}
    >
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
