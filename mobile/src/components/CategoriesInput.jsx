import React from "react";
import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";

const filter = (item, query) => item.toLowerCase().includes(query.toLowerCase());

const CategoriesInput = ({ options, categories, setCategories }) => {
  const [data, setData] = React.useState(options);

  const onSelect = (index) => {
    if (categories.filter(i => filter(i, data[index])).length) {
      return;
    }

    const newCategories = [...categories];
    if (newCategories.length && filter(data[index], newCategories.pop())) {
      setCategories([...newCategories, data[index]]);
    } else {
      setCategories([...categories, data[index]])
    }
  };

  const onChangeText = (query) => {
    setData(options.filter((item) => filter(item, query.split(', ').pop())));
    setCategories(query.split(', '));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item} />
  );

  return (
    <Autocomplete
      placeholder="Categories"
      value={categories.join(', ')}
      onSelect={onSelect}
      onChangeText={onChangeText}
      placement="top"
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default CategoriesInput;
