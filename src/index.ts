import { Context, Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { ERRORS } from './constants';
import { StatusCode } from 'hono/utils/http-status';
import {
  VerifyFirebaseAuthConfig,
  VerifyFirebaseAuthEnv,
  verifyFirebaseAuth,
} from '@hono/firebase-auth'


const config: VerifyFirebaseAuthConfig = {
  // specify your firebase project ID.
  projectId: 'YOUR_FIREBASE_PROJECT',
}

const app = new Hono<{ Bindings: VerifyFirebaseAuthEnv }>()

app.use('*', poweredBy())

app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

app.use('*', verifyFirebaseAuth(config))

app.onError((err, c) => {
  console.error(`${err}`)
  const statusCode = Object.values(ERRORS).find((error) => error.message === err.message)?.status || 500;
  return c.text(err.message, statusCode as StatusCode)
})

app.get('/', (c:Context) => {
  return c.text('Test API')
})

export default app
