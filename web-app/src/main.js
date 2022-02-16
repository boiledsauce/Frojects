const awilix = require('awilix')

const container = awilix.createContainer()

// repositories
container.register(
	'projectRepository',
	awilix.asFunction(require('./layers/data-access-layer/project-repository'))
)

container.register(
	'taskRepository',
	awilix.asFunction(require('./layers/data-access-layer/task-repository'))
)

container.register(
	'userRepository',
	awilix.asFunction(require('./layers/data-access-layer/user-repository'))
)

container.register(
	'commentRepository',
	awilix.asFunction(require('./layers/data-access-layer/comment-repository'))
)

// managers
container.register(
	'projectManager',
	awilix.asFunction(require('./layers/business-logic-layer/project-manager'))
)

container.register(
	'taskManager',
	awilix.asFunction(require('./layers/business-logic-layer/task-manager'))
)

container.register(
	'userManager',
	awilix.asFunction(require('./layers/business-logic-layer/user-manager'))
)

container.register(
	'commentManager',
	awilix.asFunction(require('./layers/business-logic-layer/comment-manager'))
)

container.register(
	'projectManager',
	awilix.asFunction(require('./layers/business-logic-layer/project-manager'))
)

// routers
container.register(
	'mainRouter',
	awilix.asFunction(require('./layers/presentation-layer/routers/main-router'))
)

container.register(
	'projectRouter',
	awilix.asFunction(require('./layers/presentation-layer/routers/project-router'))
)

container.register(
	'taskRouter',
	awilix.asFunction(require('./layers/presentation-layer/routers/task-router'))
)

container.register(
	'userRouter',
	awilix.asFunction(require('./layers/presentation-layer/routers/user-router'))
)

container.register(
	'app',
	awilix.asFunction(require('./layers/presentation-layer/app'))
)

const app = container.resolve('app')

app.start()
