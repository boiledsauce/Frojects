const awilix = require('awilix')

const container = awilix.createContainer()

// repositories
container.register(
	'project-repository',
	awilix.asFunction(require('./data-acces-layer/project-repository.js'))
)

container.register(
	'task-repository',
	awilix.asFunction(require('./data-acces-layer/task-repository.js'))
)

container.register(
	'user-repository',
	awilix.asFunction(require('./data-acces-layer/user-repository.js'))
)

container.register(
	'comment-repository',
	awilix.asFunction(require('./data-acces-layer/comment-repository.js'))
)

// managers
container.register(
	'project-manager',
	awilix.asFunction(require('./business-logic-layer/project-manager.js'))
)

container.register(
	'task-manager',
	awilix.asFunction(require('./business-logic-layer/task-manager.js'))
)

container.register(
	'user-manager',
	awilix.asFunction(require('./business-logic-layer/user-manager.js'))
)

container.register(
	'comment-manager',
	awilix.asFunction(require('./business-logic-layer/comment-manager.js'))
)

container.register(
	'project-manager',
	awilix.asFunction(require('./business-logic-layer/project-manager.js'))
)

container.register(
	'app',
	awilix.asFunction(require('./presentation-layer/app.js'))
)

const app = container.resolve('app')
app.start()
