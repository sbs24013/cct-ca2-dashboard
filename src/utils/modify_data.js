export default function modify_data(data = []) {
  let modified_data = {};

  data.forEach((row) => {
    // 'Variable', 'Year', 'Value', 'Unit']
    // console.log(row["Variable"]);
    if (!modified_data[row["Variable"]]) {
      modified_data[row["Variable"]] = {};
    }

    if (!modified_data[row["Variable"]]["X"]) {
      modified_data[row["Variable"]]["X"] = [];
    }
    modified_data[row["Variable"]]["X"].push(row["Year"]);

    if (!modified_data[row["Variable"]]["y"]) {
      modified_data[row["Variable"]]["y"] = [];
    }
    modified_data[row["Variable"]]["y"].push(row["Value"]);
  });

  return modified_data;
}
