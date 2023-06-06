'use strict';

export default function lapList () {
  const lapList = document.createElement('ul');
  lapList.classList.add('lapList');
  document.getElementById('root').append(lapList);

  function addListItem (text) {
    const listItem = document.createElement('li');
    listItem.classList.add('lapList_item');
    listItem.innerHTML = text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('lapList_item__delete');
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = () => listItem.remove();
    listItem.append(deleteButton);

    lapList.append(listItem);
  }

  function clearLapList () {
    lapList.innerHTML = '';
  }

  return { addListItem, clearLapList };
}
