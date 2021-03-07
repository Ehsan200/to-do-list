import {editWork, removeWork, addWork, pinWork, data} from './logic'
import {importanceENUM} from "./importance";

function addWorkToDom(work) {
    const div = document.createElement('div')
    const deleteButton = document.createElement('button')
    const importance = document.createElement('input')
    const editButton = document.createElement('button')
    const pinButton = document.createElement('button')
    if (work.isPinned) {
        pinButton.innerText = 'unpin'
    } else {
        pinButton.innerText = 'pin'
    }
    pinButton.onclick = () => {
        pinWork(work, !work.isPinned)
    }
    editButton.innerText = 'edit'
    editButton.onclick = () => {
        editWork(work.id, {importance: parseInt(importance.value) || importanceENUM.unset})
    }
    deleteButton.innerText = 'remove'
    deleteButton.onclick = () => {
        removeWork(work)
    }
    div.innerText = work.importance
    workListContainer.append(div, deleteButton, importance, editButton, pinButton)
}


const workListContainer = document.getElementById('work-list-container')
createAddButton()

function createAddButton() {
    console.log('create this')
    const addButton = document.getElementById('button')
    const importance = document.getElementById('input')
    addButton.onclick = () => {
        console.log(importance.value)
        addWork(
            {
                id: Math.ceil(Math.random() * 10000),
                importance: parseInt(importance.value) || importanceENUM.unset,
                isPinned: false,
                // name: name.value || 'بی‌نام',
                // description: description.value,
            }
        )
    }
}

function removeAllWorksFromDom() {
    workListContainer.innerHTML = ``
}

export function updateDom() {
    removeAllWorksFromDom()
    data.workList.forEach(work => addWorkToDom(work))
}
