import React from 'react';
import { View, ActivityIndicator } from 'react-native'

const LoadingOverlay = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center z-50">
      <View className="flex flex-col items-center space-y-4">
        <ActivityIndicator animating={visible} color="#fff" size="large" className="ml-2" />
      </View>
    </View>
  );
};

export default LoadingOverlay;
