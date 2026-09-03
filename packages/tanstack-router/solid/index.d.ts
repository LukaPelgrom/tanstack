export { createNativeScriptHistory } from '../index.js';
import * as _tanstack_router_core from '@tanstack/router-core';
import { RegisteredRouter as RegisteredRouter$1 } from '@tanstack/router-core';
export { rootRouteId } from '@tanstack/router-core';
import * as _tanstack_history from '@tanstack/history';
import * as SolidRouter from '@tanstack/solid-router';
import { AnyRoute, AnyRouter, RoutePaths, LinkOptions } from '@tanstack/solid-router';

declare const createRouter: typeof SolidRouter.createRouter;
declare const createRoute: typeof SolidRouter.createRoute;
declare const createRootRoute: typeof SolidRouter.createRootRoute;
declare const createRootRouteWithContext: typeof SolidRouter.createRootRouteWithContext;
declare const createFileRoute: typeof SolidRouter.createFileRoute;
declare const createLazyRoute: typeof SolidRouter.createLazyRoute;
declare const getRouteApi: typeof SolidRouter.getRouteApi;
declare const RouteApi: typeof SolidRouter.RouteApi;

declare const useRouter: typeof SolidRouter.useRouter;
declare const useRouterState: typeof SolidRouter.useRouterState;
declare const useLocation: typeof SolidRouter.useLocation;
declare const useNavigate: typeof SolidRouter.useNavigate;
declare const useMatchRoute: typeof SolidRouter.useMatchRoute;
declare const useCanGoBack: typeof SolidRouter.useCanGoBack;
declare const useMatch: typeof SolidRouter.useMatch;
declare const useParams: typeof SolidRouter.useParams;
declare const useSearch: typeof SolidRouter.useSearch;
declare const useLoaderData: typeof SolidRouter.useLoaderData;
declare const useLoaderDeps: typeof SolidRouter.useLoaderDeps;
declare const useRouteContext: typeof SolidRouter.useRouteContext;
declare const useMatches: typeof SolidRouter.useMatches;
declare const useParentMatches: typeof SolidRouter.useParentMatches;
declare const useChildMatches: typeof SolidRouter.useChildMatches;
declare const useBlocker: typeof SolidRouter.useBlocker;
declare const Navigate: typeof SolidRouter.Navigate;
declare const MatchRoute: typeof SolidRouter.MatchRoute;
declare const Await: typeof SolidRouter.Await;

type RouterOptions<TRouteTree extends AnyRoute> = Parameters<typeof createRouter<TRouteTree>>[0];
declare function createNativeScriptRouter<TRouteTree extends AnyRoute>(opts: Omit<RouterOptions<TRouteTree>, 'history'> & {
    initialPath?: string;
}): _tanstack_router_core.RouterCore<TRouteTree, "never", false, _tanstack_history.RouterHistory, Record<string, any>>;

interface NativeScriptNavigationTransition {
    name?: string;
    duration?: number;
    curve?: any;
    instance?: any;
}
interface NativeScriptNavigationOptions {
    transition?: NativeScriptNavigationTransition;
}
interface NativeScriptNavigationState {
    __nsNavigation?: NativeScriptNavigationOptions;
}
type NativeScriptModalDetent = 'medium' | 'large';
interface NativeScriptModalIOSPresentationOptions {
    presentationStyle?: number;
    detents?: NativeScriptModalDetent[];
    selectedDetent?: NativeScriptModalDetent;
    prefersGrabberVisible?: boolean;
    prefersScrollingExpandsWhenScrolledToEdge?: boolean;
    prefersEdgeAttachedInCompactHeight?: boolean;
    preferredCornerRadius?: number;
    transparentBackgroundOnIOS26?: boolean;
}
interface NativeScriptModalPresentationOptions {
    animated?: boolean;
    fullscreen?: boolean;
    ios?: NativeScriptModalIOSPresentationOptions;
}
interface NativeScriptModalOptionsResolverContext {
    modalPath: string;
    routeId: string;
}
type NativeScriptModalOptionsResolver = (context: NativeScriptModalOptionsResolverContext) => NativeScriptModalPresentationOptions | undefined;

interface NativeScriptRouterProviderProps {
    router: AnyRouter;
    actionBarVisibility?: 'auto' | 'never' | 'always';
    animated?: boolean;
    transition?: {
        name?: string;
        duration?: number;
        curve?: any;
    };
    debug?: boolean;
    modalOptions?: NativeScriptModalPresentationOptions | NativeScriptModalOptionsResolver;
}
declare function NativeScriptRouterProvider(props: NativeScriptRouterProviderProps): any;

interface Register {
}
type RegisteredRouter = RegisteredRouter$1<Register>;

type LinkTapResult = void | boolean;

type LinkProps<TRouter extends AnyRouter = RegisteredRouter, TFrom extends RoutePaths<TRouter['routeTree']> | string = string, TTo extends string | undefined = '.', TMaskFrom extends RoutePaths<TRouter['routeTree']> | string = TFrom, TMaskTo extends string = '.'> = Omit<LinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>, 'to' | 'state'> & {
    to?: LinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>['to'];
    state?: true | object | ((prev: unknown) => unknown);
    back?: boolean;
    closeModal?: boolean;
    modalTo?: string;
    fallbackTo?: LinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>['to'];
    onTap?: () => LinkTapResult;
    children: unknown;
    class?: string;
    activeClass?: string;
    inactiveClass?: string;
    style?: string;
};
declare function Link<TRouter extends AnyRouter = RegisteredRouter, const TFrom extends RoutePaths<TRouter['routeTree']> | string = string, const TTo extends string | undefined = '.', const TMaskFrom extends RoutePaths<TRouter['routeTree']> | string = TFrom, const TMaskTo extends string = '.'>(props: LinkProps<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>): any;

declare function createNativeScriptNavigationState(options: NativeScriptNavigationOptions): NativeScriptNavigationState;
declare function createNativeScriptTransitionState(transition: NativeScriptNavigationTransition): NativeScriptNavigationState;

declare const MODAL_SEARCH_PARAM_KEY = "@modal";
declare function withSingleModalPath(search: unknown, modalPath: string | null, modalKey?: string): Record<string, unknown>;

export { Await, Link, MODAL_SEARCH_PARAM_KEY, MatchRoute, type NativeScriptModalDetent, type NativeScriptModalIOSPresentationOptions, type NativeScriptModalOptionsResolver, type NativeScriptModalOptionsResolverContext, type NativeScriptModalPresentationOptions, type NativeScriptNavigationOptions, type NativeScriptNavigationState, type NativeScriptNavigationTransition, NativeScriptRouterProvider, Navigate, type Register, type RegisteredRouter, RouteApi, createFileRoute, createLazyRoute, createNativeScriptNavigationState, createNativeScriptRouter, createNativeScriptTransitionState, createRootRoute, createRootRouteWithContext, createRoute, createRouter, getRouteApi, useBlocker, useCanGoBack, useChildMatches, useLoaderData, useLoaderDeps, useLocation, useMatch, useMatchRoute, useMatches, useNavigate, useParams, useParentMatches, useRouteContext, useRouter, useRouterState, useSearch, withSingleModalPath };
