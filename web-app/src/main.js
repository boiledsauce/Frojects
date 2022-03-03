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

// routers web 
container.register(
	'mainRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-web/routers/main-router'))
)

container.register(
	'projectRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-web/routers/project-router'))
)

container.register(
	'taskRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-web/routers/task-router'))
)

container.register(
	'userRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-web/routers/user-router'))
)

container.register(
	'webApp',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-web/web-app'))
)

// routers API
container.register(
	'mainRESTRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-REST/routers/main-router'))
)

container.register(
	'projectRESTRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-REST/routers/project-router'))
)

container.register(
	'taskRESTRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-REST/routers/task-router'))
)

container.register(
	'userRESTRouter',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-REST/routers/user-router'))
)

container.register(
	'RESTapp',
	awilix.asFunction(require('./layers/presentation-layers/presentation-layer-REST/REST-app'))
)

container.register(
	'setupApps',
	awilix.asFunction(require('./layers/presentation-layers/app'))
)


const apps = container.resolve('setupApps')
apps.start()
