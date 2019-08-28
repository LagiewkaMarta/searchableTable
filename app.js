const createSearchForm = () => {
  const inputContainer = document.querySelector("#portexe-search-root");
  const form = document.createElement("form");
  form.innerHTML = `
    <input id="portexe-input" type="text"> </input>
    <button id="portexe-btn" type="submit"> Search </button>
    `;
  inputContainer.appendChild(form);
  return form;
};

const listenOnInput = e => {
  e.preventDefault();
  return e.target.value;
};

const getTableData = () => {
  const table = document.getElementById("portexe-data-table");
  return [...table.children[1].children].map(el => [...el.children].map(td => td.innerText));
};
const refreshTable = tableData => {
  const tablebody = document.getElementById("portexe-data-table").children[1];
  tablebody.innerHTML = ``;
  tableData.forEach(_trow => {
    const row = document.createElement("tr");
    _trow.forEach(_td => {
      const td = document.createElement("td");
      td.innerText = _td;
      row.appendChild(td);
    });
    tablebody.appendChild(row);
  });
};
const search = (arr, searchTerm) => {
  if (!searchTerm) {
    return arr;
  }
  return arr.filter(row =>
    row.find(el => el.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

document.addEventListener("DOMContentLoaded", () => {
  createSearchForm();
  const input = document.querySelector("#portexe-input");
  const tableData = getTableData();
  input.addEventListener("keyup", e => {
    const val = listenOnInput(e);
    const currTableData = search(tableData, val);
    refreshTable(currTableData);
  });
});
