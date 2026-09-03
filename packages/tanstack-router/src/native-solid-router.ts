import {
  BaseRootRoute,
  BaseRoute,
  BaseRouteApi,
  RouterCore,
  createNonReactiveMutableStore,
  createNonReactiveReadonlyStore,
  rootRouteId,
} from '@tanstack/router-core'
import { isServer } from '@tanstack/router-core/isServer'
import {
  createComponent,
  createContext,
  createMemo,
  createRoot,
  createSignal,
  flush,
  onSettled,
  useContext,
} from 'solid-js'
import type * as SolidRouter from '@tanstack/solid-router'

export type {
  AnyRoute,
  AnyRouter,
  LinkOptions,
  RoutePaths,
} from '@tanstack/solid-router'

function createSolidMutableStore<T>(initialValue: T) {
  const [signal, setSignal] = createSignal(initialValue as any, { ownedWrite: true })
  return { get: signal, set: setSignal }
}

function createSolidReadonlyStore<T>(read: () => T) {
  return { get: createRoot(() => createMemo(read)) }
}

const getStoreFactory = (options: { isServer?: boolean }) => {
  if (isServer ?? options.isServer) {
    return {
      createMutableStore: createNonReactiveMutableStore,
      createReadonlyStore: createNonReactiveReadonlyStore,
      batch: (run: () => void) => run(),
    }
  }

  let depth = 0
  return {
    createMutableStore: createSolidMutableStore,
    createReadonlyStore: createSolidReadonlyStore,
    batch: (run: () => void) => {
      depth += 1
      try {
        run()
      } finally {
        depth -= 1
        if (depth === 0) {
          try {
            flush()
          } catch {}
        }
      }
    },
  }
}

class NativeSolidRouter extends (RouterCore as any) {
  constructor(options: unknown) {
    super(options as never, getStoreFactory as never)
  }
}

const routerContext = createContext<NativeSolidRouter>()

export const createRouter = ((options: unknown) =>
  new NativeSolidRouter(options)) as typeof SolidRouter.createRouter

export const createRoute = ((options: unknown) =>
  new BaseRoute(options as never)) as unknown as typeof SolidRouter.createRoute

export const createRootRoute = ((options?: unknown) =>
  new BaseRootRoute(options as never)) as typeof SolidRouter.createRootRoute

export const createRootRouteWithContext = (() => (options?: unknown) =>
  createRootRoute(options as never)) as typeof SolidRouter.createRootRouteWithContext

export const createFileRoute = ((path: string) => (options: unknown) =>
  createRoute({ ...(options as object), path } as never)) as typeof SolidRouter.createFileRoute

export const createLazyRoute = ((id: string) => (options: unknown) => ({
  ...(options as object),
  id,
})) as unknown as typeof SolidRouter.createLazyRoute

export const getRouteApi = ((id: string) =>
  new BaseRouteApi({ id } as never)) as typeof SolidRouter.getRouteApi

export const RouteApi = BaseRouteApi as typeof SolidRouter.RouteApi
export { rootRouteId }

export function RouterContextProvider(props: {
  router: NativeSolidRouter
  children: () => unknown
  [key: string]: unknown
}) {
  const { router, children, ...rest } = props
  if (Object.keys(rest).length) {
    router.update({
      ...router.options,
      ...rest,
      context: { ...router.options.context, ...(rest.context as object | undefined) },
    } as never)
  }

  return createComponent(routerContext as any, {
    value: router,
    get children() {
      return children()
    },
  })
}

export const useRouter = (() => useContext(routerContext)) as typeof SolidRouter.useRouter

function selectRouter<T>(selector: (state: any) => T) {
  const router = useContext(routerContext)
  if (!router) throw new Error('NativeScript router context is missing')
  return createMemo(() => selector(router.state))
}

export const useRouterState = ((options: any = {}) =>
  selectRouter((state) => options.select ? options.select(state) : state)) as typeof SolidRouter.useRouterState

export const useLocation = ((options: any = {}) =>
  selectRouter((state) => options.select ? options.select(state.location) : state.location)) as typeof SolidRouter.useLocation

export const useNavigate = ((options: any = {}) => {
  const router = useContext(routerContext)
  if (!router) throw new Error('NativeScript router context is missing')
  return (next: any) => router.navigate({ ...next, from: next.from || options.from })
}) as typeof SolidRouter.useNavigate

export const useMatchRoute = (() => {
  const router = useContext(routerContext)
  if (!router) throw new Error('NativeScript router context is missing')
  return (options: any) => router.matchRoute(options)
}) as typeof SolidRouter.useMatchRoute

export const useCanGoBack = (() => {
  const router = useContext(routerContext)
  if (!router) throw new Error('NativeScript router context is missing')
  return createMemo(() => router.history.canGoBack())
}) as typeof SolidRouter.useCanGoBack

function routeSelection(options: any = {}, key?: string) {
  return selectRouter((state) => {
    const matches = state.matches || []
    const match = options.from
      ? matches.find((candidate: any) => candidate.routeId === options.from)
      : matches[matches.length - 1]
    const value = key ? match?.[key] : match
    return options.select ? options.select(value) : value
  })
}

export const useMatch = ((options?: unknown) => routeSelection(options)) as typeof SolidRouter.useMatch
export const useParams = ((options?: unknown) => routeSelection(options, 'params')) as typeof SolidRouter.useParams
export const useSearch = ((options?: unknown) => routeSelection(options, 'search')) as typeof SolidRouter.useSearch
export const useLoaderData = ((options?: unknown) => routeSelection(options, 'loaderData')) as typeof SolidRouter.useLoaderData
export const useLoaderDeps = ((options?: unknown) => routeSelection(options, 'loaderDeps')) as typeof SolidRouter.useLoaderDeps
export const useRouteContext = ((options?: unknown) => routeSelection(options, 'context')) as typeof SolidRouter.useRouteContext
export const useMatches = ((options: any = {}) =>
  selectRouter((state) => options.select ? options.select(state.matches) : state.matches)) as typeof SolidRouter.useMatches
export const useParentMatches = useMatches as typeof SolidRouter.useParentMatches
export const useChildMatches = useMatches as typeof SolidRouter.useChildMatches
export const useBlocker = (() => undefined) as unknown as typeof SolidRouter.useBlocker

export const Navigate = ((props: unknown) => {
  const navigate = useNavigate()
  onSettled(() => void navigate(props as never))
  return null
}) as typeof SolidRouter.Navigate

export const MatchRoute = ((props: any) => {
  const matchRoute = useMatchRoute()
  return matchRoute(props) ? props.children : null
}) as typeof SolidRouter.MatchRoute

export const Await = ((props: any) => props.children) as typeof SolidRouter.Await
