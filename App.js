import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Switch,
} from 'react-native';

const App = () => {
  const [number, setNumber] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const handlePress = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    const backAction = () => {
      if (number !== 0) {
        setNumber(0);
        BackHandler.removeEventListener();
      } else {
        BackHandler.exitApp();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [number]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: isEnabled ? '#56CCF2' : '#151A23'},
      ]}
      activeOpacity={1}
      onPress={handlePress}>
      <Text style={[styles.number, {color: isEnabled ? '#151A23' : '#F3F4F6'}]}>
        {number}
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#3BBACB'}}
        thumbColor={isEnabled ? '#151A23' : '#F3F4F6'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 96,
  },
  switch: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 32,
  },
});

export default App;
