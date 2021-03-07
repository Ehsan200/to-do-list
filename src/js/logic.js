import {importanceENUM} from "./importance";

export const data = {
    workList: [],
}


let workListCopy = data.workList
let currentDependency = null
const depList = []
Object.defineProperty(data, "workList", {
    get() {
        track()
        return workListCopy
    },
    set(value) {
        workListCopy = value
        trigger()
    }
})


function track() {
    if (currentDependency) {
        depList.push(currentDependency)
    }
}

function trigger() {
    depList.forEach(dep => dep())
}

export function observe(func) {
    currentDependency = func
    func()
    currentDependency = null
}


export function addWork(work) {
    data.workList = [...workListCopy, work]
    console.log(workListCopy)
}

export function removeWork(work) {
    const index = findWorkIndex(work.id)
    if (index !== -1) {
        workListCopy.splice(index, 1)
        data.workList = [...workListCopy]
    }
}

function findWorkIndex(id) {
    return workListCopy.findIndex(work => work.id === id)
}

export function editWork(id, work) {
    const index = findWorkIndex(id)
    if (index !== -1) {
        workListCopy[index] = {...workListCopy[index], ...work}
        data.workList = [...workListCopy]
    }
}

export function pinWork(work, value) {
    const index = findWorkIndex(work.id)
    workListCopy[index].isPinned = value
    removeWork(work)
    if (value) {
        workListCopy.splice(0, 0, work)
    } else {
        addWork(work)
    }
    data.workList = [...workListCopy]
}

function compareImportance(work1, work2) {
    if (work1.isPinned) {
        return 0
    } else if (work2.isPinned) {
        return 1
    }
    return work2.importance - work1.importance
}

export function sort() {
    data.workList.sort((work1, work2) => {
        return compareImportance(work1, work2)
    })
}
