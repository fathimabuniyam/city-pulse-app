interface HomeSearchProps {
  keyword: string;
  city: string;
  setKeyword: (keyword: string) => void;
  setCity: (city: string) => void;
}

const HomeSearch = ({
  keyword,
  city,
  setKeyword,
  setCity,
}: HomeSearchProps) => {
  return null;
};

export default HomeSearch;
