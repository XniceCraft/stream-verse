/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Page, 'home']).as('home')
router.get('/football', [controllers.Football, 'index']).as('football.index')
router.get('/football/match/:id', [controllers.Football, 'show']).as('football.show')
router.get('/tv/channel/:id', ({ inertia }) => inertia.render('streams/channel', {})).as('tv.show')
router.get('/profile', ({ inertia }) => inertia.render('profile/index', {})).as('profile.index')

router.group(() => {}).use(middleware.guest())

router.group(() => {}).use(middleware.auth())
