import pinia from '../store';
import router from '../router';
import { List } from '@varlet/ui';
import '@varlet/ui/es/list/list.css';
// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  return app.use(pinia).use(router).use(List);
}
