const initailState = {
    toDoDB: [
        {
            taskId: Math.floor(Math.random() * 1000),
            task: "task 1",
            isFinish: true
        },
        {
            taskId: Math.floor(Math.random() * 1000),
            task: "task 2",
            isFinish: true
        },
        {
            taskId: Math.floor(Math.random() * 1000),
            task: "task 3",
            isFinish: false
        },
        {
            taskId: Math.floor(Math.random() * 1000),
            task: "task 4",
            isFinish: false
        }
    ]

}

export default function reducer(state = initailState, action) {
    console.log(action);
    let newState = { ...state }
    let toDoDB = [...newState.toDoDB];
    switch (action.type) {
        case "PUSH":
            newState.toDoDB = [...newState.toDoDB, {
                taskId: Math.floor(Math.random() * 1000),
                task: action.payload,
                status: false
            }]
            break;

        case "DELETE":
            newState.toDoDB = [...newState.toDoDB].filter((task, i) => task.taskId !== action.payload)
            break;

        case "DONE":
            toDoDB = toDoDB.map(todo => {
                if (todo.taskId === eval(action.payload)) {
                    return {
                        ...todo,
                        isFinish: !todo.isFinish,
                    };
                }
                return todo
            })
            return {
                ...newState,
                toDoDB
            }
    }
    return newState;
}

