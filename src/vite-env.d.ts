/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_CAL_15_URL?: string;
  readonly VITE_CAL_30_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


