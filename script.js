let selected = [];

const griglia = document.querySelectorAll('.choice-grid div');
for (const box of griglia) {
  box.addEventListener('click', functi);
}

function insertIntoSelected(box) {
  const img = box.querySelector('.checkbox');
  img.src = "images/checked.png";
  selected.push(box);
  box.removeEventListener('click', functi);
  for (const a of griglia) {
    if (a.dataset.choiceId !== box.dataset.choiceId && a.dataset.questionId === box.dataset.questionId) {
      a.classList.add('unchecked');
      a.classList.remove('checked');
    } else {
      if (a.dataset.choiceId === box.dataset.choiceId && a.dataset.questionId === box.dataset.questionId) {
        a.classList.add('checked');
        a.classList.remove('unchecked');
      }
    }
  }
}

function removeFromSelected(box) {
  box.querySelector('.checkbox').src = "images/unchecked.png";
  selected.splice(selected.indexOf(box), 1);
  box.addEventListener('click', functi);
}

function insertResult(box) {
  const titolo = document.querySelector('.result #titolo');
  titolo.textContent = RESULTS_MAP[box.dataset.choiceId].title;
  const contenuto = document.querySelector('.result #contenuto');
  contenuto.textContent = RESULTS_MAP[box.dataset.choiceId].contents;
}

function resetResult(){
  const titolo = document.querySelector('.result #titolo');
  titolo.textContent = '';
  const contenuto = document.querySelector('.result #contenuto');
  contenuto.textContent = '';
}

function result() {
  for (let i of selected) {
    for (let a of selected) {
      if (i.dataset.questionId !== a.dataset.questionId) {
        if (i.dataset.choiceId === a.dataset.choiceId) {
          insertResult(i);
          return;
        }
      }
    }
  }
  insertResult(selected[0]);
}

function functi(event) {
  const box = event.currentTarget;
  if (selected.length == 0) {
    insertIntoSelected(box);
  } else {
    for (let i of selected) {
      if (i.dataset.questionId === box.dataset.questionId) {
        removeFromSelected(i);
      }
    }
    insertIntoSelected(box);
    if (selected.length === 3) {
      box.removeEventListener('click', functi);
      for (let a of griglia) {
        a.removeEventListener('click', functi);
    }
    result();
  }

  }
}

function reset(event) {
  const button = event.currentTarget;
  for (let a of griglia) {
    a.querySelector('.checkbox').src = "images/unchecked.png";
    a.addEventListener('click', functi);
    a.classList.remove('checked');
    a.classList.remove('unchecked');
  }
  selected.length = 0;
  resetResult();
  console.log('lenght dopo reset->' + selected.length);
}

const button = document.querySelector('#reset');
button.addEventListener('click', reset);
