import {makeAutoObservable} from 'mobx'
import {v4 as uuid} from "uuid";

class TaskStore {

    fullFlag = false

    list = [
        {
            id: 1,
            name: '学习react',
            isDone: true
        },
        {
            id: 2,
            name: '搞定mobx',
            isDone: false
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

    // action 修改数据
    alterData = (id) => {
        const elem = this.list.find(item => (item.id === id))
        elem.isDone = !elem.isDone
    }

    deleteData = (id) => {
        this.list = this.list.filter(item => (item.id !== id))
    }

    fullData = () => {
        this.list.map(instance => (instance.isDone = !this.fullFlag))
        this.fullFlag = !this.fullFlag
    }

    addData = (content) => {
        if (content !== null && content != "") {
            this.list.push(
                {
                    id: uuid(),
                    name: content,
                    isDone: false
                }
            )
        }
    }

}

export default TaskStore
