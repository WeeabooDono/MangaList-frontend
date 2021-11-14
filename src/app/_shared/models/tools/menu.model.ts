export interface MenuItem {
  name: string;
  route: string;
  icon?: string;
  authority?: string;
}

export const mainNavbarItems: MenuItem[] = [
  {
    name : 'shared.navbar.main.home',
    route: '/home',
  },
  {
    name : 'shared.navbar.main.mangas',
    route: '/mangas',
  },
];
