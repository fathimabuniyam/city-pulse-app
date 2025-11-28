import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface HomeSearchProps {
  keyword: string;
  city: string;
  setKeyword: (keyword: string) => void;
  setCity: (city: string) => void;
}

const debounceTime = 1000; // milliseconds

const HomeSearch = ({
  keyword,
  city,
  setKeyword,
  setCity,
}: HomeSearchProps) => {
  const debouncedSetKeyword = useMemo(
    () => debounce(setKeyword, debounceTime),
    [setKeyword, debounceTime],
  );

  const debouncedSetCity = useMemo(
    () => debounce(setCity, debounceTime),
    [setCity, debounceTime],
  );

  return (
    <View style={styles.wrapper}>
      {/* Keyword Input */}
      <TextInput
        style={[styles.input, { flex: 3 }]}
        placeholder={t('keyword')}
        defaultValue={keyword}
        onChangeText={debouncedSetKeyword}
        returnKeyType="search"
      />

      {/* City Input */}
      <TextInput
        style={[styles.input, { flex: 2 }]}
        placeholder={t('city')}
        defaultValue={city}
        onChangeText={debouncedSetCity}
        returnKeyType="search"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.INPUT_BORDER,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.WHITE,
    flex: 1,
    fontSize: 15,
  },
  icon: {
    marginRight: 10,
  },
});
export default HomeSearch;
