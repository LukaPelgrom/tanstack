"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/solid/index.ts
var solid_exports = {};
__export(solid_exports, {
  Await: () => Await,
  Link: () => Link,
  MODAL_SEARCH_PARAM_KEY: () => MODAL_SEARCH_PARAM_KEY,
  MatchRoute: () => MatchRoute,
  NativeScriptRouterProvider: () => NativeScriptRouterProvider,
  Navigate: () => Navigate,
  RouteApi: () => RouteApi,
  createFileRoute: () => createFileRoute,
  createLazyRoute: () => createLazyRoute,
  createNativeScriptHistory: () => createNativeScriptHistory,
  createNativeScriptNavigationState: () => createNativeScriptNavigationState,
  createNativeScriptRouter: () => createNativeScriptRouter,
  createNativeScriptTransitionState: () => createNativeScriptTransitionState,
  createRootRoute: () => createRootRoute,
  createRootRouteWithContext: () => createRootRouteWithContext,
  createRoute: () => createRoute,
  createRouter: () => createRouter,
  getRouteApi: () => getRouteApi,
  rootRouteId: () => import_router_core.rootRouteId,
  useBlocker: () => useBlocker,
  useCanGoBack: () => useCanGoBack,
  useChildMatches: () => useChildMatches,
  useLoaderData: () => useLoaderData,
  useLoaderDeps: () => useLoaderDeps,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatchRoute: () => useMatchRoute,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useParams: () => useParams,
  useParentMatches: () => useParentMatches,
  useRouteContext: () => useRouteContext,
  useRouter: () => useRouter,
  useRouterState: () => useRouterState,
  useSearch: () => useSearch,
  withSingleModalPath: () => withSingleModalPath
});
module.exports = __toCommonJS(solid_exports);

// src/history.ts
var import_history = require("@tanstack/history");
function createNativeScriptHistory(opts) {
  return (0, import_history.createMemoryHistory)({
    initialEntries: [(opts == null ? void 0 : opts.initialPath) || "/"]
  });
}

// src/native-solid-router.ts
var import_router_core = require("@tanstack/router-core");
var import_isServer = require("@tanstack/router-core/isServer");
var import_solid_js = require("solid-js");
function createSolidMutableStore(initialValue) {
  const [signal, setSignal] = (0, import_solid_js.createSignal)(initialValue, { ownedWrite: true });
  return { get: signal, set: setSignal };
}
function createSolidReadonlyStore(read) {
  return { get: (0, import_solid_js.createRoot)(() => (0, import_solid_js.createMemo)(read)) };
}
var getStoreFactory = (options) => {
  var _a;
  if ((_a = import_isServer.isServer) != null ? _a : options.isServer) {
    return {
      createMutableStore: import_router_core.createNonReactiveMutableStore,
      createReadonlyStore: import_router_core.createNonReactiveReadonlyStore,
      batch: (run) => run()
    };
  }
  let depth = 0;
  return {
    createMutableStore: createSolidMutableStore,
    createReadonlyStore: createSolidReadonlyStore,
    batch: (run) => {
      depth += 1;
      try {
        run();
      } finally {
        depth -= 1;
        if (depth === 0) {
          try {
            (0, import_solid_js.flush)();
          } catch (e) {
          }
        }
      }
    }
  };
};
var NativeSolidRouter = class extends import_router_core.RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};
var routerContext = (0, import_solid_js.createContext)();
var createRouter = ((options) => new NativeSolidRouter(options));
var createRoute = ((options) => new import_router_core.BaseRoute(options));
var createRootRoute = ((options) => new import_router_core.BaseRootRoute(options));
var createRootRouteWithContext = (() => (options) => createRootRoute(options));
var createFileRoute = ((path) => (options) => createRoute({ ...options, path }));
var createLazyRoute = ((id) => (options) => ({
  ...options,
  id
}));
var getRouteApi = ((id) => new import_router_core.BaseRouteApi({ id }));
var RouteApi = import_router_core.BaseRouteApi;
function RouterContextProvider(props) {
  const { router, children, ...rest } = props;
  if (Object.keys(rest).length) {
    router.update({
      ...router.options,
      ...rest,
      context: { ...router.options.context, ...rest.context }
    });
  }
  return (0, import_solid_js.createComponent)(routerContext, {
    value: router,
    get children() {
      return children();
    }
  });
}
var useRouter = (() => (0, import_solid_js.useContext)(routerContext));
function selectRouter(selector) {
  const router = (0, import_solid_js.useContext)(routerContext);
  if (!router) throw new Error("NativeScript router context is missing");
  return (0, import_solid_js.createMemo)(() => selector(router.state));
}
var useRouterState = ((options = {}) => selectRouter((state) => options.select ? options.select(state) : state));
var useLocation = ((options = {}) => selectRouter((state) => options.select ? options.select(state.location) : state.location));
var useNavigate = ((options = {}) => {
  const router = (0, import_solid_js.useContext)(routerContext);
  if (!router) throw new Error("NativeScript router context is missing");
  return (next) => router.navigate({ ...next, from: next.from || options.from });
});
var useMatchRoute = (() => {
  const router = (0, import_solid_js.useContext)(routerContext);
  if (!router) throw new Error("NativeScript router context is missing");
  return (options) => router.matchRoute(options);
});
var useCanGoBack = (() => {
  const router = (0, import_solid_js.useContext)(routerContext);
  if (!router) throw new Error("NativeScript router context is missing");
  return (0, import_solid_js.createMemo)(() => router.history.canGoBack());
});
function routeSelection(options = {}, key) {
  return selectRouter((state) => {
    const matches = state.matches || [];
    const match = options.from ? matches.find((candidate) => candidate.routeId === options.from) : matches[matches.length - 1];
    const value = key ? match == null ? void 0 : match[key] : match;
    return options.select ? options.select(value) : value;
  });
}
var useMatch = ((options) => routeSelection(options));
var useParams = ((options) => routeSelection(options, "params"));
var useSearch = ((options) => routeSelection(options, "search"));
var useLoaderData = ((options) => routeSelection(options, "loaderData"));
var useLoaderDeps = ((options) => routeSelection(options, "loaderDeps"));
var useRouteContext = ((options) => routeSelection(options, "context"));
var useMatches = ((options = {}) => selectRouter((state) => options.select ? options.select(state.matches) : state.matches));
var useParentMatches = useMatches;
var useChildMatches = useMatches;
var useBlocker = (() => void 0);
var Navigate = ((props) => {
  const navigate = useNavigate();
  (0, import_solid_js.onSettled)(() => void navigate(props));
  return null;
});
var MatchRoute = ((props) => {
  const matchRoute = useMatchRoute();
  return matchRoute(props) ? props.children : null;
});
var Await = ((props) => props.children);

// src/router.ts
var import_abortcontroller = require("@nativescript/core/abortcontroller/index.js");
if (typeof self === "undefined") {
  globalThis.self = globalThis;
}
if (typeof AbortController === "undefined") {
  globalThis.AbortController = import_abortcontroller.AbortController;
  globalThis.AbortSignal = import_abortcontroller.AbortSignal;
}
if (typeof globalThis.scrollTo !== "function") {
  ;
  globalThis.scrollTo = () => {
  };
}
function createNativeScriptRouter(opts) {
  const { initialPath, ...routerOpts } = opts;
  const router = createRouter({
    ...routerOpts,
    history: createNativeScriptHistory({ initialPath })
  });
  try {
    globalThis.__ns_router = router;
  } catch (e) {
  }
  return router;
}

// src/NativeScriptRouterProvider.tsx
var import_solid_js4 = require("solid-js");
var import_core2 = require("@nativescript/core");
var import_dominative2 = require("dominative");

// src/PageRenderer.tsx
var import_solid_js2 = require("solid-js");
var import_solid_js3 = require("@nativescript-community/solid-js");
var import_dominative = require("dominative");

// src/native-back-sync.ts
function getNativeBackCallbackDecision(opts) {
  if (opts.guardActive) {
    return "ignore_guard_active";
  }
  if (!opts.canGoBack) {
    return "ignore_cannot_go_back";
  }
  return "run";
}
function shouldScheduleNativeBackSync(opts) {
  return opts.isBackNavigation && !opts.alreadyScheduled;
}
function resetNativeBackSyncScheduled() {
  return false;
}
function shouldCompleteNativeBackSyncOnVisiblePath(opts) {
  return opts.inFlight && opts.visiblePath === opts.activePath;
}

// src/debug-log.ts
function createDebugLogger(enabled) {
  return (...args) => {
    if (enabled) {
      console.log(...args);
    }
  };
}

// src/component-shape.ts
function normalizeRenderableComponent(value) {
  let current = value;
  for (let i = 0; i < 4; i++) {
    if (typeof current === "function") {
      return current;
    }
    if (current && typeof current === "object" && "default" in current) {
      current = current.default;
      continue;
    }
    return null;
  }
  return typeof current === "function" ? current : null;
}
function describeComponentShape(value) {
  if (typeof value === "function") {
    return `function:${value.name || "anonymous"}`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value).slice(0, 10);
    return `object keys=[${keys.join(", ")}]`;
  }
  return `${typeof value}`;
}

// src/page-lifecycle.ts
function shouldUnmountPageOnNavigatingFrom(args) {
  return !!(args == null ? void 0 : args.isBackNavigation);
}

// src/PageRenderer.tsx
function getErrorMessage(err) {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}
function isExpectedBackstackError(message) {
  return message.includes("Cannot read properties of undefined") || message.includes("Could not find an active match");
}
function renderPage(router, RouteComponent, routePath, onNativeBack, onVisiblePathChange, debug) {
  const page = import_dominative.document.createElement("Page");
  const log = createDebugLogger(debug);
  let resetErrorBoundary;
  const loggedUnexpectedErrors = /* @__PURE__ */ new Set();
  let dispose;
  let nativeBackSyncScheduled = false;
  const getPagePath = () => page.__nsRouterPath || routePath;
  page.on("loaded", () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
      resetErrorBoundary = void 0;
    }
  });
  page.__nsRouterPath = routePath;
  const mount = () => {
    if (dispose) return;
    if (typeof RouterContextProvider !== "function") {
      console.error("[NSRouter] Invalid RouterContextProvider export:", describeComponentShape(RouterContextProvider));
      return;
    }
    if (typeof import_solid_js2.Errored !== "function") {
      console.error("[NSRouter] Invalid Errored export:", describeComponentShape(import_solid_js2.Errored));
      return;
    }
    const SafeRouteView = () => {
      const Comp = normalizeRenderableComponent(RouteComponent);
      if (!Comp) {
        console.error(
          "[NSRouter] Invalid render component for route path:",
          routePath,
          "shape:",
          describeComponentShape(RouteComponent)
        );
        return null;
      }
      try {
        return (0, import_solid_js2.createComponent)(Comp, {});
      } catch (err) {
        console.error(
          "[NSRouter] Route component invocation failed for path:",
          routePath,
          "shape:",
          describeComponentShape(RouteComponent),
          err
        );
        return null;
      }
    };
    dispose = (0, import_solid_js3.render)(
      () => (0, import_solid_js2.createComponent)(RouterContextProvider, {
        router,
        children: () => (0, import_solid_js2.createComponent)(import_solid_js2.Errored, {
          fallback: (readError, reset) => {
            const err = readError();
            const message = getErrorMessage(err);
            if (!isExpectedBackstackError(message) && !loggedUnexpectedErrors.has(message)) {
              loggedUnexpectedErrors.add(message);
              console.error("[NSRouter] ErrorBoundary caught:", err);
            }
            resetErrorBoundary = reset;
            return null;
          },
          get children() {
            return (0, import_solid_js2.createComponent)(SafeRouteView, {});
          }
        })
      }),
      page
    );
    log("[NSRouter] page mount:", page.__nsRouterPath || routePath);
  };
  const unmount = () => {
    if (dispose) {
      dispose();
      dispose = void 0;
      log("[NSRouter] page unmount:", page.__nsRouterPath || routePath);
    }
  };
  mount();
  page.on("navigatedTo", () => {
    nativeBackSyncScheduled = resetNativeBackSyncScheduled();
    onVisiblePathChange == null ? void 0 : onVisiblePathChange(getPagePath());
    mount();
    log("[NSRouter] page navigatedTo:", getPagePath());
  });
  page.on("navigatingFrom", (args) => {
    const isBack = !!(args == null ? void 0 : args.isBackNavigation);
    if (shouldUnmountPageOnNavigatingFrom(args)) {
      unmount();
    }
    if (shouldScheduleNativeBackSync({
      isBackNavigation: isBack,
      alreadyScheduled: nativeBackSyncScheduled
    })) {
      nativeBackSyncScheduled = true;
      log("[NSRouter] schedule native back sync from:", getPagePath());
      setTimeout(() => {
        const sourcePath = getPagePath();
        log("[NSRouter] run native back sync from:", sourcePath);
        onNativeBack == null ? void 0 : onNativeBack(sourcePath);
      }, 0);
    } else if (isBack) {
      log("[NSRouter] native back sync already scheduled for:", getPagePath());
    }
    log("[NSRouter] page navigatingFrom:", getPagePath(), "isBack:", isBack);
  });
  page.on("disposeNativeView", () => {
    nativeBackSyncScheduled = resetNativeBackSyncScheduled();
    unmount();
  });
  return page;
}

// src/back-handler.ts
var import_core = require("@nativescript/core");
function setupBackHandler(router, _getFrame, _guard) {
  var _a;
  const cleanups = [];
  if (import_core.isAndroid) {
    const handler = (args) => {
      if (router.history.canGoBack()) {
        args.cancel = true;
        router.history.back();
      }
    };
    (_a = import_core.Application.android) == null ? void 0 : _a.on("activityBackPressed", handler);
    cleanups.push(() => {
      var _a2;
      (_a2 = import_core.Application.android) == null ? void 0 : _a2.off("activityBackPressed", handler);
    });
  }
  return () => {
    cleanups.forEach((fn) => fn());
  };
}

// src/modal-state.ts
var MODAL_SEARCH_PARAM_KEY = "@modal";
function getSingleModalPathFromSearch(search, modalKey = MODAL_SEARCH_PARAM_KEY) {
  if (!search || typeof search !== "object") {
    return null;
  }
  const raw = search[modalKey];
  if (typeof raw !== "string") {
    return null;
  }
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "false") {
    return null;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
function withSingleModalPath(search, modalPath, modalKey = MODAL_SEARCH_PARAM_KEY) {
  const next = search && typeof search === "object" ? { ...search } : {};
  if (!modalPath) {
    delete next[modalKey];
    return next;
  }
  const normalized = modalPath.startsWith("/") ? modalPath : `/${modalPath}`;
  next[modalKey] = normalized;
  return next;
}

// src/navigation-state.ts
var ROUTER_STATE_INDEX_KEY = "__TSR_index";
var NS_NAVIGATION_STATE_KEY = "__nsNavigation";
function getHistoryIndex(historyState) {
  if (!historyState || typeof historyState !== "object") {
    return 0;
  }
  const raw = historyState[ROUTER_STATE_INDEX_KEY];
  return typeof raw === "number" ? raw : 0;
}
function getNativeScriptNavigationTransition(historyState) {
  var _a;
  if (!historyState || typeof historyState !== "object") {
    return void 0;
  }
  const navigationState = historyState;
  return (_a = navigationState[NS_NAVIGATION_STATE_KEY]) == null ? void 0 : _a.transition;
}
function shouldSkipPathNavigation(curPathname, prevPathname, prevIndex) {
  return curPathname === prevPathname && prevIndex >= 0;
}
function getNavigationKind(prevIndex, curIndex) {
  if (prevIndex >= 0 && curIndex < prevIndex) {
    return "back";
  }
  if (prevIndex >= 0 && curIndex === prevIndex) {
    return "replace";
  }
  return "forward";
}
function getNavigationSignalFromRouterState(state) {
  var _a;
  const modalPath = getSingleModalPathFromSearch((_a = state.location) == null ? void 0 : _a.search) || "";
  const matchIds = (state.matches || []).map((m) => m.id).join(",");
  const status = state.status || "";
  return `${modalPath}|${matchIds}|${status}`;
}
function splitPath(path) {
  if (!path || path === "/") {
    return [];
  }
  return path.split("/").filter(Boolean);
}
function doesRouteIdMatchPathname(routeId, pathname) {
  const routeSegments = splitPath(routeId);
  const pathSegments = splitPath(pathname);
  if (routeSegments.length !== pathSegments.length) {
    return false;
  }
  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const pathSegment = pathSegments[i];
    if (routeSegment.startsWith("$")) {
      if (!pathSegment) {
        return false;
      }
      continue;
    }
    if (routeSegment !== pathSegment) {
      return false;
    }
  }
  return true;
}

// src/NativeScriptRouterProvider.tsx
function NativeScriptRouterProvider(props) {
  var _a;
  const router = props.router;
  const log = createDebugLogger(props.debug);
  let frameRef;
  let prevIndex = -1;
  let prevPathname = "";
  let prevModalPath = null;
  let activeModalPath = null;
  let activeModalPage;
  let modalLifecycleLock = false;
  let modalRequestId = 0;
  let suppressedNativeBackCallbacks = 0;
  let nativeBackSyncInFlight = false;
  let nativeBackSyncFromPath = null;
  let queuedNativeBackCount = 0;
  let skipNextFrameBackNavigation = false;
  const guard = { isNavigating: false };
  const releaseGuard = () => {
    guard.isNavigating = false;
    guard.lockReason = void 0;
    if (guard.lockTimeoutId) {
      clearTimeout(guard.lockTimeoutId);
      guard.lockTimeoutId = void 0;
    }
  };
  const acquireGuard = (reason) => {
    guard.isNavigating = true;
    guard.lockReason = reason;
    if (guard.lockTimeoutId) {
      clearTimeout(guard.lockTimeoutId);
    }
    guard.lockTimeoutId = setTimeout(() => {
      log("[NSRouter] force releasing stale guard:", guard.lockReason);
      releaseGuard();
    }, 250);
  };
  router.startTransition = async (fn) => {
    fn();
    return true;
  };
  let syncNavigation = (_navigationSignal) => {
  };
  let navigationReady = false;
  const updateSignal = () => {
    var _a2;
    const state = router.state;
    const pathname = ((_a2 = state.location) == null ? void 0 : _a2.pathname) || "";
    const base = getNavigationSignalFromRouterState(state);
    const next = `${base}:${pathname}`;
    if (navigationReady) {
      syncNavigation(next);
    }
  };
  const unsubLoad = router.subscribe("onLoad", () => {
    updateSignal();
  });
  const unsubBeforeLoad = router.subscribe("onBeforeRouteMount", () => {
    updateSignal();
  });
  const closeModalFromRouterState = () => {
    var _a2;
    if (!activeModalPage) {
      activeModalPath = null;
      return;
    }
    modalLifecycleLock = true;
    const page = activeModalPage;
    activeModalPage = void 0;
    activeModalPath = null;
    try {
      (_a2 = page.closeModal) == null ? void 0 : _a2.call(page);
    } finally {
      setTimeout(() => {
        modalLifecycleLock = false;
      }, 0);
    }
  };
  const syncRouterOnNativeModalClose = () => {
    if (modalLifecycleLock) {
      return;
    }
    const currentModalPath = getSingleModalPathFromSearch(router.state.location.search);
    if (!currentModalPath) {
      return;
    }
    acquireGuard("native_modal_close");
    router.navigate({
      to: ".",
      search: (prev) => withSingleModalPath(prev, null),
      replace: true
    });
    setTimeout(releaseGuard, 0);
  };
  const openModalFromRouterState = async (modalPath) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const currentPage = frameRef == null ? void 0 : frameRef.currentPage;
    if (!currentPage) {
      log("[NSRouter] modal open skipped (no currentPage) for path:", modalPath);
      return;
    }
    const requestId = ++modalRequestId;
    let modalPageRef;
    const parentContext = (_a2 = router.options) == null ? void 0 : _a2.context;
    const modalContext = parentContext && typeof parentContext === "object" ? { ...parentContext } : {};
    modalContext.__nsModalController = {
      close: () => {
        var _a3;
        (_a3 = modalPageRef == null ? void 0 : modalPageRef.closeModal) == null ? void 0 : _a3.call(modalPageRef);
      }
    };
    const modalRouter = createNativeScriptRouter({
      routeTree: router.routeTree,
      initialPath: modalPath,
      context: modalContext
    });
    try {
      await modalRouter.load();
    } catch (err) {
      console.error("[NSRouter] Modal router load failed for path:", modalPath, err);
      syncRouterOnNativeModalClose();
      return;
    }
    if (requestId !== modalRequestId) {
      return;
    }
    const modalMatches = modalRouter.state.matches;
    const leafMatch = modalMatches[modalMatches.length - 1];
    if (!leafMatch) {
      console.error("[NSRouter] No modal match found for path:", modalPath);
      syncRouterOnNativeModalClose();
      return;
    }
    const route = modalRouter.routesById[leafMatch.routeId];
    const rawComponent = (_b = route == null ? void 0 : route.options) == null ? void 0 : _b.component;
    const Component = normalizeRenderableComponent(rawComponent);
    if (!Component) {
      console.error("[NSRouter] Invalid modal route component for route:", leafMatch.routeId, "shape:", describeComponentShape(rawComponent), "value:", rawComponent);
      syncRouterOnNativeModalClose();
      return;
    }
    const modalPage = renderPage(modalRouter, Component, modalPath, void 0, void 0, props.debug);
    modalPageRef = modalPage;
    const resolvedModalOptions = typeof props.modalOptions === "function" ? props.modalOptions({ modalPath, routeId: leafMatch.routeId }) : props.modalOptions;
    const resolvedIOSOptions = resolvedModalOptions == null ? void 0 : resolvedModalOptions.ios;
    const detentNames = (_c = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.detents) != null ? _c : ["medium", "large"];
    const selectedDetent = (_d = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.selectedDetent) != null ? _d : "medium";
    const showGrabber = (_e = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.prefersGrabberVisible) != null ? _e : true;
    const expandsOnScroll = (_f = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.prefersScrollingExpandsWhenScrolledToEdge) != null ? _f : false;
    const edgeAttachedCompact = (_g = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.prefersEdgeAttachedInCompactHeight) != null ? _g : false;
    const cornerRadius = (_h = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.preferredCornerRadius) != null ? _h : 20;
    const transparentOnIOS26 = (_i = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.transparentBackgroundOnIOS26) != null ? _i : true;
    const getiOSPresentationStyle = () => {
      var _a3;
      return (_a3 = resolvedIOSOptions == null ? void 0 : resolvedIOSOptions.presentationStyle) != null ? _a3 : UIModalPresentationStyle.PageSheet;
    };
    const configureIOSModalSheet = () => {
      var _a3;
      if (!__IOS__) {
        return;
      }
      const vc = (modalPage == null ? void 0 : modalPage.ios) || (modalPage == null ? void 0 : modalPage.viewController);
      if (!vc) {
        return;
      }
      const detents = detentNames.map((name) => {
        if (name === "large") {
          return UISheetPresentationControllerDetent.largeDetent();
        }
        return UISheetPresentationControllerDetent.mediumDetent();
      }).filter(Boolean);
      vc.modalPresentationStyle = getiOSPresentationStyle();
      const sheet = vc.sheetPresentationController || ((_a3 = vc.parentViewController) == null ? void 0 : _a3.sheetPresentationController);
      if (!sheet) {
        return;
      }
      if (detents.length) {
        sheet.detents = import_core2.Utils.ios.collections.jsArrayToNSArray(detents);
      }
      sheet.selectedDetentIdentifier = selectedDetent === "large" ? UISheetPresentationControllerDetentIdentifierLarge : UISheetPresentationControllerDetentIdentifierMedium;
      sheet.prefersScrollingExpandsWhenScrolledToEdge = expandsOnScroll;
      sheet.prefersEdgeAttachedInCompactHeight = edgeAttachedCompact;
      sheet.prefersGrabberVisible = showGrabber;
      sheet.preferredCornerRadius = cornerRadius;
      if (transparentOnIOS26 && import_core2.Utils.SDK_VERSION >= 26) {
        modalPage.backgroundColor = new import_core2.Color("transparent");
        if (vc.view) {
          vc.view.backgroundColor = UIColor.clearColor;
        }
      }
    };
    const showOptions = {
      context: modalContext,
      animated: (_k = (_j = resolvedModalOptions == null ? void 0 : resolvedModalOptions.animated) != null ? _j : props.animated) != null ? _k : true,
      fullscreen: (_l = resolvedModalOptions == null ? void 0 : resolvedModalOptions.fullscreen) != null ? _l : __ANDROID__,
      closeCallback: () => {
        if (activeModalPage === modalPage) {
          activeModalPage = void 0;
          activeModalPath = null;
        }
        syncRouterOnNativeModalClose();
      }
    };
    if (__IOS__) {
      showOptions.ios = {
        presentationStyle: getiOSPresentationStyle()
      };
    }
    const attemptShowModal = (hostPage) => {
      var _a3;
      try {
        log("[NSRouter] showModal attempt:", "path=", modalPath, "hostLoaded=", !!(hostPage == null ? void 0 : hostPage.isLoaded), "frameLoaded=", !!((_a3 = hostPage == null ? void 0 : hostPage.frame) == null ? void 0 : _a3.isLoaded));
        hostPage.showModal(modalPage, showOptions);
        activeModalPage = modalPage;
        activeModalPath = modalPath;
      } catch (err) {
        activeModalPage = void 0;
        activeModalPath = null;
        console.error("[NSRouter] Failed to show modal for path:", modalPath, err);
        syncRouterOnNativeModalClose();
      }
    };
    if (__ANDROID__) {
      if (!(currentPage == null ? void 0 : currentPage.isLoaded)) {
        log("[NSRouter] deferring Android modal until host page is loaded:", modalPath);
        const onHostLoaded = () => {
          var _a3;
          (_a3 = currentPage.removeEventListener) == null ? void 0 : _a3.call(currentPage, "loaded", onHostLoaded);
          if (requestId !== modalRequestId) {
            return;
          }
          const latestModalPath = getSingleModalPathFromSearch(router.state.location.search);
          if (!latestModalPath || latestModalPath !== modalPath || activeModalPath) {
            return;
          }
          setTimeout(() => attemptShowModal(currentPage), 0);
        };
        (_m = currentPage.addEventListener) == null ? void 0 : _m.call(currentPage, "loaded", onHostLoaded);
      } else {
        setTimeout(() => attemptShowModal(currentPage), 0);
      }
    } else {
      attemptShowModal(currentPage);
      setTimeout(() => {
        try {
          configureIOSModalSheet();
        } catch (err) {
          console.error("[NSRouter] Failed to configure iOS modal sheet:", err);
        }
      }, 0);
    }
  };
  const runNativeBackSync = () => {
    if (!router.history.canGoBack()) {
      queuedNativeBackCount = 0;
      return;
    }
    nativeBackSyncInFlight = true;
    nativeBackSyncFromPath = router.state.location.pathname;
    skipNextFrameBackNavigation = true;
    acquireGuard("native_back_callback");
    log("[NSRouter] native back pop -> router.history.back()");
    router.history.back();
  };
  const reconcileRouterToVisiblePath = (visiblePath) => {
    var _a2;
    const activePath = router.state.location.pathname;
    if (visiblePath === activePath) {
      if (shouldCompleteNativeBackSyncOnVisiblePath({
        inFlight: nativeBackSyncInFlight,
        visiblePath,
        activePath
      })) {
        nativeBackSyncInFlight = false;
        nativeBackSyncFromPath = null;
        if (guard.lockReason === "native_back_callback") {
          log("[NSRouter] native back sync completed on visible-path alignment");
          releaseGuard();
        }
        setTimeout(tryDrainQueuedNativeBack, 0);
      }
      return;
    }
    log("[NSRouter] reconciling router to visible native page:", "visible=", visiblePath, "active=", activePath);
    nativeBackSyncInFlight = false;
    nativeBackSyncFromPath = null;
    queuedNativeBackCount = 0;
    skipNextFrameBackNavigation = false;
    acquireGuard("native_visible_path_reconcile");
    router.navigate({
      to: visiblePath,
      replace: true
    });
    const settlePromise = (_a2 = router.load) == null ? void 0 : _a2.call(router);
    if (settlePromise && typeof settlePromise.then === "function") {
      settlePromise.then(() => {
        log("[NSRouter] visible-path reconcile settled:", "status=", router.state.status, "path=", router.state.location.pathname);
      }).catch((err) => {
        console.error("[NSRouter] visible-path reconcile load rejected:", err);
      }).finally(() => {
        if (guard.lockReason === "native_visible_path_reconcile") {
          releaseGuard();
        }
        setTimeout(tryDrainQueuedNativeBack, 0);
      });
      return;
    }
    if (guard.lockReason === "native_visible_path_reconcile") {
      releaseGuard();
    }
    setTimeout(tryDrainQueuedNativeBack, 0);
  };
  const tryDrainQueuedNativeBack = () => {
    if (queuedNativeBackCount <= 0) {
      return;
    }
    if (nativeBackSyncInFlight || guard.isNavigating) {
      return;
    }
    if (!router.history.canGoBack()) {
      queuedNativeBackCount = 0;
      return;
    }
    queuedNativeBackCount -= 1;
    log("[NSRouter] draining queued native back sync. remaining:", queuedNativeBackCount);
    runNativeBackSync();
  };
  const frameEl = import_dominative2.document.createElement("frame");
  frameRef = frameEl;
  frameEl.setAttribute("actionBarVisibility", props.actionBarVisibility || "never");
  frameEl.actionBarVisibility = props.actionBarVisibility || "never";
  {
    const unsub = router.history.subscribe(() => {
      log("[NSRouter] history.subscribe fired, pathname:", router.state.location.pathname);
      const loadPromise = router.load();
      if (loadPromise && typeof loadPromise.then === "function") {
        loadPromise.catch((err) => {
          log("[NSRouter] history load error:", (err == null ? void 0 : err.message) || err);
        });
      }
    });
    log("[NSRouter] provider: scheduling router.load()");
    log("[NSRouter] latestLocation:", JSON.stringify((_a = router.latestLocation) == null ? void 0 : _a.pathname));
    log("[NSRouter] routeTree:", !!router.routeTree);
    log("[NSRouter] routesById keys:", Object.keys(router.routesById || {}));
    navigationReady = true;
    updateSignal();
    setupBackHandler(router, () => frameRef, guard);
  }
  {
    const tryLoad = async () => {
      try {
        await (0, import_solid_js4.runWithOwner)(null, () => router.load());
        log("[NSRouter] load resolved. status:", router.state.status, "matches:", router.state.matches.length);
        updateSignal();
      } catch (err) {
        console.error("[NSRouter] load rejected:", err);
      }
    };
    setTimeout(tryLoad, 0);
  }
  syncNavigation = (_navigationSignal) => {
    log("[NSRouter] effect fired, navigationSignal:", _navigationSignal, "frameRef:", !!frameRef);
    (0, import_solid_js4.untrack)(() => {
      var _a2, _b;
      if (!frameRef) {
        log("[NSRouter] no frameRef");
        return;
      }
      const state = router.state;
      const matches = state.matches;
      log("[NSRouter] matches:", matches.length, "status:", state.status);
      if (!matches.length) return;
      if (nativeBackSyncInFlight && (state.status !== "pending" || nativeBackSyncFromPath != null && state.location.pathname !== nativeBackSyncFromPath)) {
        nativeBackSyncInFlight = false;
        nativeBackSyncFromPath = null;
        if (guard.lockReason === "native_back_callback") {
          log("[NSRouter] native back callback releasing guard");
          releaseGuard();
        }
      }
      if (queuedNativeBackCount > 0) {
        tryDrainQueuedNativeBack();
      }
      if (nativeBackSyncInFlight || guard.isNavigating) {
        return;
      }
      const curIndex = getHistoryIndex(router.history.location.state);
      const curTransition = getNativeScriptNavigationTransition(router.history.location.state);
      const curPathname = state.location.pathname;
      const curModalPath = getSingleModalPathFromSearch(state.location.search);
      const hasPathChanged = !shouldSkipPathNavigation(curPathname, prevPathname, prevIndex);
      if (curModalPath !== prevModalPath) {
        if (!curModalPath) {
          closeModalFromRouterState();
          prevModalPath = curModalPath;
        } else if (!activeModalPath) {
          if (hasPathChanged && prevPathname) {
            log("[NSRouter] deferring modal open until pathname settles:", curModalPath);
          } else {
            void openModalFromRouterState(curModalPath);
            prevModalPath = curModalPath;
          }
        } else if (activeModalPath !== curModalPath) {
          closeModalFromRouterState();
          void openModalFromRouterState(curModalPath);
          prevModalPath = curModalPath;
        }
      }
      if (guard.isNavigating) {
        log("[NSRouter] guard active; syncing prev tracking only. reason:", guard.lockReason);
        prevIndex = curIndex;
        prevPathname = curPathname;
        return;
      }
      log("[NSRouter] curPathname:", curPathname, "prevPathname:", prevPathname, "curIndex:", curIndex, "prevIndex:", prevIndex);
      if (!hasPathChanged) {
        prevIndex = curIndex;
        return;
      }
      const navigationKind = getNavigationKind(prevIndex, curIndex);
      const isBack = navigationKind === "back";
      const isReplace = navigationKind === "replace";
      if (isBack) {
        if (skipNextFrameBackNavigation) {
          skipNextFrameBackNavigation = false;
          log("[NSRouter] skipping Frame.goBack for native-originated back sync");
          prevIndex = curIndex;
          prevPathname = curPathname;
          return;
        }
        acquireGuard("router_state_back");
        if (frameRef.canGoBack()) {
          suppressedNativeBackCallbacks += 1;
          frameRef.goBack();
        }
        prevIndex = curIndex;
        prevPathname = curPathname;
        setTimeout(releaseGuard, 0);
        return;
      }
      let leafMatch = matches[matches.length - 1];
      if (!doesRouteIdMatchPathname(leafMatch.routeId, curPathname)) {
        const routesById = router.routesById || {};
        let resolvedRouteId = null;
        for (const routeId of Object.keys(routesById)) {
          if (routeId === "__root__") continue;
          if (doesRouteIdMatchPathname(routeId, curPathname)) {
            if (!resolvedRouteId || routeId.length > resolvedRouteId.length) {
              resolvedRouteId = routeId;
            }
          }
        }
        if (resolvedRouteId) {
          log("[NSRouter] match/path mismatch resolved:", leafMatch.routeId, "->", resolvedRouteId, "for pathname:", curPathname);
          leafMatch = { ...leafMatch, routeId: resolvedRouteId };
          setTimeout(() => updateSignal(), 16);
        } else {
          log("[NSRouter] deferring Frame navigation due to pending match/path mismatch:", "routeId=", leafMatch.routeId, "pathname=", curPathname, "status=", state.status);
          setTimeout(() => updateSignal(), 16);
          return;
        }
      }
      const route = router.routesById[leafMatch.routeId];
      const rawComponent = (_a2 = route == null ? void 0 : route.options) == null ? void 0 : _a2.component;
      const Component = normalizeRenderableComponent(rawComponent);
      log("[NSRouter] leafMatch:", leafMatch.routeId, "Component:", !!Component);
      if (!Component) {
        console.error("[NSRouter] Invalid route component for route:", leafMatch.routeId, "shape:", describeComponentShape(rawComponent), "value:", rawComponent);
        prevIndex = curIndex;
        prevPathname = curPathname;
        return;
      }
      acquireGuard("router_state_forward_or_replace");
      log("[NSRouter] navigating Frame to", curPathname);
      frameRef.navigate({
        create: () => renderPage(
          router,
          Component,
          curPathname,
          (sourcePath) => {
            if (suppressedNativeBackCallbacks > 0) {
              suppressedNativeBackCallbacks -= 1;
              log("[NSRouter] native back callback suppressed (router-initiated goBack)");
              return;
            }
            if (sourcePath !== router.state.location.pathname) {
              queuedNativeBackCount += 1;
              log("[NSRouter] queued native back sync (stale source path):", "source=", sourcePath, "active=", router.state.location.pathname, "count=", queuedNativeBackCount);
              setTimeout(tryDrainQueuedNativeBack, 0);
              return;
            }
            if (nativeBackSyncInFlight) {
              queuedNativeBackCount += 1;
              log("[NSRouter] queued native back sync while router is busy. count=", queuedNativeBackCount, "status=", router.state.status);
              setTimeout(tryDrainQueuedNativeBack, 0);
              return;
            }
            log("[NSRouter] native back callback. guard:", guard.isNavigating, "path:", router.state.location.pathname);
            const decision = getNativeBackCallbackDecision({
              guardActive: guard.isNavigating,
              canGoBack: router.history.canGoBack()
            });
            if (decision === "ignore_guard_active") {
              queuedNativeBackCount += 1;
              log("[NSRouter] queued native back sync (guard active). count=", queuedNativeBackCount);
              setTimeout(tryDrainQueuedNativeBack, 0);
              return;
            }
            if (decision === "ignore_cannot_go_back") {
              log("[NSRouter] native back callback ignored (cannot go back)");
              queuedNativeBackCount = 0;
              return;
            }
            runNativeBackSync();
          },
          reconcileRouterToVisiblePath,
          props.debug
        ),
        animated: prevIndex >= 0 ? (_b = props.animated) != null ? _b : true : false,
        transition: curTransition != null ? curTransition : props.transition,
        backstackVisible: !isReplace,
        clearHistory: false
      });
      prevIndex = curIndex;
      prevPathname = curPathname;
      if (curModalPath && !activeModalPath) {
        setTimeout(() => {
          const latestModalPath = getSingleModalPathFromSearch(router.state.location.search);
          if (!latestModalPath || latestModalPath !== curModalPath || activeModalPath) {
            return;
          }
          void openModalFromRouterState(latestModalPath);
          prevModalPath = latestModalPath;
        }, 0);
      }
      releaseGuard();
    });
  };
  return frameEl;
}

// src/Link.tsx
var import_solid_js5 = require("solid-js");
var import_solid_js6 = require("@nativescript-community/solid-js");

// src/link-action.ts
function resolveLinkTapAction(opts) {
  if (opts.onTapResult === false) {
    return { type: "none" };
  }
  if (opts.back) {
    if (opts.canGoBack) {
      return { type: "back" };
    }
    if (opts.fallbackTo) {
      return { type: "navigate", to: opts.fallbackTo };
    }
    if (opts.to) {
      return { type: "navigate", to: opts.to };
    }
    return { type: "none" };
  }
  if (opts.closeModal) {
    return { type: "close_modal" };
  }
  if (opts.to) {
    return { type: "navigate", to: opts.to };
  }
  return { type: "none" };
}

// src/modal-controller.ts
function closeModalFromRouterContext(router) {
  var _a, _b, _c;
  const closeFn = (_c = (_b = (_a = router == null ? void 0 : router.options) == null ? void 0 : _a.context) == null ? void 0 : _b.__nsModalController) == null ? void 0 : _c.close;
  if (typeof closeFn !== "function") {
    return false;
  }
  closeFn();
  return true;
}

// src/Link.tsx
function resolveNextState(prev, stateInput) {
  if (stateInput === void 0 || stateInput === true) {
    return prev;
  }
  const next = typeof stateInput === "function" ? stateInput(prev) : stateInput;
  if (!next || typeof next !== "object") {
    return next;
  }
  if (!prev || typeof prev !== "object") {
    return next;
  }
  return {
    ...prev,
    ...next
  };
}
function resolveNavigateState(stateInput) {
  if (stateInput === void 0) {
    return void 0;
  }
  if (stateInput === true) {
    return true;
  }
  return (prev) => resolveNextState(prev, stateInput);
}
function Link(props) {
  const router = useRouter();
  const matchRoute = useMatchRoute();
  const isActive = (0, import_solid_js5.createMemo)(() => {
    if (!props.to) {
      return false;
    }
    return !!matchRoute({
      to: props.to,
      params: props.params,
      fuzzy: false
    })();
  });
  const handleTap = () => {
    var _a, _b;
    const action = resolveLinkTapAction({
      onTapResult: (_a = props.onTap) == null ? void 0 : _a.call(props),
      back: props.back,
      closeModal: props.closeModal,
      canGoBack: router.history.canGoBack(),
      fallbackTo: props.fallbackTo,
      to: props.to
    });
    if (action.type === "none") {
      return;
    }
    if (action.type === "back") {
      router.history.back();
      return;
    }
    if (action.type === "close_modal") {
      if (closeModalFromRouterContext(router)) {
        return;
      }
      router.navigate({
        to: ".",
        search: (prev) => withSingleModalPath(prev, null),
        replace: (_b = props.replace) != null ? _b : true
      });
      return;
    }
    if (props.modalTo) {
      const modalTo = props.modalTo;
      router.navigate({
        to: props.to || ".",
        params: props.params,
        state: resolveNavigateState(props.state),
        hash: props.hash,
        replace: props.replace,
        search: (prev) => {
          const base = typeof props.search === "function" ? props.search(prev) : {
            ...prev,
            ...props.search
          };
          return withSingleModalPath(base, modalTo, MODAL_SEARCH_PARAM_KEY);
        }
      });
      return;
    }
    if (typeof action.to !== "string") {
      return;
    }
    router.navigate({
      to: action.to,
      params: props.params,
      state: resolveNavigateState(props.state),
      search: props.search,
      hash: props.hash,
      replace: props.replace
    });
  };
  const currentClass = () => {
    const base = props.class || "";
    const active = isActive() ? props.activeClass || "" : props.inactiveClass || "";
    return [base, active].filter(Boolean).join(" ");
  };
  const contentView = (0, import_solid_js6.createElement)("contentview");
  contentView.addEventListener("tap", handleTap);
  (0, import_solid_js5.onCleanup)(() => {
    contentView.removeEventListener("tap", handleTap);
  });
  (0, import_solid_js5.createRenderEffect)(
    () => ({ className: currentClass(), style: props.style }),
    (next) => {
      (0, import_solid_js6.setProp)(contentView, "class", next.className);
      (0, import_solid_js6.setProp)(contentView, "style", next.style);
    }
  );
  (0, import_solid_js6.insert)(contentView, props.children);
  return contentView;
}

// src/transition-state.ts
function createNativeScriptNavigationState(options) {
  return {
    __nsNavigation: options
  };
}
function createNativeScriptTransitionState(transition) {
  return createNativeScriptNavigationState({ transition });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Await,
  Link,
  MODAL_SEARCH_PARAM_KEY,
  MatchRoute,
  NativeScriptRouterProvider,
  Navigate,
  RouteApi,
  createFileRoute,
  createLazyRoute,
  createNativeScriptHistory,
  createNativeScriptNavigationState,
  createNativeScriptRouter,
  createNativeScriptTransitionState,
  createRootRoute,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  getRouteApi,
  rootRouteId,
  useBlocker,
  useCanGoBack,
  useChildMatches,
  useLoaderData,
  useLoaderDeps,
  useLocation,
  useMatch,
  useMatchRoute,
  useMatches,
  useNavigate,
  useParams,
  useParentMatches,
  useRouteContext,
  useRouter,
  useRouterState,
  useSearch,
  withSingleModalPath
});
//# sourceMappingURL=index.cjs.map