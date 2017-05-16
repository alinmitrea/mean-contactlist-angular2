import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'LazyQuote', menuType: MenuType.BRAND },
  { path: '', title: 'Home', menuType: MenuType.LEFT },
  { path: 'categories', title: 'Categories', menuType: MenuType.RIGHT },
  { path: 'favorites', title: 'Favorites', menuType: MenuType.RIGHT }
];
